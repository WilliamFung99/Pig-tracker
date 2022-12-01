import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PigServiceService } from '../pig-service.service';

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})
export class PigComponent implements OnInit {
  id:any
  pigs:any[] = []
  pig:any[] = []
  hashedPassword:string = "84892b91ef3bf9d216bbc6e88d74a77c"
  
  constructor(private ActivatedRoute: ActivatedRoute, private router: Router, private ps: PigServiceService) { }

  ngOnInit(): void {
    this.id = this.ActivatedRoute.snapshot.paramMap.get('PID')
    this.ps.getData().subscribe((data:any )=>{
      this.pigs.push(data)
      for(const element of this.pigs[0]){
        if (element.key == this.id){
          this.pig.push(element.data)
        }
      }
    }) 

  }

  back(){
    this.router.navigate(['/'])
  }

  changeStatus(){
    let password = prompt("You are changing the status of the pig. \n Please enter the password")

    this.ps.getHash(password).subscribe((data:any) =>{
      password = data.Digest
      if(password == this.hashedPassword){
        this.ps.edit(this.id, this.pig)
       
        this.router.navigate(['/'])
        this.router.navigate(['/'])
          .then(() => {window.location.reload()});
        this.router.navigate(['/'])

      }else if(password == null){
        alert("Prompt cancelled")
      }
      else{
        alert("Incorrect password")
      }
    })
  }

  deletePig(){
    let password = prompt("You are deleting a pig from the system. \n Please enter the password")

    this.ps.getHash(password).subscribe((data:any) =>{
      password = data.Digest
      if(password == this.hashedPassword){
        this.ps.delete(this.id)
  
        this.router.navigate(['/'])
        this.router.navigate(['/'])
          .then(() => {window.location.reload()});
        this.router.navigate(['/'])
          
      }else if(password == null){
        alert("Prompt cancelled")
      }
      else{
        alert("Incorrect password")
      }
    })
  }

}
