import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DeviceComponent } from './device/device.component';
import { HistoryDetailComponent } from './history-detail/history-detail.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        DeviceComponent,
        HistoryDetailComponent
    ],
    imports: [
        IonicModule,
        CommonModule
    ],
    exports: [
        DeviceComponent,
        HistoryDetailComponent
    ]
})
export class ComponentsModule {}
