import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, delay, map } from "rxjs";
import { Funcionario, FuncionarioPageable, FuncionarioPageableInit } from "../../../models/funcionario";
import { Page } from "../../../models/page";
import { FuncionarioService } from "../../../services/funcionario.service";

/**
 * Data source for the FuncionarioFindall view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FuncionarioFindallDataSource implements DataSource<Funcionario> {
  private funcionarioSubject = new BehaviorSubject<FuncionarioPageable>(FuncionarioPageableInit);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  getFuncionarioSubject() {
    return this.funcionarioSubject.asObservable();
  }

  setFuncionarioSubject(value: FuncionarioPageable) {
    this.funcionarioSubject.next(value);
  }

  getLoadingSubject() {
    return this.loadingSubject.asObservable();
  }

  setLoadingSubject(value: boolean) {
    this.loadingSubject.next(value);
  }

  constructor(private fucionarioService: FuncionarioService) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly Funcionario[]> {
    return this.getFuncionarioSubject().pipe(
      map((ret: FuncionarioPageable) => {
        return ret.content;
      })
    );
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.funcionarioSubject.complete();
    this.loadingSubject.complete();
  }

  loadFuncionarios(filter: string, page: Page) {
    this.setLoadingSubject(true);
    this.fucionarioService
      .findAll(filter, page)
      .pipe(delay(10))
      .subscribe({
        next: (pageable) => {
          this.setFuncionarioSubject(pageable);
          this.setLoadingSubject(false);
        },
        error: () => {
          this.setFuncionarioSubject(FuncionarioPageableInit);
          this.setLoadingSubject(false);
        },
      });
  }
}
