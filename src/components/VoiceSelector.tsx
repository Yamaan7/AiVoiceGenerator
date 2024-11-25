import React from 'react';
import { Select } from './ui/Select';
import { Slider } from './ui/Slider';

interface VoiceSelectorProps {
  voice: string;
  setVoice: (voice: string) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  rate: number;
  setRate: (rate: number) => void;
  voices: SpeechSynthesisVoice[];
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  voice,
  setVoice,
  pitch,
  setPitch,
  rate,
  setRate,
  voices,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Voice
        </label>
        <Select
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          className="w-full text-sm sm:text-base"
        >
          {voices.map((v) => (
            <option key={v.name} value={v.name}>
              {v.name} ({v.lang})
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Pitch: {pitch.toFixed(1)}
        </label>
        <Slider
          value={pitch}
          onChange={(value) => setPitch(value)}
          min={0.5}
          max={2}
          step={0.1}
        />
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Speed: {rate.toFixed(1)}x
        </label>
        <Slider
          value={rate}
          onChange={(value) => setRate(value)}
          min={0.5}
          max={2}
          step={0.1}
        />
      </div>
    </div>
  );
};

export { VoiceSelector };