import {
  Component,
  OnInit,
  Input,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit, OnChanges {


  @Input() limit: number = 0;
  @Input() barCount: number = 0;
  progress: number = 0;
  minProgress: number = 0;
  maxProgress: number = 100;


  constructor() { }

  ngOnInit(): void {
    this.progress = this.setProgress();
  }

  setProgress(): number {
    let progress: number = 0;
    progress = Math.round((this.barCount / this.limit) * 100);
    console.log(this.progress);
    return progress;
  }
  ngOnChanges(): void {
    this.progress = this.setProgress();
  }

}
