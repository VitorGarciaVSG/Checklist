
// --- CONSTANTS ---
const EQUIPMENTS = [
    { id: 'rtk', name: 'RTK', image: 'https://adenilsongiovanini.com.br/equipamentos/wp-content/webp-express/webp-images/uploads/2022/02/coletora-de-dados-r550.png.webp' },
    { id: 'coletora', name: 'COLETORA', image: 'https://www.embratop.com.br/wp-content/uploads/2024/04/RTK-Freyja-02.jpg' },
    { id: 'antena', name: 'ANTENA', image: 'http://escolarivers.com.br/wp-content/uploads/2025/08/image-1.png' },
    { id: 'suporte', name: 'SUPORTE COLETORA', image: 'http://escolarivers.com.br/wp-content/uploads/2025/08/Suporte-Coletor-Universal-Portatil-Para-Gps-Rtk-Zz-_-Parcelamento-sem-juros.png' },
    { id: 'niveladora', name: 'NIVELADORA', image: 'http://escolarivers.com.br/wp-content/uploads/2025/08/image-5.png' },
    { id: 'cabo', name: 'CABO USB-C', image: 'http://escolarivers.com.br/wp-content/uploads/2025/08/fb8byuwxmzfq0oj6tgvel8i6jpbwwenoxj5e_640x640fill_ffffff.jpg' }
];
const TEAM_ASSET_MAP = {
    'Equipe 1 - Bruno': '80811',
    'Equipe 2 - Jefferson': '80812',
    'Equipe 3 - Francivaldo': '80805',
    'Equipe 4 - Alexandro': '80807'
};
const TEAMS = Object.keys(TEAM_ASSET_MAP);
const ASSETS = Object.values(TEAM_ASSET_MAP);

// --- PDF GENERATOR ---
const { jsPDF } = window.jspdf;
const html2canvas = window.html2canvas;

const generatePDFReport = async (formData, equipmentStatus, photos, signatureDataUrl) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    const reportContainer = document.getElementById('report-container');
    if (!reportContainer) throw new Error('Report container not found');

    const formattedDate = formData.reportDate
        ? new Date(formData.reportDate + 'T00:00:00').toLocaleDateString('pt-BR')
        : 'Não preenchida';

    let statusHTML = EQUIPMENTS.map(equip => {
        const statusValue = equipmentStatus[equip.id] || 'N/A';
        const statusColor = statusValue === 'Presente' ? '#16a34a' : '#dc2626';
        return `
            <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #f3f4f6;">
                <p style="margin: 0; color: #374151;">${equip.name}</p>
                <p style="margin: 0; font-weight: 600; color: ${statusColor};">${statusValue}</p>
            </div>`;
    }).join('');
    statusHTML = `<h3 style="font-size: 1.1rem; font-weight: 600; color: #1f2937; margin-top: 2rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Status dos Equipamentos</h3>` + statusHTML;
    
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
        doc.setFontSize(16); doc.setTextColor(31, 41, 55);
        doc.text(`Anexo: Foto Geral ${index + 1}`, 15, 20);
        const imgProps = doc.getImageProperties(photo.dataUrl);
        const imgWidth = 180;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        const yPos = (doc.internal.pageSize.getHeight() - imgHeight) / 2;
        doc.addImage(photo.dataUrl, 'JPEG', 15, yPos > 30 ? yPos : 30, imgWidth, imgHeight);
    });

    doc.save('relatorio-checklist.pdf');
    reportContainer.innerHTML = ''; // Clean up
};

