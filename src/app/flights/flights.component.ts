import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {

  flights = null;
  company = "";
  estimatedDeparture = "";
  departure = "";
  arrival = "";
  today = Date.now();
  apiUrl = "http://localhost:8080";
  departureFrom;
  departureTo;


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getFlights();
  }


  getFlights() {
    let url = this.apiUrl + '/flights';
    this.http.get(url).subscribe(res => this.setFlights(res),
      error => console.log(error)); { };
  }

  setFlights(flights) {
    this.flights = flights;

  }

  filterByDeparture() {
    if(this.departureTo == undefined || this.departureFrom == undefined){
      return;
    }
    let url = this.apiUrl + '/filter/flights';
    let params = new HttpParams().set("departureFrom", this.departureFrom).set("departureTo", this.departureTo);
    this.http.get(url, { params: params }).subscribe(res => this.getFlights(),
      error => console.log(error)); { };
  }

  updateFlight(id, company) {
    let url = this.apiUrl + '/flights';
    this.http.put<any>(url, {
      id: id,
      company: company
    }).subscribe(res => this.getFlights(),
      error => console.log(error)); { };
  }

  deleteFlight(id) {
    let url = this.apiUrl + '/flights/' + id;
    let params = new HttpParams().set("id", id);
    this.http.delete(url, { params: params }).subscribe(res => this.getFlights(),
      error => console.log(error)); { };
  }

  createFlight() {
    let url = this.apiUrl + '/flights';
    this.http.post<any>(url, {
      company: this.company,
      estimatedDeparture: this.estimatedDeparture,
      departure: this.departure,
      arrival: this.arrival
    }).subscribe(res => this.getFlights(),
      error => console.log(error)); { };
  }

}
