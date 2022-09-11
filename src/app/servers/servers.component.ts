import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '[app-servers]',
  // template: '<app-server></app-server><app-server></app-server>',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = 'No server created'
  servername= ''
  servername2=''
  create= false;

  servers = ['s1','s2']

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }


  onCreateServer() {
    this.serverCreationStatus = 'server created'
    this.create = true;
    this.servers.push(this.servername)
  }
  
  onUpdateServerName(event: any) { 
    console.log(event)
    this.servername = event.target.value;
  }

}
