interface Props {
  translations: string[];
  targetLang: string;
}

export default function Step1Translation({ translations, targetLang }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900/60 rounded-2xl p-6 border border-emerald-900/30">
        <h2 className="text-lg font-semibold text-emerald-400 mb-2">
          Paso 1: Traducción
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Lee la traducción para entender el contexto general del texto en {targetLang}.
        </p>

        <div className="space-y-3">
          {translations.map((sentence, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl bg-gray-800/70 border-l-4 border-emerald-600"
            >
              <span className="text-xs text-emerald-600 font-mono mb-1 block">
                Oración {idx + 1}
              </span>
              <p className="text-gray-200 text-lg leading-relaxed">
                {sentence}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-900/30">
        <p className="text-sm text-emerald-300/80">
          <span className="font-medium">¿Por qué este paso?</span> Leer primero la traducción te permite 
          entender el significado antes de enfrentarte al texto original. Esto reduce la frustración 
          y mejora la comprensión.
        </p>
      </div>
    </div>
  );
}
