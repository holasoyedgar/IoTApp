import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceModalPage } from './device-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeviceModalPageRoutingModule {}
