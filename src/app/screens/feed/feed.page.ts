import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DeviceModalPage } from 'src/app/modals/device-modal/device-modal.page';
import { IotService } from 'src/app/services/iot.service';
import { ErrorHandler } from 'src/app/utils/error.handler';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  errorMessage = '';
  devices = [];
  constructor(private iotService: IotService, private errorHandler: ErrorHandler, private modalController: ModalController) {
    this.getState();
  }

  ngOnInit() {
  }

  getState = async () => {
    const response = await this.iotService.getStatusDevices();
    const json = await response.json();
    if (response.status === 200) {
      this.devices = json.response;
    } else {
      this.errorMessage = this.errorHandler.errorHandler(json.message);
    }
  }

  pullToRefresh($event) {
    this.getState();
    $event.target.complete();
  }

  async addDevice() {
    const modal = await this.modalController.create({component: DeviceModalPage, componentProps: {
      new: true,
      deviceId: 0,
      arduinoPin: 0,
      deviceDescription: '',
    }
  });
    modal.onDidDismiss().then(() => {
      this.getState();
    }).catch((err) => {
      console.log(err);
    });
    modal.present().then().catch((err) => {
      console.log(err);
    });
  }

  editDevice = async (device) => {
    const modal = await this.modalController.create({component: DeviceModalPage, componentProps: {
      new: false,
      deviceId: device._id,
      arduinoPin: device.arduinoPin,
      deviceDescription: device.deviceDescription,
    }
  });
    modal.onDidDismiss().then(() => {
      this.getState();
    }).catch((err) => {
      console.log(err);
    });
    modal.present().then().catch((err) => {
      console.log(err);
    });
  }

}
