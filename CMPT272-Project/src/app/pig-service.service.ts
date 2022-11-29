import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PigServiceService implements OnInit {

  private dataURL = 'https://272.selfip.net/apps/gWO8mxoXrn/collections/pigs/documents/'

  constructor(private http: HttpClient) {
  }

  getData(): Observable<any>{
    return this.http.get(this.dataURL)
  }

  ngOnInit(): void {
  }

  add(pig:any){
    pig.added_on = (new Date()).getTime()
    
    this.http.post(this.dataURL,
    {
    "key": pig.PID, 
    "data": 
      {"name": pig.reporterName,
       "timeStamp" :pig.added_on,
       "phone": pig.reporterNumber,
       "status": "READY FOR PICKUP",
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

  delete(del_person:string){
    this.http.delete(this.dataURL + del_person + '/' ).subscribe({}) 
  }
}
