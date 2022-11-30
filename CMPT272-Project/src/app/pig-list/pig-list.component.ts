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

  sortByLocationAscending(){
    this.pigs[0].sort((a:any,b:any) =>{
      if (a.data.location < b.data.location ) {return -1}
      if (a.data.location > b.data.location ) {return 1}
      return 0
    })
  }
  sortByLocationDescending(){
    this.pigs[0].sort((a:any,b:any) =>{
      if (a.data.location > b.data.location ) {return -1}
      if (a.data.location < b.data.location ) {return 1}
      return 0
    })
  }

  sortByNameAscending(){
    this.pigs[0].sort((a:any,b:any) =>{
      if (a.data.name < b.data.name ) {return -1}
      if (a.data.name > b.data.name ) {return 1}
      return 0
    })
  }

  sortByNameDescending(){
    this.pigs[0].sort((a:any,b:any) =>{
      if (a.data.name > b.data.name ) {return -1}
      if (a.data.name < b.data.name ) {return 1}
      return 0
    })
  }

  sortByTimeAscending(){
    this.pigs[0].sort((a:any,b:any) =>{
      if (a.data.timeStamp < b.data.timeStamp ) {return -1}
      if (a.data.timeStamp > b.data.timeStamp ) {return 1}
      return 0
    })
  }

  sortByTimeDescending(){
    this.pigs[0].sort((a:any,b:any) =>{
      if (a.data.timeStamp > b.data.timeStamp ) {return -1}
      if (a.data.timeStamp < b.data.timeStamp ) {return 1}
      return 0
    })
  }

  sortByStatusAscending(){
    this.pigs[0].sort((a:any,b:any) =>{
      if (a.data.status < b.data.status ) {return -1}
      if (a.data.status > b.data.status ) {return 1}
      return 0
    })
  }

  sortByStatusDescending(){
    this.pigs[0].sort((a:any,b:any) =>{
      if (a.data.status > b.data.status ) {return -1}
      if (a.data.status < b.data.status ) {return 1}
      return 0
    })
  }
}
