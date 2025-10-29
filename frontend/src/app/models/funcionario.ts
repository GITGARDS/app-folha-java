import { Pageable, PageableInit, Sort, SortInit } from "./page";

export interface Funcionario {
  id: number;
  nome: string;
  cargo: string;
  salarioBase: number;
}

export interface FuncionarioPageable {
  content: Funcionario[];
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

export const FuncionarioInit: Funcionario = {
  id: 0,
  nome: '',
  cargo: '',
  salarioBase: 0,
};

export const FuncionarioPageableInit: FuncionarioPageable = {
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
