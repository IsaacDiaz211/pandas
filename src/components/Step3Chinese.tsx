import type { GlossedChineseSentence } from '../types/api';

interface Props {
  glossedText: GlossedChineseSentence[];
  translations: string[];
  mode: 'pinyin' | 'words';
}

export default function Step3Chinese({ glossedText, translations, mode }: Props) {
  const isPinyin = mode === 'pinyin';

  return (
    <div className="space-y-4">
      <div className="bg-gray-900/60 rounded-2xl p-6 border border-emerald-900/30">
        <h2 className="text-lg font-semibold text-emerald-400 mb-2">
          {isPinyin ? 'Paso 3.1: Pinyin y pronunciación' : 'Paso 3.2: Palabras separadas'}
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          {isPinyin 
            ? 'Observa la pronunciación pinyin junto con el significado de cada palabra.'
            : 'Ve el texto con las palabras separadas para identificar los límites de cada término.'
          }
        </p>

        <div className="space-y-6">
          {glossedText.map((sentence, sIdx) => (
            <div key={sIdx} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
              <span className="text-xs text-emerald-600 font-mono mb-3 block">
                Oración {sIdx + 1}
              </span>
              
              <div className="flex flex-wrap gap-4">
                {sentence.separateWords.map((word, wIdx) => (
                  <div 
                    key={wIdx}
                    className="flex flex-col items-center group"
                  >
                    {/* Carácter chino */}
                    <span className="text-2xl font-medium text-gray-100 group-hover:text-emerald-300 transition-colors">
                      {word}
                    </span>
                    
                    {isPinyin && (
                      <>
                        {/* Pinyin */}
                        <span className="text-sm text-amber-400 font-mono mt-1">
                          {sentence.pinyin[wIdx]}
                        </span>
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-600/50 to-transparent my-1" />
                        {/* Gloss */}
                        <span className="text-xs text-emerald-400/80">
                          {sentence.glossedWords[wIdx]}
                        </span>
                      </>
                    )}
                    
                    {!isPinyin && (
                      <span className="text-xs text-gray-500 mt-1">
                        {wIdx + 1}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {isPinyin && translations[sIdx] && (
                <div className="mt-4 pt-3 border-t border-gray-700/80">
                  <p className="text-sm text-gray-500 italic">
                    {translations[sIdx]}
                  </p>
                </div>
              )}

              {!isPinyin && (
                <div className="mt-4 pt-3 border-t border-gray-700">
                  <p className="text-lg text-gray-300 tracking-widest">
                    {sentence.separateWords.join(' ')}
                  </p>
                  {translations[sIdx] && (
                    <p className="text-sm text-gray-500 italic mt-2">
                      {translations[sIdx]}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-950/30 rounded-xl p-4 border border-amber-900/30">
        <p className="text-sm text-amber-300/80">
          {isPinyin 
            ? <><span className="font-medium">Pinyin:</span> El sistema de romanización del chino mandarín. Los tonos se indican con diacríticos sobre las vocales.</>
            : <><span className="font-medium">Segmentación:</span> El chino no usa espacios entre palabras. Esta vista te ayuda a identificar dónde empieza y termina cada palabra.</>
          }
        </p>
      </div>
    </div>
  );
}
