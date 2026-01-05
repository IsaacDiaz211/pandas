import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { useState } from 'react';
import type { TextRequest, TranslationResponse, LanguageCode } from './types/api';
import { SUPPORTED_LANGUAGES, isChineseResponse } from './types/api';
import { translateText } from './services/api';
import Step0Input from './components/Step0Input';
import Step1Translation from './components/Step1Translation';
import Step2Audio from './components/Step2Audio';
import Step3Gloss from './components/Step3Gloss';
import Step3Chinese from './components/Step3Chinese';
import Step4Original from './components/Step4Original';
import Step5Grammar from './components/Step5Grammar';
import { Spin, message } from 'antd';

function App() {
  const [request, setRequest] = useState<TextRequest | null>(null);
  const [response, setResponse] = useState<TranslationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [originalSentences, setOriginalSentences] = useState<string[]>([]);

  const handleSubmit = async (data: TextRequest) => {
    setLoading(true);
    try {
      const result = await translateText(data);
      setRequest(data);
      setResponse(result);
      
      // Extraer oraciones originales del glossedText
      if (isChineseResponse(result)) {
        setOriginalSentences(result.glossedText.map(g => g.separateWords.join('')));
      } else {
        setOriginalSentences(result.glossedText.map(g => g.originalText.join(' ')));
      }
      
      setSelectedTab(1);
      message.success('¡Texto procesado correctamente!');
    } catch (error) {
      message.error('Error al procesar el texto. Verifica que el backend esté activo.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const isChinese = request?.l2 === 'zh';
  
  const tabs = isChinese 
    ? ['Entrada', 'Traducción', 'Audio', 'Pinyin', 'Palabras', 'Original', 'Gramática']
    : ['Entrada', 'Traducción', 'Audio', 'Gloss', 'Original', 'Gramática'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-emerald-950 text-gray-100">
      <header className="border-b border-emerald-900/50 backdrop-blur-sm bg-gray-950/80 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-xl">
            🐼
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
              Comprensible Pandas
            </h1>
            <p className="text-xs text-gray-500">Aprende idiomas leyendo</p>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Spin spinning={loading} tip="Procesando texto..." size="large">
          <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
            <TabList className="flex gap-1 rounded-2xl bg-gray-900/80 p-1.5 mb-6 overflow-x-auto">
              {tabs.map((tab, idx) => (
                <Tab
                  key={tab}
                  disabled={idx > 0 && !response}
                  className={({ selected }) =>
                    `flex-1 min-w-[80px] rounded-xl py-2.5 px-3 text-sm font-medium transition-all duration-200
                    ${selected 
                      ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-500/25' 
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'}
                    ${idx > 0 && !response ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`
                  }
                >
                  <span className="hidden sm:inline">{tab}</span>
                  <span className="sm:hidden">{idx}</span>
                </Tab>
              ))}
            </TabList>

            <TabPanels>
              <TabPanel>
                <Step0Input 
                  onSubmit={handleSubmit} 
                  languages={SUPPORTED_LANGUAGES}
                />
              </TabPanel>
              
              <TabPanel>
                {response && request && (
                  <Step1Translation 
                    translations={response.translatedText}
                    targetLang={SUPPORTED_LANGUAGES[request.l2 as LanguageCode]}
                  />
                )}
              </TabPanel>
              
              <TabPanel>
                {response && request && (
                  <Step2Audio 
                    sentences={originalSentences}
                    lang={request.l2}
                  />
                )}
              </TabPanel>
              
              {isChinese ? (
                <>
                  <TabPanel>
                    {response && isChineseResponse(response) && (
                      <Step3Chinese 
                        glossedText={response.glossedText}
                        translations={response.translatedText}
                        mode="pinyin"
                      />
                    )}
                  </TabPanel>
                  <TabPanel>
                    {response && isChineseResponse(response) && (
                      <Step3Chinese 
                        glossedText={response.glossedText}
                        translations={response.translatedText}
                        mode="words"
                      />
                    )}
                  </TabPanel>
                </>
              ) : (
                <TabPanel>
                  {response && !isChineseResponse(response) && (
                    <Step3Gloss glossedText={response.glossedText} />
                  )}
                </TabPanel>
              )}
              
              <TabPanel>
                {response && (
                  <Step4Original sentences={originalSentences} />
                )}
              </TabPanel>
              
              <TabPanel>
                {response?.grammarPoints && (
                  <Step5Grammar grammarPoints={response.grammarPoints} />
                )}
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </Spin>
      </main>

      <footer className="border-t border-emerald-900/30 mt-auto py-4 text-center text-gray-600 text-sm">
        Comprensible Pandas © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
