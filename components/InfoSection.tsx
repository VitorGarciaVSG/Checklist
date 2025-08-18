
import React from 'react';
import type { FormData } from '../types';
import { TEAMS, ASSETS, TEAM_ASSET_MAP } from '../constants';

interface InfoSectionProps {
    formData: FormData;
    onFormChange: (field: keyof FormData, value: string) => void;
}

const InfoSection: React.FC<InfoSectionProps> = ({ formData, onFormChange }) => {
    
    const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const team = e.target.value;
        onFormChange('teamMember', team);
        const associatedAsset = TEAM_ASSET_MAP[team] || "";
        onFormChange('assetNumber', associatedAsset);
    };

    return (
        <section className="p-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <label htmlFor="report-date" className="block text-sm font-medium text-gray-700">Data</label>
                    <input 
                        type="date" 
                        id="report-date" 
                        value={formData.reportDate}
                        onChange={(e) => onFormChange('reportDate', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-gray-50" 
                    />
                </div>
                <div>
                    <label htmlFor="team-member" className="block text-sm font-medium text-gray-700">Equipe <span className="text-red-500">*</span></label>
                    <select 
                        id="team-member"
                        value={formData.teamMember}
                        onChange={handleTeamChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        <option value="">Selecione a equipe</option>
                        {TEAMS.map(team => <option key={team} value={team}>{team}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="asset-number" className="block text-sm font-medium text-gray-700">Coletora RTK - patrimonio <span className="text-red-500">*</span></label>
                    <select 
                        id="asset-number" 
                        value={formData.assetNumber}
                        onChange={(e) => onFormChange('assetNumber', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md p-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    >
                        <option value="">Selecione um patrimônio</option>
                        {ASSETS.map(asset => <option key={asset} value={asset}>{asset}</option>)}
                    </select>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
