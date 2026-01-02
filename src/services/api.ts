import type { TextRequest, TextResponse, ChineseResponse } from '../types/api';

const API_BASE_URL = "http://localhost:3000";

export async function translateText(request: TextRequest): Promise<TextResponse | ChineseResponse> {
  const endpoint = request.l2 === 'zh' ? '/translate/chinese' : '/translate';
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function getLanguages(): Promise<{ languages: string[] }> {
  const response = await fetch(`${API_BASE_URL}/languages`);
  
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
}
