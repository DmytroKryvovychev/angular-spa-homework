import { Component, OnInit } from '@angular/core';

import { DashboardService } from './dashboard.service'
import { Message } from "./message";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  
  public messages: Message[]
  isChangingId: number = -1
  isDeletable: boolean = true

  constructor(private dashboardService: DashboardService) {
    
  }

  ngOnInit() {
    this.dashboardService.get().subscribe(result => {
      this.messages = result;
    }, error => console.error(error))
  }

  addMessage(msg: string){
    if (msg === '') {
      return;
    }

    this.dashboardService.set(msg).subscribe(result => {
      this.messages.push(result);
    }, error => console.error(error));
    
  }

  deleteMessage(id: number){
    this.isDeletable = false;
    this.dashboardService.delete(id).subscribe(result => {this.messages = this.messages.filter(item => item.id !== id )}, error => console.error(error),)
    this.isDeletable = true;
}

  changeMessage(id: number, msg: string){
    if(msg === '') {
      this.isChangingId = -1;
      return;
    };

    this.dashboardService.change(id, msg).subscribe(result => {
      const mes = this.messages.find(item => item.id === +result.id);
      mes.msg = result.msg;
    }, error => console.error(error));
    this.isChangingId = -1;
  }

  setChanging(id: number){
    this.isChangingId = id;
  }

  cancelChanging(){
    this.isChangingId = -1;
  }

  isChanging(id:number){
    return this.isChangingId === id;
  }

}
