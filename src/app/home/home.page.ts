import { Component } from '@angular/core';
import{ Observable} from 'rxjs';
import {TrackService} from '../track.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  items: Array<{ active: number,
    confirmed: number,
    deaths: number,
    province: string
    recovered: number, }>;
  searchTerm: string = '';
  deaths: number;
  confirmed: number;
  active:number;
  trecovered:number
  tdeaths: number;
  tconfirmed: number;
  tcritical:number;
  recovered:number;
  update: Observable<any>;
  


  constructor(private trackservice: TrackService) {}
  ngOnInit(){
    this.trackservice.getCovidData()
    .subscribe(d =>{ 
      console.log(d);
      this.tdeaths = d[0].deaths;
      this.tconfirmed = d[0].confirmed;
      this.tcritical=d[0].critical;
      this.trecovered= d[0].recovered;
      this.update= d[0].lastUpdate
    });
  }
  
  SearchCovidByCountry(){
    console.log({searchTerm: this.searchTerm})
    this.trackservice.searchByCountry(this.searchTerm)
      .subscribe(x => {
        console.log(x);
      
        this.deaths = x[0].provinces[0].deaths || 0;
        this.items = x[0].provinces;
        this.confirmed = x[0].provinces[0].confirmed;
        this.active = x[0].provinces[0].active;
        this.recovered = x[0].provinces[0].recovered;
      });
  }

}
