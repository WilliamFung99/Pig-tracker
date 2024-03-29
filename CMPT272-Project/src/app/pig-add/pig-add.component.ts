import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PigServiceService } from '../pig-service.service';

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})

export class PigAddComponent implements OnInit {
  pigReportDisplay = false;
  customLocation = false;
  failName = false;
  failNumber = false;
  failBreed = false;
  failID = false;
  failLocationSelector = false;

  failRepeatLocationName = false;
  failRepeatLatitudeLongitude = false;
  failRepeatID = false;

  failLatitudeRange = false;
  failLongitudeRange = false;

  isAddNewlocationPresent = false;

  form: FormGroup;
  pigs:any[] = [];
  locations:any = [];
  latitudes:any = [];
  longitudes:any = [];

  duplicateFound:boolean =  false;

  constructor(private ps: PigServiceService) {
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
    window.location.reload()
  }

  displayCustomLocation(event: any){
    if(event.target.value == "AddNewLocation"){
      this.customLocation = true;
    }else{
      this.customLocation = false;
    }
  }

  failure(values:any):boolean{
    let failureAmount = 0;
    //Name missing
    if(values.reporterName == ""){
      this.failName = true;
      failureAmount++;
    }else{
      this.failName = false;
    }
    //Number missing, cannot be negative, must have 10 digits
    if(values.reporterNumber == "" || values.reporterNumber <= 0 || values.reporterNumber.toString().length != 10){
      this.failNumber = true;
      failureAmount++;
    }else{
      this.failNumber = false;
    }
    //Breed missing
    if(values.breed == ""){
      this.failBreed = true;
      failureAmount++;
    }else{
      this.failBreed = false;
    }
    //Missing Id, Id >= 0, must be an integer
    if(values.PID ==  "" || values.PID <= 0 || parseInt(values.PID) != values.PID ){
      this.failID = true;
      failureAmount++;
    }else{
      this.failID = false;
    } 
    //LocationSelector/location cannot be empty  
    //longitude/latitude cannot be empty AND must be a number
    if(values.locationSelect == "" || values.longitude === "" || values.latitude === "" || 
      Number(values.latitude) != values.latitude || Number(values.longitude) != values.longitude){
        this.failLocationSelector = true;
        failureAmount++;
    }else{
      this.failLocationSelector = false;
    }

    //Max values for latitude and longitude
    if(values.latitude > 180 || values.latitude < -180){
      this.failLatitudeRange = true;
      failureAmount++;
    }else{
      this.failLatitudeRange = false;
    }
    if(values.longitude > 180 || values.longitude < -180){
      this.failLongitudeRange = true;
      failureAmount++;
    }else{
      this.failLongitudeRange = false;
    }

    if(this.isAddNewlocationPresent){
      //Repeat LocationName from AddNewLocation
      for (let i = 0; i < this.locations.length; i++){
        if(values.location.toLowerCase() == this.locations[i].toLowerCase()){
          this.failRepeatLocationName = true;
          failureAmount++;
          break;
        }else{
          this.failRepeatLocationName = false;
        }
      }
      //Repeat LongitudeAndLatitude from AddNewLocation
      for (let i = 0 ; i < this.latitudes.length; i++){
        if (values.latitude == this.latitudes[i] && values.longitude == this.longitudes[i]){
          this.failRepeatLatitudeLongitude = true;
          failureAmount++
          break;
        }else{
          this.failRepeatLatitudeLongitude = false;
        }
      }
  }


    //Repeat ID from database
    for (let i = 0 ; i < this.pigs[0].length; i++){
      if(values.PID == this.pigs[0][i].key){
        this.failRepeatID = true;
        failureAmount++
        break
      }else{
        this.failRepeatID = false;
      }
    }
    if(failureAmount >= 1){
      return true
    }

    //No failure
    return false
  }

  onSubmit(values:any){
    //Changing AddNewlocation to the location
    if(values.locationSelect == "AddNewLocation"){
      values.locationSelect = values.location
      this.isAddNewlocationPresent = true
    }else{
      this.isAddNewlocationPresent = false
    }
    //Anything other than AddNewlocation we need to remember the location attributes
    for (let i = 0 ; i < this.locations.length; i++){
      if (values.locationSelect == this.locations[i]){
        values.location = this.locations[i]
        values.latitude = this.latitudes[i]
        values.longitude = this.longitudes[i]
      }
    }

    if(values.extra == ""){
      values.extra = "N/A"
    }
    
    if(this.failure(values)){
      return
    }
    
    this.ps.add(values)
    this.pigReportDisplay = false;
    window.location.reload();
    window.location.reload();
  }
}
