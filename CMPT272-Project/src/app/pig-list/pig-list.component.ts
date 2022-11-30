import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PigServiceService } from '../pig-service.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit {
  @Output() delete = new EventEmitter()
  pigs:any[] = []

  constructor(private ps: PigServiceService, private router: Router) {
  }

  ngOnInit() {
    this.ps.getData().subscribe((data:any )=>{
      this.pigs.push(data)
      
    }) 
  }

  onDelete(ind: string){
    this.router.navigate(["/info", ind])
  }

  moreInfo(ind:string){
    this.router.navigate(["/info", ind])
  }


}
