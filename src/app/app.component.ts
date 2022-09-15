import { Component, OnInit } from '@angular/core';
import { AccountService } from './accounts.service';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AccountService, LoggingService]
})
export class AppComponent implements OnInit {

  accounts: {name: string, status: string} [] = [];

  constructor(private as: AccountService) {}

  ngOnInit(): void {
    this.accounts = this.as.accounts;
  }


}
