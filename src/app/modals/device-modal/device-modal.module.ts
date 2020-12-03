import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeviceModalPageRoutingModule } from './device-modal-routing.module';

import { DeviceModalPage } from './device-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeviceModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DeviceModalPage]
})
export class DeviceModalPageModule {}
