import { Component } from '@angular/core';
import { SalidaVComponent } from '../salida-v/salida-v.component';
import { CommonModule } from '@angular/common';
import { BdcyService } from '../../core/service/bdcy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro-v',
  standalone: true,
  imports: [SalidaVComponent, CommonModule],
  templateUrl: './registro-v.component.html',
  styleUrl: './registro-v.component.css'
})
export class RegistroVComponent {
  registros: any[]=[];
  suscription!: Subscription;

  constructor(private service: BdcyService) {

  }

  ngOnInit() {
    this.getVehiculos();
    this.suscription = this.service.recargar$.subscribe(()=>{
      this.getVehiculos();
    })
  }

  getVehiculos() {
    this.service.getListVehi().subscribe({
      next: (res) => {
        this.registros = res;
      }
    })
  }

}
