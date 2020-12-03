import {
  Component,
  OnInit
} from '@angular/core';
import {
  ModalController, NavParams
} from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Storage } from '@ionic/storage';
import { IotService } from 'src/app/services/iot.service';
import { ErrorHandler } from 'src/app/utils/error.handler';

@Component({
  selector: 'app-device-modal',
  templateUrl: './device-modal.page.html',
  styleUrls: ['./device-modal.page.scss'],
})
export class DeviceModalPage implements OnInit {
  validationMessages = {
    deviceDescription: [{
      type: 'required',
      message: 'La descripción del dispositivo es requerida'
    }],
    arduinoPin: [{
      type: 'required',
      message: 'El pin de Arduino es requerido'
    }]
  };
  errorMessage = '';
  deviceForm: FormGroup;
  new = false;
  deviceId = '';
  constructor(private modalController: ModalController,
              private formBuilder: FormBuilder,
              private navParams: NavParams,
              private storage: Storage,
              private iotService: IotService,
              private errorHandler: ErrorHandler) {
    this.new = this.navParams.data.new;
    this.deviceId = this.navParams.data.deviceId;
    this.deviceForm = this.formBuilder.group({
      deviceDescription: new FormControl(this.navParams.data.deviceDescription, Validators.compose([
        Validators.required
      ])),
      arduinoPin: new FormControl(this.navParams.data.arduinoPin === 0 ? '' : this.navParams.data.arduinoPin, Validators.compose([
        Validators.required
      ]))
    });

  }

  ngOnInit() {}

  closeModal() {
    this.modalController.dismiss();
  }

  async saveDevice(data) {
    const accessToken = await this.storage.get('access_token');
    if (this.new) {
      const response = await this.iotService.addDevice(data, accessToken);
      if (response.status === 201) {
        this.closeModal();
      } else {
        const json = await response.json();
        this.errorMessage = this.errorHandler.errorHandler(json.message);
      }
    } else {
      const response = await this.iotService.updateDevice(data, this.deviceId, accessToken);
      if (response.status === 200) {
        this.closeModal();
      } else {
        const json = await response.json();
        this.errorMessage = this.errorHandler.errorHandler(json.message);
      }
    }
    console.log(data);

  }
}
