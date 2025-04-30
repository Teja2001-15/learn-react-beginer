import React from 'react';
import InquiryForm from './components/InquiryForm';

const App = () => {
  return (
    <main className="container min-h-screen mx-auto bg-white-200">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-2xl p-8 bg-red-200 rounded-lg shadow-lg dark:bg-gray-800 dark:text-white">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Car Dealership Inquiry Form</h1>
          </div>
          <InquiryForm />
        </div>
      </div>
    </main>
  );
};

export default App;