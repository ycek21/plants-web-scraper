import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    let num = 0;

    let sth = !num;

    let sth2 = !! num;

    console.log("IS IS TRUE", sth);
    console.log("IS IS TRUE", sth2);

  }

}
