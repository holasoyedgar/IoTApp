import {
  Injectable
} from '@angular/core';
import {
  environment
} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL = environment.API_URL;
  constructor() {}

  async loginUser(credentials) {
    const response = await fetch(`${this.API_URL}/users/sign-in`, {
      method: 'PUT',
      body: JSON.stringify(credentials),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
    });

    return response;
  }

  async logOut(token) {
    const response = await fetch(`${this.API_URL}/users/log-out`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });

    return response;
  }

  async getUser(accessToken) {
    const response = await fetch(`${this.API_URL}/users`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    });

    return response;
  }
}
