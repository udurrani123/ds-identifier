export default function About() {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-green-800 text-center mb-8">
            About Plant Identifier
          </h1>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <p className="mb-4">
              Welcome to our plant identification tool! We&apos;re here to help you discover and learn about the plants around you.
            </p>
            
            <p className="mb-4">
              Whether you&apos;re a gardening enthusiast or just curious about a plant you&apos;ve encountered, our AI-powered system can help identify plants and provide valuable information about their care.
            </p>
            
            <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-4">
              How it works
            </h2>
            
            <ol className="list-decimal list-inside space-y-2">
              <li>Upload a clear photo of the plant you want to identify</li>
              <li>Our AI analyzes the image using advanced machine learning</li>
              <li>Receive detailed information about the plant&apos;s identity and care instructions</li>
            </ol>
            
            <p className="mt-6">
              It&apos;s that simple! Start exploring the world of plants today.
            </p>
          </div>
        </div>
      </div>
    );
  }