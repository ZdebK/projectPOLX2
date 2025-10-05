import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface PensionSimulatorProps {
  pensionAmount: number;
  onBack: () => void;
}

interface FormData {
  age: string;
  gender: string;
  salary: string;
  startYear: string;
  retirementYear: string;
}

export function PensionSimulator({ pensionAmount, onBack }: PensionSimulatorProps) {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    gender: '',
    salary: '',
    startYear: '',
    retirementYear: ''
  });
  
  const [showResults, setShowResults] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDownloadData = () => {
    // Simulate downloading and filling form with sample data
    setFormData({
      age: '35',
      gender: 'male',
      salary: '6500',
      startYear: '2010',
      retirementYear: '2055'
    });
  };

  const handleSimulate = () => {
    if (formData.age && formData.gender && formData.salary && formData.startYear && formData.retirementYear) {
      setShowResults(true);
      setTimeout(() => setShowOptions(true), 1000);
    }
  };

  const pieData = [
    { name: 'Brakuje do celu', value: 60, color: '#ef4444' },
    { name: 'Już masz', value: 40, color: '#22c55e' }
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header with ZUS Logo */}
      <header className="bg-white shadow-sm p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
          
          <Button onClick={onBack} variant="outline">
            ← Powrót
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl mb-6 text-gray-800">
              Symulacja emerytury dla {pensionAmount.toLocaleString()} zł
            </h2>

            <div className="space-y-6">
              {/* Age */}
              <div>
                <Label htmlFor="age">Wiek</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="np. 35"
                  className="mt-2"
                />
              </div>

              {/* Gender */}
              <div>
                <Label>Płeć</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Wybierz płeć" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Mężczyzna</SelectItem>
                    <SelectItem value="female">Kobieta</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Salary */}
              <div>
                <Label htmlFor="salary">Wynagrodzenie (zł)</Label>
                <Input
                  id="salary"
                  type="number"
                  value={formData.salary}
                  onChange={(e) => handleInputChange('salary', e.target.value)}
                  placeholder="np. 6500"
                  className="mt-2"
                />
              </div>

              {/* Start Year */}
              <div>
                <Label htmlFor="start-year">Rok rozpoczęcia pracy</Label>
                <Input
                  id="start-year"
                  type="number"
                  value={formData.startYear}
                  onChange={(e) => handleInputChange('startYear', e.target.value)}
                  placeholder="np. 2010"
                  className="mt-2"
                />
              </div>

              {/* Retirement Year */}
              <div>
                <Label htmlFor="retirement-year">Planowany rok zakończenia aktywności zawodowej</Label>
                <Input
                  id="retirement-year"
                  type="number"
                  value={formData.retirementYear}
                  onChange={(e) => handleInputChange('retirementYear', e.target.value)}
                  placeholder="np. 2055"
                  className="mt-2"
                />
              </div>

              {/* Download Data Button */}
              <Button
                onClick={handleDownloadData}
                variant="outline"
                className="w-full flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                POBIERZ DANE
              </Button>

              {/* Simulate Button */}
              <Button
                onClick={handleSimulate}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                disabled={!formData.age || !formData.gender || !formData.salary || !formData.startYear || !formData.retirementYear}
              >
                Zasymuluj
              </Button>
            </div>
          </div>

          {/* Right Side - Results */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            {!showResults ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <p>Wypełnij formularz i kliknij "Zasymuluj"</p>
                  <p>aby zobaczyć analizę swojej emerytury</p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl mb-6 text-gray-800">Analiza Twojej emerytury</h3>
                
                {/* Pie Chart */}
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Results Summary */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <div className="text-red-600">Brakuje do celu</div>
                    <div className="text-2xl text-red-800">60%</div>
                    <div className="text-sm text-red-600">~{Math.round(pensionAmount * 0.6).toLocaleString()} zł</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-green-600">Już masz</div>
                    <div className="text-2xl text-green-800">40%</div>
                    <div className="text-sm text-green-600">~{Math.round(pensionAmount * 0.4).toLocaleString()} zł</div>
                  </div>
                </div>

                {/* Options Popup */}
                {showOptions && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 relative">
                    <div className="absolute -top-2 left-6 w-4 h-4 bg-blue-50 border-l border-t border-blue-200 transform rotate-45"></div>
                    
                    <h4 className="mb-4 text-blue-800">
                      Czy wiesz jak zwiększyć swoją emeryturę?
                    </h4>
                    
                    <div className="flex flex-wrap gap-3">
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => alert('Informacje o IKE - Indywidualnym Koncie Emerytalnym')}
                      >
                        IKE
                      </Button>
                      
                      <Button 
                        size="sm" 
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => alert('Informacje o PPK - Pracowniczych Planach Kapitałowych')}
                      >
                        PPK
                      </Button>
                      
                      <Button 
                        size="sm" 
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => alert('Informacje o obligacjach skarbowych')}
                      >
                        Obligacje
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}