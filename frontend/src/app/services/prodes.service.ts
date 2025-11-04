import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Prodes, ProdesPageable } from "../models/prodes";
import { GenericHttpService } from "./generic/genericHttpService.service";

@Injectable({
  providedIn: 'root',
})
export class ProdesService extends GenericHttpService<Prodes, ProdesPageable> {
  constructor(protected httpClient: HttpClient) {
    super(httpClient, environment.url + '/prodes');
  }
}
