import { Button } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface Props {
  sentences: string[];
  lang: string;
}

export default function Step2Audio({ sentences, lang }: Props) {
  const { speakSentences, stop, isSpeaking, currentSentence } = useSpeechSynthesis();

  const handlePlay = () => {
    if (isSpeaking) {
      stop();
    } else {
      speakSentences(sentences, lang);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-900/60 rounded-2xl p-6 border border-emerald-900/30">
        <h2 className="text-lg font-semibold text-emerald-400 mb-2">
          Paso 2: Escucha
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Escucha el texto original mientras sigues la lectura.
        </p>

        <Button
          type="primary"
          size="large"
          icon={isSpeaking ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
          onClick={handlePlay}
          className={`mb-6 !rounded-xl !h-14 !px-8 !font-semibold !border-0 ${
            isSpeaking 
              ? '!bg-gradient-to-r !from-orange-600 !to-red-600' 
              : '!bg-gradient-to-r !from-emerald-600 !to-green-600'
          }`}
        >
          {isSpeaking ? 'Detener' : 'Reproducir todo'}
        </Button>

        <div className="space-y-3">
          {sentences.map((sentence, idx) => (
            <div 
              key={idx}
              className={`p-4 rounded-xl transition-all duration-300 ${
                currentSentence === idx 
                  ? 'bg-emerald-900/50 border-2 border-emerald-500 scale-[1.02]' 
                  : 'bg-gray-800/70 border border-gray-700'
              }`}
            >
              <span className={`text-xs font-mono mb-1 block ${
                currentSentence === idx ? 'text-emerald-400' : 'text-gray-600'
              }`}>
                Oración {idx + 1}
              </span>
              <p className={`text-lg leading-relaxed ${
                currentSentence === idx ? 'text-emerald-100' : 'text-gray-300'
              }`}>
                {sentence}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800">
        <p className="text-sm text-gray-400">
          <span className="text-emerald-500 font-medium">Nota:</span> El audio usa Web Speech API del navegador. 
          La calidad puede variar según tu sistema.
        </p>
      </div>
    </div>
  );
}
