
export interface Equipment {
  id: string;
  name: string;
  image: string;
}

export interface FormData {
  reportDate: string;
  teamMember: string;
  assetNumber: string;
}

export type EquipmentStatus = Record<string, 'Presente' | 'Ausente' | undefined>;

export interface Photo {
  id: string;
  dataUrl: string;
}
