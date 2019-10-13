import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  flights = null;
  ApiUrl = "http://localhost:8080";

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getFlights();
  }


  getFlights() {
    let url = this.ApiUrl + '/flights';
    this.http.get(url).subscribe(res => this.setFlights(res),
      error => console.log(error)); { };
  }

  setFlights(flights) {
    this.flights = flights;
  }

}
