
import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="border-8 border-gray-200 border-t-8 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
        </div>
    );
};

export default Loader;
