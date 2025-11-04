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
import { Funcionario } from "../../../../models/funcionario";

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrl: './funcionario-form.component.css',
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
export class FuncionarioFormComponent implements OnInit {
  title = 'funcionario';

  private fb = inject(FormBuilder);
  form = this.fb.group({
    id: [0],
    nome: ['ultimo registro', Validators.required],
    cargo: ['999', Validators.required],
    salarioBase: [999, Validators.required],
  });
  readonly dialogRef = inject(MatDialogRef<FuncionarioFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.data.opcao === 'editar') {
      const data: Funcionario = this.data.data;
      this.form.setValue(data);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  okClick() {
    const data: Funcionario = this.form.value as Funcionario;
    this.dialogRef.close(data);
  }
}
