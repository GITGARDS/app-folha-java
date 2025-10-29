import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { take } from "rxjs";
import { environment } from "../../environments/environment.development";
import { Funcionario, FuncionarioPageable } from "../models/funcionario";
import { Page } from "../models/page";

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  urlBase = environment.url + '/funcionario';

  readonly httpClient = inject(HttpClient);

  create(data: Funcionario) {
    console.log('create', data);
    return this.httpClient.post<Funcionario>(this.urlBase, data).pipe(take(1));
  }

  editById(data: Funcionario) {
    return this.httpClient.put<Funcionario>(`${this.urlBase}/${data.id}`, data).pipe(take(1));
  }

  deleteById(id: number) {
    return this.httpClient.delete<String>(`${this.urlBase}/${id}`).pipe(take(1));
  }

  findById(id: string) {
    return this.httpClient.get<Funcionario>(`${this.urlBase}/${id}`).pipe(take(1));
  }

  findAll(filter: string, page: Page) {
    return this.httpClient
      .get<FuncionarioPageable>(this.urlBase, {
        params: new HttpParams()
          .set('filter', filter)
          .set('page', page.page)
          .set('size', page.size)
          .set('sort', page.sort),
      })
      .pipe(take(1));
  }
}
