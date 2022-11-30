import { Component, AfterViewInit} from '@angular/core';

import * as L from 'leaflet';

// need to add to make leaflet icons work
import { icon, Marker } from 'leaflet';
import { PigServiceService } from './pig-service.service';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon-2x.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
}); 
Marker.prototype.options.icon = iconDefault;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  private map:any;
  pigs:any[] = []
  locations:string[] = []
  flexibleCounter:number = 0;

  constructor(private ps: PigServiceService) { 
  }

  ngOnInit() {
    this.ps.getData().subscribe((data:any )=>{
      this.pigs.push(data)
      console.log(data)

      for (const element of this.pigs[0]){
        this.flexibleCounter = 0
        
        //Count by location
        for (const elementNext of this.pigs[0]){
          if(element.data.locationSelector == elementNext.data.locationSelector){
            this.flexibleCounter++
          }
        }
        L.marker([element.data.latitude, element.data.longitude]).addTo(this.map)
        .bindPopup(element.data.locationSelector + "<br>" + this.flexibleCounter + " cases reported.").openPopup;
        
      }
     
    
    })


    
  }

  ngAfterViewInit(): void { 
    this.map = L.map('mapid').setView([49.2, -123], 11);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoid2lsbGlhbWZ1bmcxOTk5IiwiYSI6ImNsYXZvMndxaTA2NGozb3FubWxpbGV5cjYifQ.Wz6akch9mYN2_sSr48YnXQ', {
      maxZoom: 18,
      minZoom: 2,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      bounds: [
        [-90, -180],
        [90, 180]
      ],
      noWrap: true
      
    }).addTo(this.map);

    

  }



}
