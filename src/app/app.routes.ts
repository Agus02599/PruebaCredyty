import { Routes } from '@angular/router';
import { IngresoVComponent } from './page/ingreso-v/ingreso-v.component';
import { SalidaVComponent } from './page/salida-v/salida-v.component';
import { RegistroVComponent } from './page/registro-v/registro-v.component';

export const routes: Routes = [
    { path: 'ingreso', component: IngresoVComponent },
    { path: 'salida', component: SalidaVComponent },
    { path: 'registros', component: RegistroVComponent },
];
