import Image from 'next/image';

interface PreviousResult {
  id: string;
  name: string;
  imageUrl: string;
  timestamp: string;
}

interface SidebarProps {
  previousResults: PreviousResult[];
  onResultClick: (result: PreviousResult) => void;
}

export default function Sidebar({ previousResults, onResultClick }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Previous Results</h2>
        <div className="space-y-4">
          {previousResults.length === 0 ? (
            <p className="text-gray-500 text-sm">No previous results</p>
          ) : (
            previousResults.map((result) => (
              <button
                key={result.id}
                onClick={() => onResultClick(result)}
                className="w-full text-left hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-10 h-10 relative">
                    <Image
                      src={result.imageUrl}
                      alt={result.name}
                      fill
                      className="object-cover rounded-md"
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {result.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {result.timestamp}
                    </p>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}