import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [certificateUrl, setCertificateUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/post', { name }, { responseType: 'blob' });
      const url = URL.createObjectURL(new Blob([response.data], { type: 'image/png' }));
      setCertificateUrl(url);
    } catch (error) {
      console.error('Error fetching certificate:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <form onSubmit={handleSubmit} className="mb-8 max-w-md mx-auto">
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Enter your name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Generate Certificate
        </button>
      </form>

      {certificateUrl && (
        <div className="mt-8 flex flex-col md:flex-row justify-center items-start">
          <div className="w-full md:w-3/4 pr-4">
            <img src={certificateUrl} alt="Certificate" className="max-w-full h-auto" />
          </div>
          <div className="w-full md:w-1/4 mt-4 md:mt-0 bg-blue-100 p-4 rounded flex flex-col items-center">
            <h2 className="text-xl font-bold text-blue-600 mb-2">Certificate recipient</h2>
            <p className="text-lg mb-4 text-center">{name}</p>
            <h2 className="text-xl font-bold text-blue-600 mb-2">Issued By</h2>
            <img src="/homepage.jpg" alt="Devtown Logo" className="mb-4" />
          </div>
        </div>
      )}
      {certificateUrl && (
        <div className="mt-4 text-md text-gray-600 font-sans w-3/4 ">
          The certificate affirms that <span className="font-bold">{name}</span> has satisfactorily fulfilled the requirements outlined. This validation ensures its authenticity, having been duly verified and granted by UNIPOOL.
        </div>
      )}
    </div>
  );
}

export default App;
