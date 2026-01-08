import type { TextRequest, TextResponse, ChineseResponse } from '../types/api';

const API_BASE_URL = '/api';

export async function translateText(request: TextRequest): Promise<TextResponse | ChineseResponse> {
  //const endpoint = request.l2 === 'zh' ? '/translate/chinese' : '/translate';
  const endpoint = '/translate/1'
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(
      `Error: ${response.status} - ${response.statusText}${errorText ? ` | Body: ${errorText}` : ''}`
    );
  }

  try {
    return await response.json();
  } catch {
    const rawText = await response.text().catch(() => '');
    throw new Error(`Respuesta no es JSON válido.${rawText ? ` Body: ${rawText}` : ''}`);
  }
}

export async function getLanguages(): Promise<{ languages: string[] }> {
  const response = await fetch(`${API_BASE_URL}/languages`);
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
}
