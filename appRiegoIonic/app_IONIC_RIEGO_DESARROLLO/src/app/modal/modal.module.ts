import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';
import { AbiertacerradaPipe } from '../custompipes/abiertacerrada.pipe';
import { ModalPage } from './modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule
  ],
  declarations: [ModalPage, AbiertacerradaPipe]
})
export class ModalPageModule {}
