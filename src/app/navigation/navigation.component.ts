import { Component } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import * as moment from 'moment';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
  .observe(['(max-width: 991px)'])
  .pipe(
    map((result) => result.matches),
    shareReplay()
  );

  currentDate = moment().format("ddd, Do MMM  YYYY")

  constructor(private breakpointObserver:BreakpointObserver){

  }
}
