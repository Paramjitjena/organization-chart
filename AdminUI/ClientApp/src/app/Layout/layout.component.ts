import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {

  width = '83%'

  constructor() { }

  ngOnInit() {
  }

  changeW(wid) {
    console.log(wid)
    this.width = wid
  }

}
