import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, delay, map } from "rxjs";
import { Page } from "../../../../models/page";
import { Prodes, ProdesPageable, ProdesPageableInit } from "../../../../models/prodes";
import { ProdesService } from "../../../../services/prodes.service";

/**
 * Data source for the ProdesFindall view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProdesFindallDataSource implements DataSource<Prodes> {
  private prodesSubject = new BehaviorSubject<ProdesPageable>(ProdesPageableInit);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  getProdesSubject() {
    return this.prodesSubject.asObservable();
  }

  setProdesSubject(value: ProdesPageable) {
    this.prodesSubject.next(value);
  }

  getLoadingSubject() {
    return this.loadingSubject.asObservable();
  }

  setLoadingSubject(value: boolean) {
    this.loadingSubject.next(value);
  }

  constructor(private prodesService: ProdesService) {}

  connect(collectionViewer: CollectionViewer): Observable<readonly Prodes[]> {
    return this.getProdesSubject().pipe(
      map((ret: ProdesPageable) => {
        return ret.content;
      })
    );
  }
  disconnect(collectionViewer: CollectionViewer): void {
    this.prodesSubject.complete();
    this.loadingSubject.complete();
  }

  loadProdess(filter: string, page: Page) {
    this.setLoadingSubject(true);
    this.prodesService
      .findAllPg(filter, page)
      .pipe(delay(10))
      .subscribe({
        next: (pageable) => {
          this.setProdesSubject(pageable);
          this.setLoadingSubject(false);
        },
        error: () => {
          this.setProdesSubject(ProdesPageableInit);
          this.setLoadingSubject(false);
        },
      });
  }
}
