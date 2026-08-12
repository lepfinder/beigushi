import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy GoogleGenAI initialization
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY 未配置，请在设置中提供 API Key。');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AI Poetry Tutor Explanation API
app.post('/api/ai/explain', async (req, res) => {
  try {
    const { title, author, dynasty, content, question } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: '缺失必要的作品标题与内容' });
    }

    const ai = getAiClient();
    const prompt = `你是一位风趣、耐心且知识渊博的中小学语文名师与国学专家。
针对作品：《${title}》（${dynasty || ''}·${author || '未知'}）
内容：
${content}

${question ? `学生提出了以下疑问："${question}"` : '请为小学/初中学生提供生动的赏析、背景故事、背诵记忆技巧及1-2个互动思考题。'}

要求：
1. 语言亲切生动，适合学生理解，避免晦涩难懂的学术术语。
2. 包含：【意境解读】、【背诵秘籍】、【拓展小知识】。
3. 结构清晰，格式排版美观，使用 Markdown 格式输出。`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error('AI Explain Error:', error);
    res.status(500).json({ error: error.message || 'AI服务解析失败，请稍后重试' });
  }
});

// AI Poetry Quiz Generation API
app.post('/api/ai/quiz', async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const ai = getAiClient();

    const prompt = `请根据古诗/课文《${title}》（${author}）设计 3 道适合中小学生的互动理解与背诵测试题。
作品内容：
${content}

请以 JSON 格式输出，数组形式，每项包含：
- id: 数字
- question: 题目描述（可以是看拼音写词语、补全下句、词语理解或意境选择）
- options: 4个选项的数组 [A, B, C, D]
- answer: 正确选项的字母 (A/B/C/D)
- explanation: 简短解析说明

请只输出纯 JSON 代码块，不要添加额外的 Markdown 标记以外的文本。`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    let rawText = response.text || '';
    // Clean potential markdown code blocks
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
    const quizData = JSON.parse(rawText);

    res.json({ quiz: quizData });
  } catch (error: any) {
    console.error('AI Quiz Error:', error);
    res.status(500).json({ error: error.message || '生成测试题失败' });
  }
});

// Setup Vite or Static File Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[古诗词典藏] Server running at http://localhost:${PORT}`);
  });
}

startServer();
