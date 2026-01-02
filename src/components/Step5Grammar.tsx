import { Collapse } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import type { GrammarArray } from '../types/api';

interface Props {
  grammarPoints: GrammarArray;
}

export default function Step5Grammar({ grammarPoints }: Props) {
  const items = grammarPoints.points.map((point, idx) => ({
    key: idx.toString(),
    label: (
      <div className="flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 text-xs flex items-center justify-center">
          {idx + 1}
        </span>
        <span className="font-medium text-gray-200">{point.grammar_point}</span>
      </div>
    ),
    children: (
      <div className="space-y-3">
        <div className="p-3 rounded-lg bg-gray-800/70 border-l-2 border-amber-500">
          <span className="text-xs text-amber-500 block mb-1">Ejemplo en contexto</span>
          <p className="text-gray-200 italic">{point.sentence}</p>
        </div>
        <p className="text-gray-300 leading-relaxed">{point.explanation}</p>
      </div>
    ),
  }));

  return (
    <div className="space-y-4">
      <div className="bg-gray-900/60 rounded-2xl p-6 border border-emerald-900/30">
        <h2 className="text-lg font-semibold text-emerald-400 mb-2 flex items-center gap-2">
          <BookOutlined />
          Paso 5: Puntos gramaticales
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Estructuras gramaticales identificadas en el texto.
        </p>

        <Collapse
          items={items}
          defaultActiveKey={['0']}
          className="!bg-transparent !border-0 [&_.ant-collapse-item]:!border-emerald-900/30 [&_.ant-collapse-item]:!bg-gray-900/70 [&_.ant-collapse-header]:!bg-gray-900/70 [&_.ant-collapse-header]:!text-gray-100 [&_.ant-collapse-arrow]:!text-emerald-400 [&_.ant-collapse-content]:!bg-gray-950/70 [&_.ant-collapse-content]:!border-emerald-900/30 [&_.ant-collapse-content-box]:!text-gray-200"
          style={{
            background: 'transparent',
          }}
        />
      </div>

      <div className="bg-emerald-950/30 rounded-xl p-4 border border-emerald-900/30">
        <p className="text-sm text-emerald-300/80">
          <span className="font-medium">Aprendizaje contextual:</span> Aprender gramática dentro de un 
          contexto real es más efectivo que memorizar reglas aisladas.
        </p>
      </div>
    </div>
  );
}
