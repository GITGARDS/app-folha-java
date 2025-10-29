import { CommonModule } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: 'app-furncionario-form',
  templateUrl: './furncionario-form.component.html',
  styleUrl: './furncionario-form.component.css',
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class FurncionarioFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  form = this.fb.group({
    id: [0],
    nome: ['ultimo registro', Validators.required],
    cargo: ['999', Validators.required],
    salarioBase: [999, Validators.required],
  });
  readonly dialogRef = inject(MatDialogRef<FurncionarioFormComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    if (this.data.opcao === 'editar') {
      const editarData = {
        id: this.data.data.id,
        nome: 'registro ' + this.data.data.id,
        cargo: 'cargo' + this.data.data.id,
        salarioBase: this.data.data.id,
      };

      this.form.setValue(editarData);
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
