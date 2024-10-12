import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">About CodeID</h3>
            <p className="text-gray-600">
              Our AI-powered code identification tool helps you discover and learn about the data structures around you.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-green-500">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-500">About</Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-500">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-green-500">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-green-500">Blog</Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-green-500">FAQ</Link>
              </li>
              <li>
                <Link href="/guide" className="text-gray-600 hover:text-green-500">User Guide</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-green-500">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-500">Facebook</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-green-500">Instagram</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} CodeID. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}