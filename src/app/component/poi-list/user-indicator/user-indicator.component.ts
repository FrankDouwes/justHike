import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'user-indicator',
  templateUrl: './user-indicator.component.html',
  styleUrls: ['./user-indicator.component.sass']
})

// user indicator that shows if the user is north/south of currently rendered list items
export class UserIndicatorComponent implements OnInit {

  @HostBinding('class') get classes(): string {return this.userPosition;};
  @Input('userPosition') userPosition: string;
  @Input('status') status: string;

  constructor() { }

  ngOnInit() {}

}
