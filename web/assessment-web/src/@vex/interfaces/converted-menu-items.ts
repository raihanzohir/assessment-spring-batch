export interface ConvertedMenuItem {
    id: string;
    type: string;
    label: string;
    serial: number;
    route?: string;
    children?: ConvertedMenuItem[];
  }