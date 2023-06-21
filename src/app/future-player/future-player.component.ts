import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-future-player',
  templateUrl: './future-player.component.html',
  styleUrls: ['./future-player.component.scss']
})
export class FuturePlayerComponent implements OnInit, OnDestroy {

  @ViewChild('slider') matSlider: any;

  fromDate: string = "";
  toDate: string = "";
  max = 89;
  min = 0;
  step = 1;
  value = 0;
  isDisabled = false;
  id: any

  dateError = "";


  action_list = ["Kuka Robot Started", "KUKA Robot moved"]
  eventsSubject: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }


  mediaPlayerPosition(unixTimestamp: number) {
    if (!unixTimestamp) {
      return "- -";
    }
    return this.convertFromUnixTimestamp(unixTimestamp)
  }
  
  emitEventToChild() {
    this.eventsSubject.next();
    this.startSlider();
  }

  convertFromUnixTimestamp(unixTimestamp: number): string {
    const milliseconds = unixTimestamp * 1000;
    const date = new Date(milliseconds);
    const localDate = date.toLocaleString();
    return localDate;
  }

  onDateSelection() {

    const min = this.convertToUnixTimestamp(this.fromDate);
    const max = this.convertToUnixTimestamp(this.toDate);

    if (!min || !min) {
      this.dateError = "Please select the Date";
      return;
    }

    if (max > min) {
      console.log(this.convertFromUnixTimestamp(min))
      console.log(this.convertFromUnixTimestamp(max))
      this.min = min;
      this.max = max;
      this.value = min;
      this.matSlider.value = this.min;
      this.isDisabled = false;
      this.dateError = "";
      this.emitEventToChild();
    } else {
      this.dateError = "To Date Should be greater the From Date";
      return;
    }
  }

  startSlider() {
    this.id = setInterval(() => {
      this.value = this.value + 5;
    }, 1000);
  }

  convertToUnixTimestamp(dateString: string) {
    var dateObject = new Date(dateString);
    var unixTimestamp = Math.round(dateObject.getTime() / 1000);
    return unixTimestamp;
  }

}