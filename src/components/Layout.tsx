import React from 'react';
import { Smartphone } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Smartphone className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">Financiacel</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Aplicaciones</a>
            <a href="#" className="text-gray-700 hover:text-blue-600Retrieve Application transition-colors font-medium">Clientes</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Telefonos</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">Reportes</a>
          </nav>
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center text-gray-500 text-sm">
          <p>© 2025 Fnanciacel. Derechos reservados</p>
        </div>
      </footer>
    </div>
  );
};