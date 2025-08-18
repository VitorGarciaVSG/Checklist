
import React from 'react';

interface ErrorMessageProps {
  errors: string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 w-full" role="alert">
      <strong className="font-bold">Erro de preenchimento!</strong>
      <ul className="list-disc list-inside mt-2 text-sm">
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </div>
  );
};

export default ErrorMessage;
