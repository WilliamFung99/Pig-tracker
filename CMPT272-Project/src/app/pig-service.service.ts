import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PigServiceService implements OnInit {

  private dataURL = 'https://272.selfip.net/apps/gWO8mxoXrn/collections/pigs/documents/'

  private hashURL = 'https://api.hashify.net/hash/md5/hex?value='

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

  edit(edit_person:string, pig:any){
    let body;
    if(pig[0].status == "READY FOR PICKUP"){
      body = 
      {
        "key": edit_person,
        "data": {
            "name": pig[0].name,
            "breed": pig[0].breed,
            "notes": pig[0].notes,
            "phone": pig[0].phone,
            "status": "RETRIEVED",
            "latitude": pig[0].latitude,
            "location": pig[0].location,
            "longitude": pig[0].longitude,
            "timeStamp": pig[0].timeStamp,
            "locationSelector": pig[0].locationSelector
        }
      }
    }else{
      body = 
      {
        "key": edit_person,
        "data": {
          "name": pig[0].name,
          "breed": pig[0].breed,
          "notes": pig[0].notes,
          "phone": pig[0].phone,
          "status": "READY FOR PICKUP",
          "latitude": pig[0].latitude,
          "location": pig[0].location,
          "longitude": pig[0].longitude,
          "timeStamp": pig[0].timeStamp,
          "locationSelector": pig[0].locationSelector
        }
      }
    }
    this.http.put(this.dataURL + edit_person + '/', body).subscribe((data:any)=>{
      console.log(data)
    })
    
  }

  delete(del_person:string){
    this.http.delete(this.dataURL + del_person + '/' ).subscribe((data:any)=>{
      console.log(data)
    }) 
  }

  getHash(password:any): Observable<any>{
    return this.http.get(this.hashURL + password)
  }
}
