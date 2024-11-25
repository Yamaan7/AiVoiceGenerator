import React, { useState, useEffect } from 'react';
import { Mic, Play, Download, Pause, Volume2, Github } from 'lucide-react';
import { AudioVisualizer } from './components/AudioVisualizer';
import { VoiceSelector } from './components/VoiceSelector';

function App() {
  const [text, setText] = useState('');
  const [voice, setVoice] = useState('');
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setVoice(availableVoices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices.find(v => v.name === voice) || null;
    utterance.pitch = pitch;
    utterance.rate = rate;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    setIsPlaying(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-900">
      {/* Top Banner */}
      <div className="bg-blue-600 text-white py-2 px-4 text-center text-sm sm:text-base">
        <p className="flex items-center justify-center gap-2 flex-wrap">
          <span>Created with ❤️ by Yamaan</span>
          <a
            href="https://github.com/Yamaan7"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-blue-200 transition-colors"
          >
            <Github className="w-4 h-4 mr-1" />
            <span>Follow on GitHub</span>
          </a>
        </p>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-12">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4">
            <Mic className="w-8 h-8 sm:w-12 sm:h-12 text-blue-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            VoiceCraft Studio
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 px-4">
            Turn Your Text Into Realistic Speech—Free and Unlimited
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-4 sm:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Text Input and Controls */}
            <div className="lg:col-span-2 space-y-4">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here..."
                className="w-full h-48 sm:h-64 p-4 rounded-lg border border-gray-300 
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                  dark:bg-gray-700 dark:border-gray-600 dark:text-white
                  resize-none"
              />

              <div className="w-full">
                <AudioVisualizer isPlaying={isPlaying} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={speak}
                  className="flex-1 flex items-center justify-center gap-2 
                    bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                    py-3 px-6 rounded-lg transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-5 h-5" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      <span>Play</span>
                    </>
                  )}
                </button>

                <button
                  className="flex items-center justify-center gap-2 
                    bg-gray-100 hover:bg-gray-200 text-gray-800 
                    font-semibold py-3 px-6 rounded-lg transition-colors
                    dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600
                    sm:flex-initial flex-1"
                >
                  <Download className="w-5 h-5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Voice Settings */}
            <div className="bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-6">
                <Volume2 className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Voice Settings
                </h2>
              </div>

              <VoiceSelector
                voice={voice}
                setVoice={setVoice}
                pitch={pitch}
                setPitch={setPitch}
                rate={rate}
                setRate={setRate}
                voices={voices}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;