import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user.service';
import { ErrorHandler } from 'src/app/utils/error.handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validationMessages = {
    user: [
      {
        type: 'required',
        message: 'El usuario es requerido'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'La contraseña es requerida'
      }
    ]
  };
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
              private navCtrl: NavController,
              private storage: Storage,
              private userService: UserService,
              private errorHandler: ErrorHandler) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required
      ]))
    });
  }

  ngOnInit() {
  }

  async loginUser(credentials) {
    const response = await this.userService.loginUser(credentials);
    const json = await response.json();
    if (response.status === 200){
      this.errorMessage = '';
      const { token } = json.response;
      this.storage.set('access_token', token);
      this.navCtrl.navigateForward('/menu/feed');
    } else {
      this.errorMessage = this.errorHandler.errorHandler(json.message);
    }
  }
}
