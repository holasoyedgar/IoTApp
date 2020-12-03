import { Component, OnInit, ViewChild } from '@angular/core';
import { IotService } from 'src/app/services/iot.service';
import { ErrorHandler } from 'src/app/utils/error.handler';
import { Storage } from '@ionic/storage';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  constructor(private iotService: IotService, private storage: Storage, private errorHandler: ErrorHandler) {
    this.getHistory();
   }
  histories = [];
  errorMessage = '';

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  ngOnInit() {
  }

  async getHistory() {
    const accessToken = await this.storage.get('access_token');
    const response = await this.iotService.getHistory(accessToken);
    const json = await response.json();
    if (response.status === 200) {
      this.errorMessage = '';
      const history = json.response.docs;
      this.histories = history;
    } else {
      this.errorMessage = this.errorHandler.errorHandler(json.message);
    }
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.histories.length == 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

  pullToRefresh($event) {
    this.getHistory();
    $event.target.complete();
  }


}
