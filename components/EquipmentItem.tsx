
import React from 'react';
import type { Equipment } from '../types';

interface EquipmentItemProps {
  item: Equipment;
  status?: 'Presente' | 'Ausente';
  onStatusChange: (itemId: string, status: 'Presente' | 'Ausente') => void;
}

const EquipmentItem: React.FC<EquipmentItemProps> = ({ item, status, onStatusChange }) => {
  const sizeClasses = "w-24 h-24 sm:w-32 sm:h-32";
  const isPresent = status === 'Presente';
  const isAbsent = status === 'Ausente';
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row items-center gap-6">
      <img
        src={item.image}
        alt={`Imagem de ${item.name}`}
        className={`${sizeClasses} object-contain flex-shrink-0 bg-white rounded-md`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = 'https://placehold.co/150x150/EFEFEF/333?text=Imagem+N/A';
        }}
      />
      <div className="flex-1 text-center sm:text-left w-full">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{item.name}</h3>
        <div className="mt-3 flex justify-center sm:justify-start gap-4">
          <label 
            className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border transition-all duration-200 ease-in-out ${isPresent ? 'bg-green-100 border-green-400 text-green-800 dark:bg-green-900/50 dark:border-green-600 dark:text-green-300' : 'border-gray-300 dark:border-gray-600'}`}
          >
            <input
              type="radio"
              name={`status-${item.id}`}
              value="Presente"
              checked={isPresent}
              onChange={() => onStatusChange(item.id, 'Presente')}
              className="form-radio h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
            />
            <span className={isPresent ? 'font-semibold' : ''}>Presente</span>
          </label>
          <label
            className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border transition-all duration-200 ease-in-out ${isAbsent ? 'bg-red-100 border-red-400 text-red-800 dark:bg-red-900/50 dark:border-red-600 dark:text-red-300' : 'border-gray-300 dark:border-gray-600'}`}
          >
            <input
              type="radio"
              name={`status-${item.id}`}
              value="Ausente"
              checked={isAbsent}
              onChange={() => onStatusChange(item.id, 'Ausente')}
              className="form-radio h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300"
            />
            <span className={isAbsent ? 'font-semibold' : ''}>Ausente</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default EquipmentItem;