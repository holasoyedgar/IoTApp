import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
})
export class HistoryDetailComponent implements OnInit {
  @Input() history: any;
  image = '';
  dateHistory = '';
  constructor() {}

  ngOnInit() {
    const { status, createdAt } = this.history;
    this.image = status === 'on' ? '../../../assets/resources/light_bulb_turned_on.jpg'
                                    : '../../../assets/resources/light_bulb_turned_off.jpg';
    this.dateHistory = moment(createdAt).format('DD/MM/YYYY h:mm:ss a');
  }

}