// --- MAIN APP LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // STATE
    const state = {
        equipmentStatus: {},
        photos: [],
        theme: localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    };

    // DOM ELEMENTS
    const loader = document.getElementById('loader');
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const reportDateInput = document.getElementById('report-date');
    const teamMemberSelect = document.getElementById('team-member');
    const assetNumberSelect = document.getElementById('asset-number');
    const equipmentListContainer = document.getElementById('equipment-list-container');
    const addPhotoButton = document.getElementById('add-photo-button');
    const photoUploadInput = document.getElementById('photo-upload-input');
    const photoPreviewContainer = document.getElementById('photo-preview-container');
    const clearSignatureButton = document.getElementById('clear-signature-button');
    const generateReportButtonMobile = document.getElementById('generate-report-button-mobile');
    const generateReportButtonDesktop = document.getElementById('generate-report-button-desktop');
    const errorContainerMobile = document.getElementById('error-message-container-mobile');
    const errorContainerDesktop = document.getElementById('error-message-container-desktop');
    const signatureCanvas = document.getElementById('signature-pad');

    // RENDER FUNCTIONS
    const renderEquipmentList = () => {
        equipmentListContainer.innerHTML = EQUIPMENTS.map(item => `
            <div class="border-b border-gray-200 dark:border-gray-700 p-4 flex flex-col sm:flex-row items-center gap-6">
                <img src="${item.image}" alt="Imagem de ${item.name}" class="w-24 h-24 sm:w-32 sm:h-32 object-contain flex-shrink-0 bg-white rounded-md" onerror="this.onerror=null;this.src='https://placehold.co/150x150/EFEFEF/333?text=Imagem+N/A';">
                <div class="flex-1 text-center sm:text-left w-full">
                    <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100">${item.name}</h3>
                    <div class="mt-3 flex justify-center sm:justify-start gap-4">
                        <label class="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border ${state.equipmentStatus[item.id] === 'Presente' ? 'bg-green-100 border-green-400 text-green-800 dark:bg-green-900/50 dark:border-green-600 dark:text-green-300' : 'border-gray-300 dark:border-gray-600'}">
                            <input type="radio" name="status-${item.id}" value="Presente" data-id="${item.id}" class="form-radio h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300" ${state.equipmentStatus[item.id] === 'Presente' ? 'checked' : ''}>
                            <span class="${state.equipmentStatus[item.id] === 'Presente' ? 'font-semibold' : ''}">Presente</span>
                        </label>
                        <label class="flex items-center gap-2 cursor-pointer px-4 py-2 rounded-lg border ${state.equipmentStatus[item.id] === 'Ausente' ? 'bg-red-100 border-red-400 text-red-800 dark:bg-red-900/50 dark:border-red-600 dark:text-red-300' : 'border-gray-300 dark:border-gray-600'}">
                            <input type="radio" name="status-${item.id}" value="Ausente" data-id="${item.id}" class="form-radio h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300" ${state.equipmentStatus[item.id] === 'Ausente' ? 'checked' : ''}>
                            <span class="${state.equipmentStatus[item.id] === 'Ausente' ? 'font-semibold' : ''}">Ausente</span>
                        </label>
                    </div>
                </div>
            </div>
        `).join('');
    };

    const renderPhotos = () => {
        photoPreviewContainer.innerHTML = state.photos.map(photo => `
            <div class="relative w-full h-32 group">
                <img src="${photo.dataUrl}" class="w-full h-full object-cover rounded-lg shadow-md" alt="Preview">
                <button data-id="${photo.id}" class="remove-photo-button absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
    };
    
    const renderErrors = (errors) => {
        const errorHTML = errors.length > 0 ? `
            <div class="bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/40 dark:border-red-500 dark:text-red-300 px-4 py-3 rounded-lg relative mb-4 w-full" role="alert">
                <strong class="font-bold">Erro de preenchimento!</strong>
                <ul class="list-disc list-inside mt-2 text-sm">
                    ${errors.map(e => `<li>${e}</li>`).join('')}
                </ul>
            </div>` : '';
        errorContainerMobile.innerHTML = errorHTML;
        errorContainerDesktop.innerHTML = errorHTML;
    };

    const updateTheme = () => {
        if (state.theme === 'dark') {
            document.documentElement.classList.add('dark');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.documentElement.classList.remove('dark');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        localStorage.setItem('theme', state.theme);
        // Recolor signature pad
        const ctx = signatureCanvas.getContext('2d');
        if (ctx) {
            ctx.strokeStyle = state.theme === 'dark' ? "#FFFFFF" : "#000000";
        }
    };
    
    const showLoader = (show) => {
        loader.classList.toggle('hidden', !show);
    };

    // SIGNATURE PAD LOGIC
    let isDrawing = false;
    const ctx = signatureCanvas.getContext('2d');
    
    const resizeCanvas = () => {
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        signatureCanvas.width = signatureCanvas.offsetWidth * ratio;
        signatureCanvas.height = signatureCanvas.offsetHeight * ratio;
        ctx.scale(ratio, ratio);
        updateTheme(); // sets strokeStyle
        ctx.lineWidth = 2;
    };

    const getPosition = (event) => {
        const rect = signatureCanvas.getBoundingClientRect();
        const touch = event.touches ? event.touches[0] : null;
        return {
            x: (touch ? touch.clientX : event.clientX) - rect.left,
            y: (touch ? touch.clientY : event.clientY) - rect.top,
        };
    };

    const startDrawing = (event) => {
        event.preventDefault();
        isDrawing = true;
        const { x, y } = getPosition(event);
        ctx.beginPath();
        ctx.moveTo(x, y);
    };

    const draw = (event) => {
        if (!isDrawing) return;
        event.preventDefault();
        const { x, y } = getPosition(event);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => { isDrawing = false; };
    const clearSignature = () => ctx.clearRect(0, 0, signatureCanvas.width, signatureCanvas.height);
    const isCanvasBlank = () => {
        const blank = document.createElement('canvas');
        blank.width = signatureCanvas.width;
        blank.height = signatureCanvas.height;
        return signatureCanvas.toDataURL() === blank.toDataURL();
    };
    
    // VALIDATION
    const validateForm = () => {
        const errors = [];
        if (!teamMemberSelect.value) errors.push('O campo "Equipe" é obrigatório.');
        if (!assetNumberSelect.value) errors.push('O campo "Patrimônio" é obrigatório.');
        if (isCanvasBlank()) errors.push('A "Assinatura" é obrigatória.');
        if (state.photos.length === 0) errors.push('É obrigatório adicionar pelo menos uma foto geral do kit.');
        const missingStatusItems = EQUIPMENTS.filter(e => !state.equipmentStatus[e.id]).map(e => e.name);
        if (missingStatusItems.length > 0) {
            errors.push(`É obrigatório marcar o status (Presente/Ausente) para: ${missingStatusItems.join(', ')}.`);
        }
        renderErrors(errors);
        return errors.length === 0;
    };
    
    // EVENT HANDLERS
    const handleGenerateReport = async () => {
        if (!validateForm()) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            return;
        }
        showLoader(true);
        try {
            const formData = {
                reportDate: reportDateInput.value,
                teamMember: teamMemberSelect.value,
                assetNumber: assetNumberSelect.value,
            };
            await generatePDFReport(formData, state.equipmentStatus, state.photos, signatureCanvas.toDataURL());
        } catch (error) {
            console.error("Erro ao gerar PDF:", error);
            renderErrors(["Ocorreu um erro inesperado ao gerar o relatório. Tente novamente."]);
        } finally {
            showLoader(false);
        }
    };
    
    // INITIALIZATION
    const init = () => {
        // Populate selects
        teamMemberSelect.innerHTML += TEAMS.map(t => `<option value="${t}">${t}</option>`).join('');
        assetNumberSelect.innerHTML += ASSETS.map(a => `<option value="${a}">${a}</option>`).join('');

        // Set initial date
        reportDateInput.value = new Date().toISOString().split('T')[0];
        
        // Initial Renders
        updateTheme();
        renderEquipmentList();

        // Attach Event Listeners
        themeToggleButton.addEventListener('click', () => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
            updateTheme();
        });

        teamMemberSelect.addEventListener('change', (e) => {
            assetNumberSelect.value = TEAM_ASSET_MAP[e.target.value] || "";
        });

        equipmentListContainer.addEventListener('change', (e) => {
            if (e.target.type === 'radio') {
                state.equipmentStatus[e.target.dataset.id] = e.target.value;
                renderEquipmentList();
            }
        });

        addPhotoButton.addEventListener('click', () => photoUploadInput.click());
        photoUploadInput.addEventListener('change', (e) => {
            for (const file of e.target.files) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    state.photos.push({ id: `${file.name}-${Date.now()}`, dataUrl: event.target.result });
                    renderPhotos();
                };
                reader.readAsDataURL(file);
            }
            e.target.value = ''; // Reset input
        });

        photoPreviewContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.remove-photo-button');
            if (button) {
                state.photos = state.photos.filter(p => p.id !== button.dataset.id);
                renderPhotos();
            }
        });
        
        clearSignatureButton.addEventListener('click', clearSignature);
        generateReportButtonMobile.addEventListener('click', handleGenerateReport);
        generateReportButtonDesktop.addEventListener('click', handleGenerateReport);
        
        // Signature pad events
        window.addEventListener('resize', resizeCanvas);
        signatureCanvas.addEventListener('mousedown', startDrawing);
        signatureCanvas.addEventListener('mousemove', draw);
        signatureCanvas.addEventListener('mouseup', stopDrawing);
        signatureCanvas.addEventListener('mouseleave', stopDrawing);
        signatureCanvas.addEventListener('touchstart', startDrawing, { passive: false });
        signatureCanvas.addEventListener('touchmove', draw, { passive: false });
        signatureCanvas.addEventListener('touchend', stopDrawing);
        
        resizeCanvas();
    };

    init();
});
