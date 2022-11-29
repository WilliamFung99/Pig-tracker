import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { PigServiceService } from '../pig-service.service';

@Component({
  selector: 'app-pig-list',
  templateUrl: './pig-list.component.html',
  styleUrls: ['./pig-list.component.css']
})
export class PigListComponent implements OnInit {
  @Output() delete = new EventEmitter()
  pigs:any[] = []

  constructor(private ps: PigServiceService) {
  }

  ngOnInit() {
    this.ps.getData().subscribe((data:any )=>{
      this.pigs.push(data)
      console.log(">", (this.pigs[0]))
    }) 
  }

  onDelete(ind: string){
    this.ps.delete(ind)
    //window.location.reload();
  }

}
