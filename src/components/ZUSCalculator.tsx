import React, { useState } from 'react';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Button } from './ui/button';
import exampleImage from 'figma:asset/c89748a4e3f6fa46bec83e7f8cfd773d170f7950.png';
import { ActivityDashboard } from './ActivityDashboard';
import { PensionSimulator } from './PensionSimulator';

export function ZUSCalculator() {
  const [pensionAmount, setPensionAmount] = useState(3000);
  const [currentPage, setCurrentPage] = useState<'calculator' | 'dashboard' | 'simulator'>('calculator');
  const minAmount = 500;
  const maxAmount = 50000;

  const handleSliderChange = (value: number[]) => {
    setPensionAmount(value[0]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setPensionAmount(Math.max(minAmount, Math.min(maxAmount, value)));
  };

  const handleCheck = () => {
    setCurrentPage('dashboard');
  };

  if (currentPage === 'dashboard') {
    return <ActivityDashboard 
      pensionAmount={pensionAmount} 
      onBack={() => setCurrentPage('calculator')}
      onNext={() => setCurrentPage('simulator')}
    />;
  }

  if (currentPage === 'simulator') {
    return <PensionSimulator 
      pensionAmount={pensionAmount} 
      onBack={() => setCurrentPage('dashboard')} 
    />;
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center p-8">
      {/* Component 1 indicator */}
      <div className="absolute top-8 left-8">
        <span className="text-purple-500 text-sm flex items-center gap-1">
          <span className="w-2 h-2 bg-purple-500 transform rotate-45"></span>
          Component 1
        </span>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-16">
          <div className="flex items-center gap-4">
            {/* ZUS Logo */}
            <div className="bg-teal-600 text-white px-6 py-4 rounded-lg">
              <span className="text-4xl font-bold">ZUS</span>
            </div>
            
            {/* Divider */}
            <div className="w-px h-16 bg-teal-600"></div>
            
            {/* Academy Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-teal-600 p-3 rounded-lg">
                <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-6 h-4 bg-teal-600 rounded-sm relative">
                    <div className="absolute -top-1 left-1 w-4 h-2 border-2 border-teal-600 rounded-t"></div>
                  </div>
                </div>
              </div>
              <div className="text-teal-600">
                <div className="text-xl font-bold">Akademia</div>
                <div className="text-xl font-bold">Przyszłego</div>
                <div className="text-xl font-bold">Portfela</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-between gap-16">
          {/* Left Side - Calculator */}
          <div className="flex-1 max-w-lg">
            <h1 className="text-2xl text-gray-800 mb-12">
              Jaką emeryturę chciałbyś otrzymywać?
            </h1>

            {/* Amount Input */}
            <div className="mb-8">
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 max-w-xs">
                <Input
                  type="number"
                  value={pensionAmount}
                  onChange={handleInputChange}
                  className="border-0 bg-transparent text-center text-xl outline-none focus-visible:ring-0"
                  min={minAmount}
                  max={maxAmount}
                />
                <span className="text-xl text-gray-600 pr-2">zł</span>
              </div>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <Slider
                value={[pensionAmount]}
                onValueChange={handleSliderChange}
                max={maxAmount}
                min={minAmount}
                step={100}
                className="w-full"
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>{minAmount.toLocaleString()}zł</span>
                <span>{maxAmount.toLocaleString()}zł</span>
              </div>
            </div>

            {/* Check Button */}
            <Button
              onClick={handleCheck}
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-lg"
            >
              Sprawdź
            </Button>
          </div>

          {/* Right Side - Wallet Character */}
          <div className="flex-shrink-0">
            <img
              src={exampleImage}
              alt="Cartoon wallet character with money"
              className="w-64 h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}