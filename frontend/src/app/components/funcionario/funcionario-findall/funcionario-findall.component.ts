import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
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
import { Funcionario, FuncionarioInit, FuncionarioPageable } from "../../../models/funcionario";
import { Page } from "../../../models/page";
import { FuncionarioService } from "../../../services/funcionario.service";
import { FurncionarioFormComponent } from "../furncionario-form/furncionario-form.component";
import { FuncionarioFindallDataSource } from "./funcionario-findall-datasource";

@Component({
  selector: 'app-funcionario-findall',
  templateUrl: './funcionario-findall.component.html',
  styleUrl: './funcionario-findall.component.css',
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
  ],
})
export class FuncionarioFindallComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('input') input!: ElementRef;
  dataSource!: FuncionarioFindallDataSource;

  displayedColumns = ['id', 'nome', 'cargo', 'salarioBase', 'acoes'];

  funcionarioService = inject(FuncionarioService);

  funcionarioPageable!: FuncionarioPageable;

  pageEvent!: PageEvent;

  isLoading = false;

  pageIndex = 0;
  pageSize = 10;

  ngOnInit(): void {
    this.dataSource = new FuncionarioFindallDataSource(this.funcionarioService);
    const page: Page = {
      page: this.pageIndex,
      size: this.pageSize,
      sort: 'id',
    };
    this.dataSource.loadFuncionarios('', page);

    this.dataSource
      .getFuncionarioSubject()
      .pipe(delay(10))
      .subscribe({
        next: (ret) => {
          this.funcionarioPageable = ret;
          this.paginator.length = this.funcionarioPageable.totalElements;
          this.paginator.pageIndex = this.funcionarioPageable.number;
          this.paginator.pageSize = this.funcionarioPageable.size;
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

  loadFuncionarioPage(input: string, page: Page) {
    this.dataSource.loadFuncionarios(input, page);
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
    this.openDialog('novo', FuncionarioInit);
  }

  onEditById(data: Funcionario) {
    this.openDialog('editar', data);
  }

  onPageDefault() {
    const page: Page = {
      page: this.paginator.pageIndex,
      size: this.paginator.pageSize,
      sort: this.sort.active,
    };
    this.loadFuncionarioPage(this.input.nativeElement.value, page);
  }

  onDeleteById(id: number) {
    if (confirm('Deseja realmente excluir registro de id=' + id)) {
      this.funcionarioService.deleteById(id).subscribe({
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

  openDialog(opcao: string, data: Funcionario): void {
    const dialogRef = this.dialog.open(FurncionarioFormComponent, {
      data: { opcao: opcao, data: data },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result !== undefined) {
        switch (opcao) {
          case 'novo':
            this.funcionarioService.create(result).subscribe({
              next: (ret) => {
                this.onPageDefault();
              },
              error: () => {
                alert('Erro ao tentar cadastrar registro! ' + result.id);
              },
            });
            break;
          case 'editar':
            this.funcionarioService.editById(result).subscribe({
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
