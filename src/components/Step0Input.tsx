import { useState } from 'react';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { Input, Button } from 'antd';
import { SendOutlined, SwapOutlined } from '@ant-design/icons';
import type { TextRequest, LanguageCode } from '../types/api';

const { TextArea } = Input;

interface Props {
  onSubmit: (data: TextRequest) => void;
  languages: Record<string, string>;
}

export default function Step0Input({ onSubmit, languages }: Props) {
  const [text, setText] = useState('');
  const [l1, setL1] = useState<LanguageCode>('es');
  const [l2, setL2] = useState<LanguageCode>('en');

  const langEntries = Object.entries(languages) as [LanguageCode, string][];

  const handleSwap = () => {
    setL1(l2);
    setL2(l1);
  };

  const handleSubmit = () => {
    if (text.trim() && l1 !== l2) {
      onSubmit({ text: text.trim(), l1, l2 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-900/60 rounded-2xl p-6 border border-emerald-900/30">
        <h2 className="text-lg font-semibold text-emerald-400 mb-4">
          Paso 0: Ingresa tu texto
        </h2>
        
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {/* Lengua materna */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs text-gray-500 mb-1">Tu idioma</label>
            <Listbox value={l1} onChange={setL1}>
              <div className="relative">
                <ListboxButton className="w-full rounded-xl bg-gray-800 border border-gray-700 py-2.5 px-4 text-left text-gray-200 hover:border-emerald-600 transition-colors">
                  {languages[l1]}
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-1 w-full rounded-xl bg-gray-800 border border-gray-700 py-1 shadow-xl">
                  {langEntries.map(([code, name]) => (
                    <ListboxOption
                      key={code}
                      value={code}
                      className={({ active }) =>
                        `px-4 py-2 cursor-pointer ${active ? 'bg-emerald-600/30 text-emerald-300' : 'text-gray-300'}`
                      }
                    >
                      {name}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>

          <Button 
            type="text" 
            icon={<SwapOutlined />} 
            onClick={handleSwap}
            className="!text-emerald-500 hover:!text-emerald-400 mt-5"
          />

          {/* Lengua target */}
          <div className="flex-1 min-w-[140px]">
            <label className="block text-xs text-gray-500 mb-1">Idioma a aprender</label>
            <Listbox value={l2} onChange={setL2}>
              <div className="relative">
                <ListboxButton className="w-full rounded-xl bg-gray-800 border border-gray-700 py-2.5 px-4 text-left text-gray-200 hover:border-emerald-600 transition-colors">
                  {languages[l2]}
                </ListboxButton>
                <ListboxOptions className="absolute z-10 mt-1 w-full rounded-xl bg-gray-800 border border-gray-700 py-1 shadow-xl">
                  {langEntries.map(([code, name]) => (
                    <ListboxOption
                      key={code}
                      value={code}
                      disabled={code === l1}
                      className={({ active, disabled }) =>
                        `px-4 py-2 cursor-pointer ${active ? 'bg-emerald-600/30 text-emerald-300' : 'text-gray-300'} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`
                      }
                    >
                      {name}
                    </ListboxOption>
                  ))}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        </div>

        <TextArea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pega aquí el texto en el idioma que quieres aprender (máx. 450 caracteres)"
          maxLength={450}
          showCount
          rows={6}
          className="
                    !bg-gray-800 
                    !border-gray-700 
                    !text-gray-200 
                    !rounded-xl 
                    hover:!border-emerald-600 
                    focus:!border-emerald-500
                    [&_textarea]:placeholder:!text-gray-400"
          classNames={{ textarea: "!placeholder:text-gray-200" }}
          styles={{ textarea: { backgroundColor: '#1f2937', color: '#e5e7eb' }, count: { color: '#6b7280' } }}
        />

        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSubmit}
          disabled={!text.trim() || l1 === l2}
          size="large"
          className="mt-4 w-full !bg-gradient-to-r !from-emerald-600 !to-green-600 !border-0 !rounded-xl !h-12 !font-semibold hover:!from-emerald-500 hover:!to-green-500"
        >
          Procesar texto
        </Button>
      </div>

      <div className="bg-gray-900/40 rounded-xl p-4 border border-gray-800">
        <p className="text-sm text-gray-400">
          <span className="text-emerald-500 font-medium">Tip:</span> Elige textos cortos y significativos. 
          Los mejores resultados vienen de textos auténticos como noticias, artículos o pasajes de libros.
        </p>
      </div>
    </div>
  );
}
