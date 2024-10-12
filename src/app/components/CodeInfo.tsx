import React from 'react';
import Image from 'next/image';
import { BarChart, Activity, Database } from 'lucide-react';

interface CodeInfoProps {
  codeData: {
    name: string;
    description: string;
    timeComplexity: string;
    spaceComplexity: string;
    commonUses: string;
  };
  imageUrl: string;
}

export default function CodeInfo({ codeData, imageUrl }: CodeInfoProps) {
  return (
    <div className="bg-gray-900 bg-opacity-50 rounded-lg overflow-hidden p-6">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2">
          <div className="text-blue-400 uppercase tracking-wide text-sm font-semibold mb-2">
            Data Structure Identified
          </div>
          <h2 className="text-3xl font-bold text-white mb-6">{codeData.name}</h2>
          
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <Image 
              src={imageUrl} 
              alt="Uploaded code" 
              width={400} 
              height={300} 
              className="w-full h-auto object-contain rounded"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Activity className="w-6 h-6 text-blue-400 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-blue-400">Time Complexity</h3>
                <p className="text-gray-300">{codeData.timeComplexity}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Database className="w-6 h-6 text-blue-400 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-blue-400">Space Complexity</h3>
                <p className="text-gray-300">{codeData.spaceComplexity}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <BarChart className="w-6 h-6 text-blue-400 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-blue-400">Common Uses</h3>
                <p className="text-gray-300 whitespace-pre-line">{codeData.commonUses}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/2 space-y-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-400 mb-2">Description</h3>
            <p className="text-gray-300">{codeData.description}</p>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-400 mb-2">Example Usage</h3>
            <div className="bg-gray-900 rounded p-4 overflow-x-auto">
              <pre className="text-gray-300 text-sm">
                <code>{`// Example usage of ${codeData.name}
${codeData.name.toLowerCase()}<Integer> ds = new ${codeData.name}<>();
ds.add(1);
ds.add(2);
ds.add(3);
int value = ds.remove(); // Removes and returns based on the data structure's behavior`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}