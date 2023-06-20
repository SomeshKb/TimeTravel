import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-past-player',
  templateUrl: './past-player.component.html',
  styleUrls: ['./past-player.component.scss']
})
export class PastPlayerComponent implements OnInit {

  @ViewChild('slider') matSlider: any;

  fromDate: string = "";
  toDate: string = "";

  max = 89;
  min = 0;
  step = 1;
  isDisabled = true;

  dateError = "";


  action_list = ["KUKA Robot started", "KUKA Robot moved"]

  constructor() { }

  ngOnInit(): void {
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
      this.matSlider.value = this.min;
      this.isDisabled = false;
      this.dateError = "";
    } else {
      this.dateError = "To Date Should be greater the From Date";
    }
  }

  convertToUnixTimestamp(dateString: string) {
    var dateObject = new Date(dateString);
    var unixTimestamp = Math.round(dateObject.getTime() / 1000);
    return unixTimestamp;
  }

}