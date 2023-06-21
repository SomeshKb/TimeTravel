import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-present-player',
  templateUrl: './present-player.component.html',
  styleUrls: ['./present-player.component.scss']
})
export class PresentPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('slider') matSlider: any;

  fromDate: string = "";
  toDate: string = "";
  max = 89;
  value = 0;
  min = 0;
  step = 1;
  isDisabled = true;
  dateError = "";
  eventsSubject: Subject<void> = new Subject<void>();
  action_list = ["KUKA Robot started", "KUKA Robot moved"];
  id : any

  constructor() { }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  ngOnInit(): void {
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  emitEventToChild() {
    this.eventsSubject.next();
    this.isDisabled = false;
    this.startSlider();
  }


  mediaPlayerPosition(unixTimestamp: number) {
    if (!unixTimestamp) {
      return "- -";
    }
    return this.convertFromUnixTimestamp(unixTimestamp)
  }

  convertFromUnixTimestamp(unixTimestamp: number): string {
    const milliseconds = unixTimestamp * 1000;
    const date = new Date(milliseconds);
    const localDate = date.toLocaleString();
    return localDate;
  }

  onDateSelection() {
    this.emitEventToChild();
  }

  convertToUnixTimestamp(dateString: string) {
    var dateObject = new Date(dateString);
    var unixTimestamp = Math.round(dateObject.getTime() / 1000);
    return unixTimestamp;
  }

  startSlider() {
    this.id = setInterval(() => {
      this.value = this.value+1;
    }, 1000);
  }

}