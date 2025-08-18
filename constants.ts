
import type { Equipment } from './types';

export const EQUIPMENTS: Equipment[] = [
    { id: 'rtk', name: 'RTK', image: 'https://adenilsongiovanini.com.br/equipamentos/wp-content/webp-express/webp-images/uploads/2022/02/coletora-de-dados-r550.png.webp' },
    { id: 'coletora', name: 'COLETORA', image: 'https://www.embratop.com.br/wp-content/uploads/2024/04/RTK-Freyja-02.jpg' },
    { id: 'antena', name: 'ANTENA', image: 'http://escolarivers.com.br/wp-content/uploads/2025/08/image-1.png' },
    { id: 'suporte', name: 'SUPORTE COLETORA', image: 'http://escolarivers.com.br/wp-content/uploads/2025/08/Suporte-Coletor-Universal-Portatil-Para-Gps-Rtk-Zz-_-Parcelamento-sem-juros.png' },
    { id: 'niveladora', name: 'NIVELADORA', image: 'http://escolarivers.com.br/wp-content/uploads/2025/08/image-5.png' },
    { id: 'cabo', name: 'CABO USB-C', image: 'http://escolarivers.com.br/wp-content/uploads/2025/08/fb8byuwxmzfq0oj6tgvel8i6jpbwwenoxj5e_640x640fill_ffffff.jpg' }
];

export const TEAM_ASSET_MAP: Record<string, string> = {
    'Equipe 1 - Bruno': '80803',
    'Equipe 2 - Jefferson': '80804',
    'Equipe 3 - Francivaldo': '80805',
    'ESTOQUE': '80806'
};

export const TEAMS = Object.keys(TEAM_ASSET_MAP);
export const ASSETS = Object.values(TEAM_ASSET_MAP);
