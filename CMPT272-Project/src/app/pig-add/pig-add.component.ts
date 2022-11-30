import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PigServiceService } from '../pig-service.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})

export class PigAddComponent implements OnInit {
  pigReportDisplay = false;
  customLocation = false;
  form: FormGroup;
  pigs:any[] = [];
  locations:any = [];
  latitudes:any = [];
  longitudes:any = [];

  duplicateFound:boolean =  false;

  constructor(private ps: PigServiceService, private router: Router) {
    let formControls = {
      reporterName: new FormControl(''),
      reporterNumber: new FormControl(''),
      breed: new FormControl(''),
      PID: new FormControl(''),
      locationSelect: new FormControl(''),
      location: new FormControl(''),
      longitude: new FormControl(''),
      latitude: new FormControl(''),
      extra: new FormControl('')
    }

    this.form = new FormGroup(formControls)
  }

  ngOnInit(): void {
    this.ps.getData().subscribe((data:any )=>{
      this.pigs.push(data)
      for (const element of data){
        this.duplicateFound = false;
        for (let i = 0 ; i < this.locations.length; i++){
          if(element.data.locationSelector == this.locations[i]){
            this.duplicateFound = true;
          }
        }
        if(this.duplicateFound == false){
          this.locations.push(element.data.locationSelector)
          this.longitudes.push(element.data.longitude)
          this.latitudes.push(element.data.latitude)
        }
      }
    }) 
  }

  displayForm(){
    this.pigReportDisplay = true;
  }

  closeForm(){
    this.pigReportDisplay = false;
  }

  displayCustomLocation(event: any){
    console.log(event.target.value)
    if(event.target.value == "AddNewLocation"){
      this.customLocation = true;
    }else{
      this.customLocation = false;
    }
  }

  onSubmit(values:any){
    console.log("values", values)
    if(values.locationSelect == "AddNewLocation"){
      values.locationSelect = values.location
    }
  
    for (let i = 0 ; i < this.locations.length; i++){
      if (values.locationSelect == this.locations[i]){
        values.location = this.locations[i]
        values.latitude = this.latitudes[i]
        values.longitude = this.longitudes[i]
      }
    }
    this.ps.add(values)
    this.ngOnInit()
    this.pigReportDisplay = false;
    window.location.reload();
    window.location.reload();
  }
}
