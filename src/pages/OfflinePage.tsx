import React from 'react';

const OfflinePage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-4xl font-bold text-gray-800">You are Offline</h1>
            <p className="mt-4 text-lg text-gray-600">It seems you have lost your internet connection.</p>
            <p className="mt-2 text-lg text-gray-600">Please check your connection and try again.</p>
            <div className="mt-6">
                <img src="/images/offline-icon.png" alt="Offline" className="w-32 h-32" />
            </div>
            <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 transition">
                Retry
            </button>
        </div>
    );
};

export default OfflinePage;
