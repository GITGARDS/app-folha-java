import { Pageable, PageableInit, Sort, SortInit } from "./page";

export interface Prodes {
  id: number;
  codigo: number;
  descricao: string;
  tipo: string;
  automatico: boolean;
  tipoValor: string;
  valor: number;
  incidencia: number;
  ativo: boolean;
}

export interface ProdesPageable {
  content: Prodes[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export const ProdesInit: Prodes = {
  id: 0,
  codigo: 0,
  descricao: '',
  tipo: '',
  automatico: false,
  tipoValor: '',
  valor: 0,
  incidencia: 0,
  ativo: true,
};

export const ProdesPageableInit: ProdesPageable = {
  content: [],
  pageable: PageableInit,
  last: false,
  totalPages: 0,
  totalElements: 0,
  size: 0,
  number: 0,
  sort: SortInit,
  first: false,
  numberOfElements: 0,
  empty: false,
};

export type Incidencia = {
  value: number;
  label: string;
};

export const incidencia: Incidencia[] = [
  { value: 0, label: 'Nenhum' },
  { value: 1, label: 'INSS' },
  { value: 2, label: 'IRRF' },
  { value: 3, label: 'FGTS' },
  { value: 4, label: 'INSS, IRRF' },
  { value: 5, label: 'INSS, FGTS' },
  { value: 6, label: 'IRRF, FGTS' },
  { value: 9, label: 'INSS, IRRF, FGTS' },
];

export const getIncidencia = (valor: number) => {  
    const incidencia = [
      '',
      'INSS',
      'IRRF',
      'FGTS',
      'INSS, IRRF',
      'INSS, FGTS',
      'IRRF, FGTS',
      '',
      '',
      'INSS, IRRF, FGTS',
    ];
    return incidencia[valor];
  }
