import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginator, MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { debounceTime, delay, distinctUntilChanged, fromEvent, merge, tap } from "rxjs";
import { DisplayedColumnsDef } from "../../../../models/displayColumnsDef";
import { Page } from "../../../../models/page";
import { Prodes, ProdesInit, ProdesPageable, getIncidencia } from "../../../../models/prodes";
import { ProdesService } from "../../../../services/prodes.service";
import { ProdesFormComponent } from "../prodes-form/prodes-form.component";
import { ProdesFindallDataSource } from "./prodes-findall-datasource";

@Component({
  selector: 'app-prodes-findall',
  templateUrl: './prodes-findall.component.html',
  styleUrl: './prodes-findall.component.css',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatMenuModule,
    MatProgressBarModule,
    MatCardModule,
  ],
})
export class ProdesFindallComponent implements OnInit, AfterViewInit {
  isExpanded(element: any) {
    return this.expandedElement === element;
  }
  toggle(element: any) {
    this.expandedElement = this.isExpanded(element) ? null : element;
  }

  expandedElement!: Prodes | null;

  title = 'proventos/descontos';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  dataSource!: ProdesFindallDataSource;

  prodesService = inject(ProdesService);

  prodesPageable!: ProdesPageable;

  pageEvent!: PageEvent;

  isLoading = false;

  pageIndex = 0;
  pageSize = 10;

  displayedColumnsDef: DisplayedColumnsDef[] = [
    { label: 'codigo', header: 'CODIGO' },
    { label: 'descricao', header: 'DESCRICAO' },
    // { label: 'tipo', header: 'TIPO' },
    // { label: 'automatico', header: 'AUTO' },
    // { label: 'tipoValor', header: 'T.VALOR' },
    // { label: 'valor', header: 'VALOR' },
    // { label: 'incidencia', header: 'INCIDENCIA' },
    { label: 'ativo', header: 'ATIVO' },
  ];
  displayedColumns: string[] = [];

  getDisplayedColumns(valor: DisplayedColumnsDef[]) {
    let ret: string[] = ['id'];
    ret = ret.concat(valor.map((x) => x.label));
    ret.push('expand');
    ret.push('action');
    return ret;
  }

  readonly onGetIncidencia = getIncidencia;

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns(this.displayedColumnsDef);
    this.dataSource = new ProdesFindallDataSource(this.prodesService);
    const page: Page = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'id',
      sortDirection: 'asc',
    };
    this.dataSource.loadProdess('', page);

    this.dataSource
      .getProdesSubject()
      .pipe(delay(10))
      .subscribe({
        next: (ret) => {
          this.prodesPageable = ret;
          this.paginator.length = this.prodesPageable.totalElements;
          this.paginator.pageIndex = this.prodesPageable.number;
          this.paginator.pageSize = this.prodesPageable.size;
        },
      });
  }

  ngAfterViewInit(): void {
    this.dataSource
      .getLoadingSubject()
      .pipe(delay(10))
      .subscribe({
        next: (ret) => {
          this.isLoading = ret;
        },
      });

    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.onPageDefault();
        })
      )
      .subscribe();

    // reset the paginator after sorting
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    // on sort or paginate events, load a new page
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => {
          this.onPageDefault();
        })
      )
      .subscribe();
  }

  loadProdesPage(input: string, page: Page) {
    this.dataSource.loadProdess(input, page);
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.paginator.length = e.length;
    this.paginator.pageSize = e.pageSize;
    this.paginator.pageIndex = e.pageIndex;
    this.onPageDefault();
  }
  readonly dialog = inject(MatDialog);

  onCreate() {
    this.openDialog('novo', ProdesInit);
  }

  onEditById(data: Prodes) {
    this.openDialog('editar', data);
  }

  onPageDefault() {
    const page: Page = {
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: this.sort.active,
      sortDirection: this.sort.direction,
    };
    this.loadProdesPage(this.input.nativeElement.value, page);
  }

  onDeleteById(id: number) {
    if (confirm('Deseja realmente excluir registro de id=' + id)) {
      this.prodesService.deleteById(id).subscribe({
        next: (ret) => {
          this.paginator.pageIndex = 0;
          this.onPageDefault();
        },
        error: () => {
          alert('Erro ao tentar excluir registro! ' + id);
          this.paginator.pageIndex = 0;
          this.onPageDefault();
        },
      });
    }
  }

  openDialog(opcao: string, data: Prodes): void {
    const dialogRef = this.dialog.open(ProdesFormComponent, {
      data: { opcao: opcao, data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result !== undefined) {
        switch (opcao) {
          case 'novo':
            this.prodesService.create(result).subscribe({
              next: (ret) => {
                this.onPageDefault();
              },
              error: () => {
                alert('Erro ao tentar cadastrar registro! ' + result.id);
              },
            });
            break;
          case 'editar':
            this.prodesService.editById(result).subscribe({
              next: (ret) => {
                this.onPageDefault();
              },
              error: () => {
                alert('Erro ao tentar editar registro! ' + result.id);
              },
            });
            break;

          default:
            break;
        }
      }
    });
  }
}
