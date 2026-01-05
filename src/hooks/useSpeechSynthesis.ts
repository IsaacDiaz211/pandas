import { useCallback, useRef, useState } from 'react';
import { useEffect } from 'react';
export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSentence, setCurrentSentence] = useState<number>(-1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };

    loadVoices();
    window.speechSynthesis.addEventListener('voiceschanged', loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', loadVoices);
    };
  }, []);

  const speak = useCallback((text: string, lang: string, onEnd?: () => void) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      const langCode = getLangCode(lang);
      utterance.lang = langCode;
      if (langCode === 'zh'){
        utterance.rate = 0.5;
      } else{
        utterance.rate = 0.8;
      }
        
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => setIsSpeaking(false);
      
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const speakSentences = useCallback((sentences: string[], lang: string) => {
    let index = 0;
    
    const speakNext = () => {
      if (index < sentences.length) {
        setCurrentSentence(index);
        speak(sentences[index], lang, () => {
          index++;
          speakNext();
        });
      } else {
        setCurrentSentence(-1);
      }
    };
    
    speakNext();
  }, [speak]);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setCurrentSentence(-1);
  }, []);

  return { speak, speakSentences, stop, isSpeaking, currentSentence };
}

function getLangCode(lang: string): string {
  const codes: Record<string, string> = {
    es: 'es-ES',
    en: 'en-US',
    pt: 'pt-BR',
    zh: 'zh-CN',
    vi: 'vi-VN'
  };
  return codes[lang] || lang;
}
