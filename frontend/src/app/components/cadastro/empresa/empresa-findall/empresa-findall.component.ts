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
import { Empresa, EmpresaInit, EmpresaPageable } from "../../../../models/empresa";
import { Page } from "../../../../models/page";
import { EmpresaService } from "../../../../services/empresa.service";
import { EmpresaFormComponent } from "../empresa-form/empresa-form.component";
import { EmpresaFindallDataSource } from "./empresa-findall-datasource";

@Component({
  selector: 'app-empresa-findall',
  templateUrl: './empresa-findall.component.html',
  styleUrl: './empresa-findall.component.css',
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
export class EmpresaFindallComponent implements OnInit, AfterViewInit {
  title = 'empresas';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  dataSource!: EmpresaFindallDataSource;

  empresaService = inject(EmpresaService);

  empresaPageable!: EmpresaPageable;

  pageEvent!: PageEvent;

  isLoading = false;

  pageIndex = 0;
  pageSize = 10;

  displayedColumnsDef: DisplayedColumnsDef[] = [
    { label: 'cnpj', header: 'CNPJ' },
    { label: 'razaoSocial', header: 'RAZAO SOCIAL' },
    // { label: 'nomeFantasia', header: 'NOME FANTASIA' },
    // { label: 'endereco', header: 'ENDERECO' },
    // { label: 'telefone', header: 'TELEFONE' },
    // { label: 'email', header: 'EMAIL' },
    { label: 'cnaePrincipal', header: 'CNAE' },
    { label: 'dataAbertura', header: 'ABERTURA' },
    { label: 'regimeTributario', header: 'REGIME TRIB' },
    { label: 'mesReferencia', header: 'MES REF' },
    { label: 'anoReferencia', header: 'ANO REF' },
  ];
  displayedColumns: string[] = [];

  getDisplayedColumns(valor: DisplayedColumnsDef[]) {
    let ret: string[] = ['id'];
    ret = ret.concat(valor.map((x) => x.label));
    ret.push('action');
    return ret;
  }

  ngOnInit(): void {
    this.displayedColumns = this.getDisplayedColumns(this.displayedColumnsDef);

    this.dataSource = new EmpresaFindallDataSource(this.empresaService);
    const page: Page = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'id',
      sortDirection: 'asc',
    };
    this.dataSource.loadEmpresas('', page);

    this.dataSource
      .getEmpresaSubject()
      .pipe(delay(10))
      .subscribe({
        next: (ret) => {
          this.empresaPageable = ret;
          this.paginator.length = this.empresaPageable.totalElements;
          this.paginator.pageIndex = this.empresaPageable.number;
          this.paginator.pageSize = this.empresaPageable.size;
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

  loadEmpresaPage(input: string, page: Page) {
    this.dataSource.loadEmpresas(input, page);
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
    this.openDialog('novo', EmpresaInit);
  }

  onEditById(data: Empresa) {
    this.openDialog('editar', data);
  }

  onPageDefault() {
    const page: Page = {
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: this.sort.active,
      sortDirection: this.sort.direction,
    };
    this.loadEmpresaPage(this.input.nativeElement.value, page);
  }

  onDeleteById(id: number) {
    if (confirm('Deseja realmente excluir registro de id=' + id)) {
      this.empresaService.deleteById(id).subscribe({
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

  openDialog(opcao: string, data: Empresa): void {
    const dialogRef = this.dialog.open(EmpresaFormComponent, {
      data: { opcao: opcao, data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result !== undefined) {
        switch (opcao) {
          case 'novo':
            this.empresaService.create(result).subscribe({
              next: (ret) => {
                this.onPageDefault();
              },
              error: () => {
                alert('Erro ao tentar cadastrar registro! ' + result.id);
              },
            });
            break;
          case 'editar':
            this.empresaService.editById(result).subscribe({
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
