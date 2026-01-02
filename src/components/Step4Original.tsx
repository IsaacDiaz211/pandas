interface Props {
  sentences: string[];
}

export default function Step4Original({ sentences }: Props) {
  return (
    <div className="space-y-4">
      <div className="bg-gray-900/60 rounded-2xl p-6 border border-emerald-900/30">
        <h2 className="text-lg font-semibold text-emerald-400 mb-2">
          Paso 4: Lectura del original
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Ahora que conoces el contexto, lee el texto original con comprensión.
        </p>

        <div className="p-6 rounded-xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-emerald-800/30">
          {sentences.map((sentence, idx) => (
            <p 
              key={idx}
              className="text-xl leading-loose text-gray-100 mb-4 last:mb-0"
            >
              {sentence}
              {idx < sentences.length - 1 && ' '}
            </p>
          ))}
        </div>
      </div>

      <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-900/30">
        <p className="text-sm text-emerald-300/80">
          <span className="font-medium">Comprensión profunda:</span> En este punto, deberías poder leer 
          el texto original entendiendo su significado. Relee tantas veces como necesites.
        </p>
      </div>
    </div>
  );
}
