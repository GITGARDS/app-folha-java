import { Pageable, PageableInit, Sort, SortInit } from "./page";

export interface Empresa {
  id: number;
  cnpj: string,
  razaoSocial: string;
  nomeFantasia: string;
  endereco: string;
  telefone: string;
  email: string;
  cnaePrincipal: string;
  dataAbertura: string;
  regimeTributario: 'SIMPLES_NACINAL' | 'LUCRO_PRESUMIDO' | 'LUCRO_REAL' | null;
  mesReferencia: number;
  anoReferencia: number;
}

export interface EmpresaPageable {
  content: Empresa[];
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

export const EmpresaInit: Empresa = {
  id: 0,
  cnpj: "",
  razaoSocial: '',
  nomeFantasia: '',
  endereco: '',
  telefone: '',
  email: '',
  cnaePrincipal: '',
  dataAbertura: "",
  regimeTributario: null,
  mesReferencia: 0,
  anoReferencia: 0,
};

export const EmpresaPageableInit: EmpresaPageable = {
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
