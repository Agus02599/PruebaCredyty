import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CommonModule } from '@angular/common';
import { Vehiculos } from '../../Vehiculo';
import { BdcyService } from '../../core/service/bdcy.service';
import Swal from 'sweetalert2';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatDatetimepickerModule, MatNativeDatetimeModule } from '@mat-datetimepicker/core';

@Component({
  selector: 'app-ingreso-v',
  standalone: true,
  imports: [MatFormFieldModule,
    MatCard, MatCardTitle,
    MatCardContent,
    MatInputModule,
    MatOption,
    MatSelectModule,
    MatLabel,
    MatMomentDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule
  ],
  templateUrl: './ingreso-v.component.html',
  styleUrl: './ingreso-v.component.css'
})
export class IngresoVComponent {

  ingresoForm!: FormGroup;
  tmVehiculos = new Vehiculos;

  constructor(private fb: FormBuilder, private service: BdcyService) { }

  ngOnInit() {
    this.ingresoForm = this.fb.group({
      tipoVehiculo: ['', Validators.required],
      placa: ['', [Validators.required, Validators.maxLength(6), Validators.pattern(/^[a-zA-Z0-9]*$/)]],
      horaIngreso: ['', Validators.required],
    });
  }

  submitForm() {
    if (this.ingresoForm.valid) {
      this.setControls()
      console.log('Formulario válido', this.ingresoForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }

  setControls() {
    const numeroAleatorio = Math.floor(100 + Math.random() * 900)
    this.tmVehiculos.cod = this.ingresoForm.get('placa')?.value.toUpperCase() + numeroAleatorio + this.ingresoForm.get('placa')?.value.slice(-1).toUpperCase();
    this.tmVehiculos.placa = this.ingresoForm.get('placa')?.value.toUpperCase();
    this.tmVehiculos.tpVehiculo = this.ingresoForm.get('tipoVehiculo')?.value;
    this.tmVehiculos.hIngreso = this.ingresoForm.get('horaIngreso')?.value;

    this.service.setVehiculo(this.tmVehiculos).subscribe({
      next: (res) => {
        Swal.fire({
          title: "Exitoso",
          text: `Se ha registrado exitosamente el vehículo: ${res.placa}. 
          Por favor, recordar el número del ticket para su retiro: ${res.cod}`,
          icon: 'success'
        });
        this.clearDatos();
      },
      error: (error) => {
        Swal.fire({
          title: "Error",
          text: `Hubo un error en el sistema, por favor intentarlo de nuevo.`,
          icon: 'error'
        });
        console.error('Error al agregar vehículo', error);
      }
    });


  }

  clearDatos(){
    this.ngOnInit();
  }

  convertirMayusculas(event: any) {
    const inputValue = event.target.value;
    event.target.value = inputValue.toUpperCase();
  }
}
