// Tipos basados en los esquemas del backend

export interface GrammarPoint {
  grammar_point: string;
  sentence: string;
  explanation: string;
}

export interface GrammarArray {
  points: GrammarPoint[];
}

// Respuesta para idiomas alfabéticos
export interface GlossedSentence {
  originalText: string[];
  glossedWords: string[];
}

export interface TextResponse {
  request_id: string;
  translatedText: string[];
  glossedText: GlossedSentence[];
  grammarPoints?: GrammarArray;
}

// Respuesta para chino
export interface GlossedChineseSentence {
  separateWords: string[];
  pinyin: string[];
  glossedWords: string[];
}

export interface ChineseResponse {
  request_id: string;
  translatedText: string[];
  glossedText: GlossedChineseSentence[];
  grammarPoints?: GrammarArray;
}

// Request
export interface TextRequest {
  text: string;
  l1: string; // lengua materna
  l2: string; // lengua target
}

// Union type para respuestas
export type TranslationResponse = TextResponse | ChineseResponse;

// Helper para detectar si es respuesta para chino
export function isChineseResponse(response: TranslationResponse): response is ChineseResponse {
  return response.glossedText.length > 0 && 'pinyin' in response.glossedText[0];
}

// Idiomas soportados
export const SUPPORTED_LANGUAGES = {
  es: 'Español',
  en: 'English',
  pt: 'Português',
  zh: '中文',
  vi: 'Tiếng Việt'
} as const;

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;
