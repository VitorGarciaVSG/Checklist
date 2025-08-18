
import React, { useState, useCallback } from 'react';
import type { FormData, EquipmentStatus, Photo } from './types';
import { EQUIPMENTS } from './constants';
import { useSignaturePad } from './hooks/useSignaturePad';
import generatePDFReport from './services/pdfGenerator';

import Header from './components/Header';
import InfoSection from './components/InfoSection';
import EquipmentList from './components/EquipmentList';
import PhotoSection from './components/PhotoSection';
import SignatureSection from './components/SignatureSection';
import Loader from './components/Loader';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        reportDate: new Date().toISOString().split('T')[0],
        teamMember: '',
        assetNumber: ''
    });
    const [equipmentStatus, setEquipmentStatus] = useState<EquipmentStatus>({});
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [errors, setErrors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const { canvasRef, clearSignature, isCanvasBlank } = useSignaturePad();

    const handleFormChange = useCallback((field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleStatusChange = useCallback((itemId: string, status: 'Presente' | 'Ausente') => {
        setEquipmentStatus(prev => ({ ...prev, [itemId]: status }));
    }, []);

    const handleAddPhotos = useCallback((files: FileList) => {
        const newPhotos: Photo[] = [];
        for (const file of Array.from(files)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const dataUrl = e.target?.result as string;
                if (dataUrl) {
                    newPhotos.push({ id: `${file.name}-${Date.now()}`, dataUrl });
                    if (newPhotos.length === files.length) {
                        setPhotos(prev => [...prev, ...newPhotos]);
                    }
                }
            };
            reader.readAsDataURL(file);
        }
    }, []);
    
    const handleRemovePhoto = useCallback((photoId: string) => {
        setPhotos(prev => prev.filter(p => p.id !== photoId));
    }, []);
    
    const validateForm = (): boolean => {
        const newErrors: string[] = [];
        if (!formData.teamMember) newErrors.push('O campo "Equipe" é obrigatório.');
        if (!formData.assetNumber) newErrors.push('O campo "Patrimônio" é obrigatório.');
        if (isCanvasBlank()) newErrors.push('A "Assinatura" é obrigatória.');
        if (photos.length === 0) newErrors.push('É obrigatório adicionar pelo menos uma foto geral do kit.');
        
        const missingStatusItems = EQUIPMENTS.filter(e => !equipmentStatus[e.id]).map(e => e.name);
        if (missingStatusItems.length > 0) {
            newErrors.push(`É obrigatório marcar o status (Presente/Ausente) para: ${missingStatusItems.join(', ')}.`);
        }
        
        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleGenerateReport = async () => {
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        try {
            const signatureDataUrl = canvasRef.current?.toDataURL() || '';
            await generatePDFReport(formData, equipmentStatus, photos, signatureDataUrl);
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            setErrors(["Ocorreu um erro inesperado ao gerar o relatório. Tente novamente."]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loader />}
            <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-4xl">
                <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                    <Header />
                    <InfoSection formData={formData} onFormChange={handleFormChange} />
                    <EquipmentList statuses={equipmentStatus} onStatusChange={handleStatusChange} />
                    <PhotoSection photos={photos} onAddPhotos={handleAddPhotos} onRemovePhoto={handleRemovePhoto} />
                    <section className="p-6 border-t border-gray-200">
                        <div className="bg-gray-100 border-l-4 border-gray-500 text-gray-700 p-4 rounded-md" role="alert">
                            <p className="font-bold">Termo de Responsabilidade</p>
                            <p className="text-sm">Declaro estar ciente de que todos os equipamentos e informações descritos neste documento são de minha inteira responsabilidade, assumindo o compromisso de zelar por sua integridade e segurança.</p>
                        </div>
                    </section>
                    <SignatureSection canvasRef={canvasRef} onClear={clearSignature} />
                </div>
            </div>

            {/* Mobile Footer */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg flex flex-col items-center z-40">
                <ErrorMessage errors={errors} />
                <button onClick={handleGenerateReport} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full">
                    <i className="fas fa-file-pdf mr-2"></i>Gerar Relatório em PDF
                </button>
            </div>
             {/* Add padding to body to avoid content being hidden by fixed footer */}
            <div className="pb-28 md:hidden"></div>

            {/* Desktop Buttons */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl hidden md:block">
                <div className="mt-8 pt-6 border-t border-gray-300 flex flex-col items-center gap-4">
                     <ErrorMessage errors={errors} />
                     <button onClick={handleGenerateReport} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md w-full sm:w-auto">
                        <i className="fas fa-file-pdf mr-2"></i>Gerar Relatório em PDF
                    </button>
                     <p className="text-sm text-gray-500 text-center mt-2">
                        <strong>Instruções:</strong> 1. Preencha os campos. 2. Marque o status de cada item. 3. Adicione fotos. 4. Gere o PDF.
                    </p>
                </div>
            </div>
        </>
    );
};

export default App;
