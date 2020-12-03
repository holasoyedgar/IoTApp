import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavController
} from '@ionic/angular';
import {
  Storage
} from '@ionic/storage';
import {
  UserService
} from 'src/app/services/user.service';
import {
  ErrorHandler
} from 'src/app/utils/error.handler';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menuItems = [{
      name: 'Control',
      idItem: 1,
      icon: 'home'
    },
    {
      name: 'Historial',
      idItem: 10,
      icon: 'time'
    }
  ];

  username = '';
  errorMessage = '';
  constructor(private storage: Storage, private userService: UserService, private navCtrl: NavController,
              private errorHandler: ErrorHandler) {}

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    const accessToken = await this.storage.get('access_token');
    const response = await this.userService.getUser(accessToken);
    const json = await response.json();
    if (response.status === 200) {
      const {
        username
      } = json.response;
      this.username = username;
    }
  }

  clickMenu(item, $event) {
    switch (item.idItem) {
      case 1:
        this.navCtrl.navigateForward('/menu/feed');
        break;
      case 10:
        this.navCtrl.navigateForward('/menu/history');
        break;
      default:
        $event.stopPropagation();
    }
  }

  async logout() {
    const accessToken = await this.storage.get('access_token');
    const response = await this.userService.logOut(accessToken);
    if (response.status === 200) {
      this.errorMessage = '';
      this.storage.remove('access_token');
      this.navCtrl.navigateBack('/login');
    } else {
      const json = await response.json();
      this.errorMessage = this.errorHandler.errorHandler(json.message);
    }
  }
}
