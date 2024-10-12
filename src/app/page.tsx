'use client';

import { useState } from 'react';
import { Upload, Code, Info } from 'lucide-react';
import ImageUpload from './components/ImageUpload';
import CameraComponent from './components/CameraComponent';
import CodeInfo from './components/CodeInfo';

interface CodeData {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  commonUses: string;
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [codeData, setCodeData] = useState<CodeData | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    {
      icon: Upload,
      title: "Upload Code Image",
      description: "Take a photo or upload an image of a code snippet containing a data structure."
    },
    {
      icon: Code,
      title: "AI Analysis",
      description: "Our advanced AI analyzes the code to identify the data structure and its properties."
    },
    {
      icon: Info,
      title: "Get Information",
      description: "Receive detailed information about the data structure, including time complexity, space complexity, and common uses."
    }
  ];

  const handleImage = async (file: File) => {
    setIsLoading(true);
    setCodeData(null);
    setError(null);
    
    try {
      const objectUrl = URL.createObjectURL(file);
      setImageUrl(objectUrl);

      const base64Image = await convertToBase64(file);
      
      const response = await fetch('/api/identify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      setCodeData(data);
    } catch (error) {
      console.error('Error identifying data structure:', error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        <div className="text-center py-12">
          <h1 className="text-5xl font-bold mb-6">Data Structure Identifier</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Unlock the power of algorithms! Upload an image of code, and let
            our AI identify the data structure for you.
          </p>
          
          <div className="bg-gray-900 bg-opacity-50 rounded-lg p-8 mb-8 max-w-2xl mx-auto">
            {showCamera ? (
              <CameraComponent 
                onCapture={handleImage}
                onClose={() => setShowCamera(false)}
              />
            ) : (
              <div className="space-y-4">
                <ImageUpload onImageUpload={handleImage} />
                <button
                  onClick={() => setShowCamera(true)}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Use Camera
                </button>
              </div>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center space-x-2 mb-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <p className="text-white">Analyzing your code...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500 bg-opacity-20 border-l-4 border-red-500 p-4 mb-8 text-white">
            <p>{error}</p>
          </div>
        )}

        {codeData && imageUrl && (
          <div className="mb-16">
            <CodeInfo codeData={codeData} imageUrl={imageUrl} />
          </div>
        )}

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="bg-gray-900 bg-opacity-50 rounded-lg p-6 text-center">
                  <div className="bg-blue-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-gray-900" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}