import { Component, OnInit } from '@angular/core';
import { BaseService } from './services/base.service';
import { Bar } from './models/bar';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  progressBars: any = {};
  triggerValue: number = 0;
  selectedBar: number = 0;
  pBarValuePair: Array<Object> = [];

  constructor(private service: BaseService) { }

  // Load the data when App component initialized
  ngOnInit(): void {
    this.loadData();
  }
  // Check values of the Progress bar are less than zero
  checkValues(): void {
    for (let i: number = 0, l: number = this.pBarValuePair.length; i < l; i++) {
      if (this.pBarValuePair[i]['value'] < 0) {
        this.pBarValuePair[i]['value'] = 0;
      }
    }
  }

  btnOnClick(event: Object, percentage: number): void {

    this.triggerValue = (percentage) / 100 * this.progressBars['limit'];
    for (let i: number = 0, l: number = this.pBarValuePair.length; i < l; i++) {
      let barID: number = this.pBarValuePair[i]['barId'];
      if (barID == this.selectedBar) {
        let sum: number = this.pBarValuePair[i]['value'] + this.triggerValue;
        this.pBarValuePair[i]['value'] = sum;
        break;
      }
    }
    this.checkValues();
  }
  // Catch onchange event
  selectedProgressBar(event): void {
    this.selectedBar = event.target.value;

  }

  loadData(): void {

    this.service.get().subscribe(bars => {
      this.progressBars = bars;
      this.pBarValuePair = _.map(bars.bars, function (obj: Object, key: number) {
        return {
          barId: key,
          value: obj
        };
      });
    });
  }
}

