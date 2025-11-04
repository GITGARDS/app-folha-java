export interface Page {
  page: number;
  size: number;
  sort: string;
  sortDirection: string;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export const SortInit = {
  empty: false,
  sorted: false,
  unsorted: false,
};

export const PageableInit: Pageable = {
  pageNumber: 0,
  pageSize: 0,
  sort: SortInit,
  offset: 0,
  paged: false,
  unpaged: false,
};
