
import type { FormData, EquipmentStatus, Photo } from '../types';
import { EQUIPMENTS } from '../constants';

// Access libraries from window object
const { jsPDF } = (window as any).jspdf;
const html2canvas = (window as any).html2canvas;

const generatePDFReport = async (
    formData: FormData,
    equipmentStatus: EquipmentStatus,
    photos: Photo[],
    signatureDataUrl: string
): Promise<void> => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const reportContainer = document.getElementById('report-container');
    if (!reportContainer) {
        throw new Error('Report container not found');
    }

    const formattedDate = formData.reportDate
        ? new Date(formData.reportDate + 'T00:00:00').toLocaleDateString('pt-BR')
        : 'Não preenchida';

    let statusHTML = '';
    EQUIPMENTS.forEach(equip => {
        const statusValue = equipmentStatus[equip.id] || 'N/A';
        let statusColor = statusValue === 'Presente' ? '#16a34a' : '#dc2626';
        statusHTML += `
            <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6;">
                <p style="margin: 0; color: #374151;">${equip.name}</p>
                <p style="margin: 0; font-weight: 600; color: ${statusColor};">${statusValue}</p>
            </div>`;
    });
     if (statusHTML !== '') {
        statusHTML = `<h3 style="font-size: 1.1rem; font-weight: 600; color: #1f2937; margin-top: 2rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Status dos Equipamentos</h3>` + statusHTML;
    }

    const termoResponsabilidadeHTML = `
        <div style="margin-top: 2.5rem; padding: 1rem; border: 1px solid #e5e7eb; background-color: #f9fafb; border-radius: 8px; font-size: 0.8rem; color: #4b5563;">
            <p style="font-weight: bold; margin: 0 0 0.5rem 0; color: #1f2937;">Termo de Responsabilidade</p>
            <p style="margin: 0;">Declaro estar ciente de que todos os equipamentos e informações descritos neste documento são de minha inteira responsabilidade, assumindo o compromisso de zelar por sua integridade e segurança.</p>
        </div>`;

    const reportHTML = `
        <div style="background-color: #ffffff; font-family: 'Inter', sans-serif;">
            <header style="background-color: #0d4475; color: white; padding: 2rem; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <p style="font-size: 0.875rem; font-weight: 600; color: #a3bde3; letter-spacing: 0.05em;">CHECKLIST DE EQUIPAMENTOS</p>
                    <h1 style="font-size: 2.5rem; font-weight: 800; color: #ffffff; margin: 0;">KIT TOPOGRAFIA</h1>
                    <p style="font-size: 1rem; color: #d1e0f7; margin: 0.25rem 0 0;">PANPP</p>
                </div>
                <img src="https://s3.caesb.df.gov.br/www/prod/site1/2024/06/LOGO-CAESB-BRANCA-COMPLETA.png" style="height: 64px;" crossorigin="anonymous">
            </header>
            <div style="padding: 2rem;">
                <section style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1.5rem;">
                    <div><p style="margin: 0; font-size: 0.8rem; color: #6b7280; font-weight: 500;">DATA</p><p style="margin: 0.25rem 0 0; font-size: 1.1rem; font-weight: 600;">${formattedDate}</p></div>
                    <div><p style="margin: 0; font-size: 0.8rem; color: #6b7280; font-weight: 500;">EQUIPE</p><p style="margin: 0.25rem 0 0; font-size: 1.1rem; font-weight: 600;">${formData.teamMember}</p></div>
                    <div><p style="margin: 0; font-size: 0.8rem; color: #6b7280; font-weight: 500;">PATRIMÔNIO</p><p style="margin: 0.25rem 0 0; font-size: 1.1rem; font-weight: 600;">${formData.assetNumber}</p></div>
                </section>
                ${statusHTML}
                ${termoResponsabilidadeHTML}
                <footer style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; text-align: center;">
                    <h3 style="font-weight: 600; font-size: 0.9rem; color: #4b5563;">ASSINATURA OFICIAL RESPONSÁVEL</h3>
                    <img src="${signatureDataUrl}" style="width: 250px; height: 125px; margin: 8px auto 0; border: 1px solid #d1d5db; background-color: #f9fafb; border-radius: 4px;">
                </footer>
            </div>
        </div>`;
    
    reportContainer.innerHTML = reportHTML;
    const canvasPage1 = await html2canvas(reportContainer, { scale: 2, useCORS: true });
    const imgDataPage1 = canvasPage1.toDataURL('image/png');
    const pdfWidth = doc.internal.pageSize.getWidth();
    const pdfHeight = (canvasPage1.height * pdfWidth) / canvasPage1.width;
    doc.addImage(imgDataPage1, 'PNG', 0, 0, pdfWidth, pdfHeight);

    photos.forEach((photo, index) => {
        doc.addPage();
        doc.setFontSize(16);
        doc.setTextColor(31, 41, 55);
        doc.text(`Anexo: Foto Geral ${index + 1}`, 15, 20);
        
        const imgData = photo.dataUrl;
        const imgProps = doc.getImageProperties(imgData);
        const imgWidth = 180;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        const yPos = (doc.internal.pageSize.getHeight() - imgHeight) / 2;
        doc.addImage(imgData, 'JPEG', 15, yPos > 30 ? yPos : 30, imgWidth, imgHeight);
    });

    doc.save('relatorio-checklist.pdf');
    reportContainer.innerHTML = ''; // Clean up
};

export default generatePDFReport;
