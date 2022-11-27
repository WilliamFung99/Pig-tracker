import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class PigServiceService implements OnInit {
  
  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
  }

  add(pig:any){
    pig.added_on = (new Date()).getTime()
    
    console.log("pigs", pig)
    
    this.http.post('https://272.selfip.net/apps/gWO8mxoXrn/collections/pigs/documents/',
    {
    "key": pig.PID, 
    "data": 
      {"name": pig.reporterName,
       "phone": pig.reporterNumber,
       "breed": pig.breed,
       "locationSelector": pig.locationSelect,
       "location": pig.location,
       "longitude": pig.longitude,
       "latitude": pig.latitude,
       "notes": pig.extra}
       
    }).subscribe((data:any)=>{
      console.log(data)
    })

  }


}
