import { Injectable } from '@angular/core';
import { env } from 'process';
import {
  environment
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IotService {
  API_URL = environment.API_URL;
  ARDUINO_KEY = environment.ARDUINO_KEY;
  constructor() { }

  async addDevice(body, token) {
    const response = await fetch(`${this.API_URL}/iot/device`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  }

  async updateDevice(body, deviceId, token) {
    const response = await fetch(`${this.API_URL}/iot/device/${deviceId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  }

  async getStatusDevices() {
    const response = await fetch(`${this.API_URL}/iot/get-status`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + this.ARDUINO_KEY,
      },
    });

    return response;
  }

  async getHistory(token) {
    const response = await fetch(`${this.API_URL}/iot/get-history`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  }

  async turnOn(deviceId, accessToken) {
    const response = await fetch(`${this.API_URL}/iot/turn-on/${deviceId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    });

    return response;
  }

  async turnOff(deviceId, accessToken) {
    const response = await fetch(`${this.API_URL}/iot/turn-off/${deviceId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    });

    return response;
  }


}
