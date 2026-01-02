import type { GlossedSentence } from '../types/api';

interface Props {
  glossedText: GlossedSentence[];
}

export default function Step3Gloss({ glossedText }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900/60 rounded-2xl p-6 border border-emerald-900/30">
        <h2 className="text-lg font-semibold text-emerald-400 mb-2">
          Paso 3: Lectura interlineal
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Observa cómo se corresponde cada palabra del original con su traducción morfema a morfema.
        </p>

        <div className="space-y-6">
          {glossedText.map((sentence, sIdx) => (
            <div key={sIdx} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
              <span className="text-xs text-emerald-600 font-mono mb-3 block">
                Oración {sIdx + 1}
              </span>
              
              <div className="flex flex-wrap gap-3">
                {sentence.originalText.map((word, wIdx) => (
                  <div 
                    key={wIdx}
                    className="flex flex-col items-center group"
                  >
                    <span className="text-lg font-medium text-gray-100 group-hover:text-emerald-300 transition-colors">
                      {word}
                    </span>
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-emerald-600/50 to-transparent my-1" />
                    <span className="text-sm text-emerald-400/80">
                      {sentence.glossedWords[wIdx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-900/30">
        <p className="text-sm text-emerald-300/80">
          <span className="font-medium">Gloss interlineal:</span> Esta técnica lingüística te permite ver 
          la estructura del idioma. Nota cómo el orden de palabras puede diferir de tu lengua materna.
        </p>
      </div>
    </div>
  );
}
