import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private storage: Storage, private router: Router, private userService: UserService){}
  async canActivate() {
    const accessToken = await this.storage.get('access_token');
    if (!accessToken) {
      this.router.navigateByUrl('/login');
    }
    const response = await this.userService.getUser(accessToken);
    if (response.status === 200) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
