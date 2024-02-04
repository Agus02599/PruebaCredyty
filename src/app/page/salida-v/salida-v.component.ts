import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BdcyService } from '../../core/service/bdcy.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { Vehiculos } from '../../Vehiculo';
import { format, differenceInMinutes, differenceInHours } from 'date-fns';
import { Router } from '@angular/router';

// import { DialogComponent } from 'tu-ruta-hacia-el-dialogo/dialog.component';

@Component({
  selector: 'app-salida-v',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatCardContent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCard, MatCardTitle,
    MatOption,
    MatSelectModule,
    MatLabel,
    MatMomentDateModule,
    FormsModule,
    MatCheckboxModule,
    // BrowserModule,
    NgxMaterialTimepickerModule,
    // BrowserAnimationsModule
  ],
  templateUrl: './salida-v.component.html',
  styleUrl: './salida-v.component.css'
})
export class SalidaVComponent {
  salidaForm!: FormGroup;
  lisV: any;
  tmVehiculos = new Vehiculos;
  fechaActual: Date = new Date(); // Obtén la fecha actual
  valorPago: number = 0;
  formDesactivado: boolean = true; 

  constructor(private fb: FormBuilder, private service: BdcyService, private dialog: MatDialog, private router: Router) {
    this.salidaForm = this.fb.group({
      ticket: ['', Validators.required],
      horaSalida: ['',],
      descuento: [false, Validators.required],
      codigoFactura: ['', Validators.required],
      valorPagar: [{ value: '', disabled: true }],
    });
  }

  ngOnInit() {

  }

  buscarPlaca(cod: any) {
    this.service.getVehi(cod).subscribe((res) => {
      if (cod == "" || res.length == 0) {
        Swal.fire({
          icon: 'info',
          title: 'No se encontraron resultados para el ticket: ' + cod,
          text: 'Verifique el número de ticket',
        });

        return undefined
      } else {
        this.lisV = res;
        this.procValor();
        console.log(this.lisV);
      }
    })
  }


  procValor() {

  }

  calSalida(sta: any) {
    if (sta) {
      if (this.salidaForm.valid) {
        const fechaActualFormateada = format(this.fechaActual, 'yyyy-MM-dd HH:mm');
        const minutosTranscurridos = differenceInMinutes(fechaActualFormateada, this.lisV[0].hIngreso);
        const horasTranscurridas = differenceInHours(fechaActualFormateada, this.lisV[0].hIngreso);

        if (this.lisV[0].tpVehiculo == 'carro') {
          this.valorPago = minutosTranscurridos * 110 - (minutosTranscurridos * 110 * 0.3);
        } if (this.lisV[0].tpVehiculo == 'moto') {
          this.valorPago = minutosTranscurridos * 50 - (minutosTranscurridos * 50 * 0.3);
        } if (this.lisV[0].tpVehiculo == 'cicla') {
          this.valorPago = minutosTranscurridos * 10 - (minutosTranscurridos * 10 * 0.3);
        }

        this.salidaForm.get('valorPagar')?.setValue(this.valorPago);

        this.setValores(minutosTranscurridos, horasTranscurridas, this.salidaForm.get('codigoFactura')?.value, fechaActualFormateada);

        this.desControles();

      } else {
        Swal.fire({
          title: "Alerta",
          text: `Hay errores el en formulario por favor valide los campos reequeridos`,
          icon: 'warning'
        });
      }
    } else {
      this.salidaForm.get('codigoFactura')?.clearValidators();
      this.salidaForm.get('codigoFactura')?.setValue('');
      this.salidaForm.updateValueAndValidity();

      const fechaActualFormateada = format(this.fechaActual, 'yyyy-MM-dd HH:mm');
      const minutosTranscurridos = differenceInMinutes(fechaActualFormateada, this.lisV[0].hIngreso);
      const horasTranscurridas = differenceInHours(fechaActualFormateada, this.lisV[0].hIngreso);

      if (this.lisV[0].tpVehiculo == 'carro') {
        this.valorPago = minutosTranscurridos * 110;
      } if (this.lisV[0].tpVehiculo == 'moto') {
        this.valorPago = minutosTranscurridos * 50;
      } if (this.lisV[0].tpVehiculo == 'cicla') {
        this.valorPago = minutosTranscurridos * 10;
      }

      this.salidaForm.get('valorPagar')?.setValue(this.valorPago);

      this.setValores(minutosTranscurridos, horasTranscurridas, 0, fechaActualFormateada);

      this.desControles();
    }
  }

  desControles() {
    this.salidaForm.disable();
    this.formDesactivado = false; 
  }

  nueSalida(){
    this.router.navigate([this.router.url]);
  }

  setValores(min: number, hor: number, codFac: number, feSalida: string) {
    this.tmVehiculos.minutos = min;
    this.tmVehiculos.horas = hor;
    this.tmVehiculos.numFactura = codFac;
    this.tmVehiculos.hSalida = feSalida;
    this.tmVehiculos.vPagado = this.valorPago;
    this.service.editarVehiculo(this.lisV[0].id, this.tmVehiculos).subscribe({
      next: (res: any) => {
        Swal.fire({
          title: "Exitoso",
          text: `Se ha registrado exitosamente el vehículo: ${res.placa}. 
          Por favor, recordar el número del ticket para su retiro: ${res.cod}`,
          icon: 'success'
        });
      },
      error: (error: any) => {
        Swal.fire({
          title: "Error",
          text: `Hubo un error en el sistema, por favor intentarlo de nuevo.`,
          icon: 'error'
        });
        console.error('Error al agregar vehículo', error);
      }
    });
  };
}





