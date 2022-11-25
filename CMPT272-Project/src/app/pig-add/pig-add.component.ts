import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pig-add',
  templateUrl: './pig-add.component.html',
  styleUrls: ['./pig-add.component.css']
})
export class PigAddComponent implements OnInit {
  toDisplay = false;

  constructor() {

  }

  ngOnInit(): void {
  }

  displayForm(){
    this.toDisplay = true;
  }
}
