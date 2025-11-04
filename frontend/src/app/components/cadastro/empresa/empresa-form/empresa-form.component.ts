import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { Empresa } from "../../../../models/empresa";

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html',
  styleUrl: './empresa-form.component.css',
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogClose,
    MatDividerModule,
    MatListModule,
    MatDatepickerModule,
  ],
  providers:[provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpresaFormComponent implements OnInit {
  title = 'empresa';
  private fb = inject(FormBuilder);
  form = this.fb.group({
    id: [0],
    cnpj: ['', Validators.required],
    razaoSocial: ['', Validators.required],
    nomeFantasia: [''],
    endereco: [''],
    telefone: [''],
    email: [''],
    cnaePrincipal: [''],
    dataAbertura: [''],
    regimeTributario: [''],
    mesReferencia: [0],
    anoReferencia: [0],
  });

  readonly dialogRef = inject(MatDialogRef<EmpresaFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.data.opcao === 'editar') {
      const data: Empresa = this.data.data;
      this.form.setValue(data);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  okClick() {
    const data: Empresa = this.form.value as Empresa;
    this.dialogRef.close(data);
  }
}
