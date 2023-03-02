import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearRutaPageRoutingModule } from './crear-ruta-routing.module';

import { CrearRutaPage } from './crear-ruta.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearRutaPageRoutingModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [CrearRutaPage]
})
export class CrearRutaPageModule { }
