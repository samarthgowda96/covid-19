import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class TrackService {

  
  private apikey="870169c7f8mshab88f69c718b6dbp12a221jsn3cf7c89ed9e8";
  private covidListUrl="https://covid-19-data.p.rapidapi.com";
  private totalCovidUrl="https://covid-19-data.p.rapidapi.com/report/country";
  private headers={
    'Accept': "application/json",
    'rejectUnauthorized':"false",
    "x-rapidapi-host":"covid-19-data.p.rapidapi.com",
    "x-rapidapi-key":this.apikey,
    'content-Type':'application/json',
    // "useQueryString": "true"
  }
  constructor(private http: HttpClient){}

  getCovidData(){
    return this.http.get(`${this.covidListUrl}/totals?format=json`, { headers: this.headers});

  }

  searchByCountry(searchCriteria: string){
    const d = new Date();
    const url = `${this.totalCovidUrl}/name?date-format=YYYY-MM-DD&format=json&date=${d.getFullYear()}-${d.getMonth()}-${d.getDate()}&name=${searchCriteria}`;
    console.log(url)
    return this.http.get(url,{headers:this.headers })
  }

}