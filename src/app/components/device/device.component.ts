import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import {
  IotService
} from 'src/app/services/iot.service';
import {
  Storage
} from '@ionic/storage';
import {
  ErrorHandler
} from 'src/app/utils/error.handler';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss'],
})
export class DeviceComponent implements OnInit {
  @Input() device: any;
  @Input() getState: any;
  @Input() editDevice: any;
  status = '';
  errorMessage = '';
  image = '';
  constructor(private iotService: IotService, private storage: Storage, private errorHandler: ErrorHandler) {}

  ngOnInit() {
    const {
      status
    } = this.device;
    this.status = status === 'on' ? 'Encendido' : 'Apagado';
    this.image = status === 'on' ? '../../../assets/resources/light_bulb_turned_on.jpg'
                                    : '../../../assets/resources/light_bulb_turned_off.jpg';
  }

  async turnOn(deviceId) {
    const accessToken = await this.storage.get('access_token');
    const response = await this.iotService.turnOn(deviceId, accessToken);
    const json = await response.json();
    if (response.status === 200) {
      this.errorMessage = '';
      this.getState();
    } else {
      this.errorMessage = this.errorHandler.errorHandler(json.message);
    }
  }

  async turnOff(deviceId) {
    const accessToken = await this.storage.get('access_token');
    const response = await this.iotService.turnOff(deviceId, accessToken);
    const json = await response.json();
    if (response.status === 200) {
      this.errorMessage = '';
      this.getState();
    } else {
      this.errorMessage = this.errorHandler.errorHandler(json.message);
    }
  }

  edit(device) {
    this.editDevice(device);
  }
}
