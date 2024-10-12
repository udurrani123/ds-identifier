import React, { useRef, useState, useCallback } from 'react';
import { Camera, X } from 'lucide-react';

interface CameraComponentProps {
  onCapture: (file: File) => void;
  onClose: () => void;
}

export default function CameraComponent({ onCapture, onClose }: CameraComponentProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string>('');

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      setError('Unable to access camera. Please make sure you have granted camera permissions.');
      console.error('Error accessing camera:', err);
    }
  }, []);

  React.useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [startCamera, stream]);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert canvas to file
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "code-photo.jpg", { type: "image/jpeg" });
            onCapture(file);
          }
        }, 'image/jpeg');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col">
      <div className="relative flex-1">
        {error ? (
          <div className="text-white p-4 text-center mt-10">
            <p>{error}</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        )}
        <canvas ref={canvasRef} className="hidden" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-white p-2 rounded-full bg-gray-800"
        >
          <X className="w-6 h-6" />
        </button>
      </div>
      
      <div className="p-4 flex justify-center bg-black">
        <button
          onClick={captureImage}
          className="bg-white rounded-full p-4"
          disabled={!!error}
        >
          <Camera className="w-8 h-8 text-black" />
        </button>
      </div>
    </div>
  );
}