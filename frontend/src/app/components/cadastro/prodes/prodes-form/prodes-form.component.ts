import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { Prodes, incidencia } from "../../../../models/prodes";

@Component({
  selector: 'app-prodes-form',
  templateUrl: './prodes-form.component.html',
  styleUrl: './prodes-form.component.css',
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
  ],
})
export class ProdesFormComponent implements OnInit {
  title = 'provento/desconto';

  private fb = inject(FormBuilder);
  form = this.fb.group({
    id: [0],
    codigo: [0, Validators.required],
    descricao: ['', Validators.required],
    tipo: ['P', Validators.required],
    automatico: [false, Validators.required],
    tipoValor: [''],
    valor: [0],
    incidencia: [0],
    ativo: [true, Validators.required],
  });

  readonly onIncidencia = incidencia;

  readonly dialogRef = inject(MatDialogRef<ProdesFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.data.opcao === 'editar') {
      const data: Prodes = this.data.data;
      this.form.setValue(data);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  okClick() {
    const data: Prodes = this.form.value as Prodes;
    this.dialogRef.close(data);
  }
}
