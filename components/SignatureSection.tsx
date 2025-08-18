
import React from 'react';

interface SignatureSectionProps {
    canvasRef: React.RefObject<HTMLCanvasElement>;
    onClear: () => void;
}

const SignatureSection: React.FC<SignatureSectionProps> = ({ canvasRef, onClear }) => (
    <section className="p-6">
        <div className="mt-4">
            <label className="block text-center font-semibold mb-2">ASSINATURA OFICIAL RESPONSÁVEL <span className="text-red-500">*</span></label>
            <div className="flex flex-col items-center">
                <canvas 
                    ref={canvasRef} 
                    id="signature-pad" 
                    className="border border-gray-400 rounded-md bg-gray-50 w-full max-w-md h-40 touch-none"
                ></canvas>
                <button 
                    onClick={onClear} 
                    className="mt-2 bg-red-500 text-white font-bold py-1 px-3 rounded-lg hover:bg-red-600 transition-colors text-sm"
                >
                    <i className="fas fa-eraser mr-1"></i> Limpar Assinatura
                </button>
            </div>
        </div>
    </section>
);

export default SignatureSection;
