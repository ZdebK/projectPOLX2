import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { User, UserX } from 'lucide-react';

interface ActivityDashboardProps {
  pensionAmount: number;
  onBack: () => void;
  onNext: () => void;
}

export function ActivityDashboard({ pensionAmount, onBack, onNext }: ActivityDashboardProps) {
  const [showActivityBreakdown, setShowActivityBreakdown] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female'>('male');

  const getIconColor = (index: number) => {
    // 3rd icon (index 2) is always green
    if (index === 2) {
      return 'text-green-500';
    }
    
    if (!showActivityBreakdown) {
      return 'text-gray-300';
    }
    
    if (selectedGender === 'male') {
      // 4 icons blue for male
      return index < 4 ? 'text-blue-500' : 'text-gray-300';
    } else {
      // 6 icons pink for female
      return index < 6 ? 'text-pink-500' : 'text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header with ZUS Logo and Switch */}
      <header className="bg-white shadow-sm p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* ZUS Logo */}
          <div className="flex items-center gap-4">
            <div className="bg-teal-600 text-white px-6 py-4 rounded-lg">
              <span className="text-2xl">ZUS</span>
            </div>
            <div className="w-px h-12 bg-teal-600"></div>
            <div className="flex items-center gap-3">
              <div className="bg-teal-600 p-2 rounded-lg">
                <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                  <div className="w-4 h-3 bg-teal-600 rounded-sm relative">
                    <div className="absolute -top-1 left-1 w-3 h-1.5 border-2 border-teal-600 rounded-t"></div>
                  </div>
                </div>
              </div>
              <div className="text-teal-600">
                <div className="text-sm">Akademia</div>
                <div className="text-sm">Przyszłego</div>
                <div className="text-sm">Portfela</div>
              </div>
            </div>
          </div>

          {/* Switch */}
          <div className="flex items-center gap-3">
            <Label htmlFor="activity-switch" className="text-sm text-gray-700">
              Pokazuj szczegóły aktywności
            </Label>
            <Switch
              id="activity-switch"
              checked={showActivityBreakdown}
              onCheckedChange={setShowActivityBreakdown}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-lg p-8 shadow-sm">
          {/* Back Button */}
          <Button 
            onClick={onBack}
            variant="outline"
            className="mb-6"
          >
            ← Powrót
          </Button>

          {/* Pension Amount Display */}
          <div className="mb-8">
            <h1 className="text-2xl text-gray-800 mb-2">
              Twoja docelowa emerytura: {pensionAmount.toLocaleString()} zł
            </h1>
          </div>

          {/* Gender Selection */}
          {showActivityBreakdown && (
            <div className="mb-8">
              <Label className="text-sm text-gray-700 mb-4 block">
                Kliknij tutaj, żeby zobaczyć jak rozkładają się procenty niskiej aktywności zawodowej
              </Label>
              
              <RadioGroup 
                value={selectedGender} 
                onValueChange={(value: 'male' | 'female') => setSelectedGender(value)}
                className="flex gap-8"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="flex items-center gap-2 cursor-pointer">
                    <User className="w-6 h-6 text-blue-500" />
                    <span>&le; 25 lat pracy</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="flex items-center gap-2 cursor-pointer">
                    <UserX className="w-6 h-6 text-pink-500" />
                    <span>&le; 20 lat pracy</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Progress Bar Dashboard */}
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-xl mb-6 text-gray-800">
              Statystyki aktywności zawodowej
            </h2>
            
            {/* Progress Bar with Icons */}
            <div className="flex justify-center items-center gap-4 mb-6">
              {Array.from({ length: 10 }, (_, index) => (
                <div key={index} className="flex flex-col items-center">
                  <User 
                    className={`w-12 h-12 ${getIconColor(index)} transition-colors duration-300`}
                    strokeWidth={1.5}
                  />
                  <span className="text-xs text-gray-500 mt-1">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span>Aktywni zawodowo (30%)</span>
              </div>
              
              {showActivityBreakdown && (
                <>
                  {selectedGender === 'male' && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Mężczyźni - niska aktywność (40%)</span>
                    </div>
                  )}
                  
                  {selectedGender === 'female' && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-pink-500 rounded"></div>
                      <span>Kobiety - niska aktywność (60%)</span>
                    </div>
                  )}
                </>
              )}
              
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span>Pozostali</span>
              </div>
            </div>

            {/* Statistics Summary */}
            <div className="mt-8 p-4 bg-white rounded-lg">
              <h3 className="mb-4 text-gray-800">Podsumowanie:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-green-50 rounded">
                  <div className="text-green-600">Aktywni zawodowo</div>
                  <div className="text-2xl text-green-800">30%</div>
                </div>
                
                {showActivityBreakdown && selectedGender === 'male' && (
                  <div className="text-center p-3 bg-blue-50 rounded">
                    <div className="text-blue-600">Mężczyźni - niska aktywność</div>
                    <div className="text-2xl text-blue-800">40%</div>
                  </div>
                )}
                
                {showActivityBreakdown && selectedGender === 'female' && (
                  <div className="text-center p-3 bg-pink-50 rounded">
                    <div className="text-pink-600">Kobiety - niska aktywność</div>
                    <div className="text-2xl text-pink-800">60%</div>
                  </div>
                )}
                
                <div className="text-center p-3 bg-gray-50 rounded">
                  <div className="text-gray-600">Pozostali</div>
                  <div className="text-2xl text-gray-800">
                    {showActivityBreakdown 
                      ? (selectedGender === 'male' ? '30%' : '10%')
                      : '70%'
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Next Button */}
            <div className="mt-8 flex justify-end">
              <Button
                onClick={onNext}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-2 rounded-lg"
              >
                Symuluj emeryturę →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}