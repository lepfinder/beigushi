import { CharPinyin } from '../types';

/**
 * Utility to parse aligned line text and pinyin into structured CharPinyin[]
 */
export function alignLinePinyin(line: string, pinyinLine?: string): CharPinyin[] {
  if (!line) return [];
  const chars = line.split('');

  if (!pinyinLine) {
    return chars.map(char => ({ char, py: '' }));
  }

  // Pinyin words separated by spaces
  const pyTokens = pinyinLine.trim().split(/\s+/);
  const result: CharPinyin[] = [];

  let tokenIdx = 0;
  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    // Check if character is punctuation
    if (/[\s,。，？！；：、“”‘’《》（）—…·]/.test(char)) {
      result.push({ char, py: '' });
    } else {
      const py = pyTokens[tokenIdx] || '';
      tokenIdx++;
      result.push({ char, py });
    }
  }

  return result;
}

/**
 * Process a full poem object to ensure pinyinWords is populated
 */
export function ensurePinyinData(contentLines: string[], pinyinLines?: string[]): CharPinyin[][] {
  return contentLines.map((line, idx) => {
    const pyLine = pinyinLines ? pinyinLines[idx] : undefined;
    return alignLinePinyin(line, pyLine);
  });
}
