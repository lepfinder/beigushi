/* 各年级页面公共脚本 */
(function () {
  var btn = document.getElementById('back-to-top');
  if (btn) {
    var threshold = 360;
    function update() {
      if (window.scrollY > threshold) btn.classList.add('is-visible');
      else btn.classList.remove('is-visible');
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var toggle = document.getElementById('pinyin-toggle');
  if (toggle) {
    var label = toggle.querySelector('span:last-child');
    toggle.addEventListener('click', function () {
      var hidden = document.body.classList.toggle('hide-pinyin');
      toggle.setAttribute('aria-pressed', hidden ? 'false' : 'true');
      if (label) label.textContent = hidden ? '显示拼音' : '隐藏拼音';
    });
  }
})();
