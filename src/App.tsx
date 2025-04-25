import React from 'react';
import { Layout } from './components/Layout';
import { CreditApplicationForm } from './components/CreditApplicationForm';
import { ApplicationRetrieval } from './components/ApplicationRetrieval';

function App() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Nueva aplicación a crédito</h2>
          <CreditApplicationForm />
        </section>
        
        <div className="border-t border-gray-200 my-10"></div>
        
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Ver aplicación</h2>
          <ApplicationRetrieval />
        </section>
      </div>
    </Layout>
  );
}

export default App;