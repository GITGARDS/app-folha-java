import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Empresa, EmpresaPageable } from "../models/empresa";
import { GenericHttpService } from "./generic/genericHttpService.service";

@Injectable({
  providedIn: 'root',
})
export class EmpresaService extends GenericHttpService<Empresa, EmpresaPageable> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.url + '/empresa');
  }
}
