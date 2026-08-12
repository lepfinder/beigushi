#!/bin/bash
# 镜像名称
IMAGE_NAME="gcr.io/myxxyagent/github.com/lepfinder/beigushi"
# 保留最近的镜像数量（例如保留最近的 3 个版本）
KEEP_COUNT=3

echo "Fetching all image digests sorted by timestamp (JSON)..."
# 使用 JSON 格式并利用 Python 稳定解析出完整的 sha256 标识符
digests=$(gcloud container images list-tags "$IMAGE_NAME" --limit=99999 --sort-by=~TIMESTAMP --format=json | python3 -c "import sys, json; print(' '.join([img['digest'] for img in json.load(sys.stdin)]))")

count=0
for digest in $digests; do
  count=$((count+1))
  if [ $count -gt $KEEP_COUNT ]; then
    echo "Deleting old image digest: $digest"
    # 使用 force-delete-tags 连同关联的 tag 一起彻底删除该镜像，释放空间
    # 即使个别旧镜像已不存在，使用 || true 避免影响主流水线的成功状态
    gcloud container images delete "${IMAGE_NAME}@${digest}" --force-delete-tags --quiet || true
  else
    echo "Keeping recent image digest [$count/$KEEP_COUNT]: $digest"
  fi
done

echo "Cleanup completed."
