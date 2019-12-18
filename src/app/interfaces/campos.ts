export interface Campo {
  nombre: string;
  categoria: string;
  terminal: string;
  obligatorio?: boolean;
  seleccionable?: boolean;
  campos?: string[];
  valor?: string;
  _id?: string;
}