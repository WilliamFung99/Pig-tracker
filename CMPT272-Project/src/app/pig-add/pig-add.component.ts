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
  form: FormGroup

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
    this.ps.add(values)
    this.pigReportDisplay = false;
    this.router.navigate(["/"])
  }
}
