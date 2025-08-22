
import React from 'react';
import { EQUIPMENTS } from '../constants';
import type { EquipmentStatus } from '../types';
import EquipmentItem from './EquipmentItem';

interface EquipmentListProps {
  statuses: EquipmentStatus;
  onStatusChange: (itemId: string, status: 'Presente' | 'Ausente') => void;
}

const EquipmentList: React.FC<EquipmentListProps> = ({ statuses, onStatusChange }) => {
  return (
    <main className="p-6 border-t border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 mb-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-md">EQUIPAMENTOS DE REFERÊNCIA</h2>
        <div className="flex flex-col">
            {EQUIPMENTS.map(item => (
                <EquipmentItem
                    key={item.id}
                    item={item}
                    status={statuses[item.id]}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    </main>
  );
};

export default EquipmentList;