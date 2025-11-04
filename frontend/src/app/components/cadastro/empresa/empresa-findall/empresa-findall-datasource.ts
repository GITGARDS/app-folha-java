import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, delay, map } from "rxjs";
import { Empresa, EmpresaPageable, EmpresaPageableInit } from "../../../../models/empresa";
import { Page } from "../../../../models/page";
import { EmpresaService } from "../../../../services/empresa.service";

/**
 * Data source for the EmpresaFindall view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EmpresaFindallDataSource implements DataSource<Empresa> {
  private empresaSubject = new BehaviorSubject<EmpresaPageable>(EmpresaPageableInit);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  getEmpresaSubject() {
    return this.empresaSubject.asObservable();
  }

  setEmpresaSubject(value: EmpresaPageable) {
    this.empresaSubject.next(value);
  }

  getLoadingSubject() {
    return this.loadingSubject.asObservable();
  }

  setLoadingSubject(value: boolean) {
    this.loadingSubject.next(value);
  }

  constructor(private empresaService: EmpresaService) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly Empresa[]> {
    return this.getEmpresaSubject().pipe(
      map((ret: EmpresaPageable) => {
        return ret.content;
      })
    );
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.empresaSubject.complete();
    this.loadingSubject.complete();
  }

  loadEmpresas(filter: string, page: Page) {
    this.setLoadingSubject(true);
    this.empresaService
      .findAllPg(filter, page)
      .pipe(delay(10))
      .subscribe({
        next: (pageable) => {
          this.setEmpresaSubject(pageable);
          this.setLoadingSubject(false);
        },
        error: () => {
          this.setEmpresaSubject(EmpresaPageableInit);
          this.setLoadingSubject(false);
        },
      });
  }
}
