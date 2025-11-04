import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concatMap, from, map, take } from "rxjs";
import { Page } from "../../models/page";

export interface Entity {
  id: number | string;
}

export interface EntityPg {
}

@Injectable({
  providedIn: 'root',
})
export abstract class GenericHttpService<T extends Entity, P extends  EntityPg> {
  
  protected urlBase: string;

  constructor(protected httpCliente: HttpClient, urlBase: string) {
    this.urlBase = urlBase;
  }

  create(data: T) {
    console.log('create', data);
    return this.httpCliente.post<T>(this.urlBase, data).pipe(take(1));
  }

  editById(data: T) {
    return this.httpCliente.put<T>(`${this.urlBase}/${data.id}`, data).pipe(take(1));
  }

  deleteById(id: number) {
    return this.httpCliente.delete<String>(`${this.urlBase}/${id}`).pipe(take(1));
  }

  findById(id: string) {
    return this.httpCliente.get<T>(`${this.urlBase}/${id}`).pipe(take(1));
  }

  findAll() {
    return this.httpCliente.get<T[]>(`${this.urlBase}/findAll`).pipe(
      take(1),
      map((value: T[]) => value),
      map((value: T[]) => {
        return from(value).pipe(
          concatMap((v: T) =>
            this.httpCliente.get<T>(`${this.urlBase}/${v.id.toString()}`).pipe(take(1))
          )
        );
      }),
      concatMap((value) => value)
    );
  }

  findAllPg(filter: string, page: Page) {
    return this.httpCliente
      .get<P>(`${this.urlBase}/findAllPg`, {
        params: new HttpParams()
          .set('filter', filter)
          .set('page', page.page)
          .set('size', page.size)
          .set('sort', page.sort)
          .set('sortDirection', page.sortDirection)
      })
      .pipe(take(1));
  }
}
