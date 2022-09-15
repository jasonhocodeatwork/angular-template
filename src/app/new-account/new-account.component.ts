import { Component, EventEmitter, Output } from '@angular/core';
import { AccountService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService]
})
export class NewAccountComponent {
  @Output() accountAdded = new EventEmitter<{name: string, status: string}>();

  constructor(private ls: LoggingService, private as: AccountService) {
    this.as.statusupdate.subscribe((status:string) => {
      alert('status: '+ status)
    })
  }
  

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountAdded.emit({
      name: accountName,
      status: accountStatus
    });
    // this.ls.logstatuschange(accountStatus);
    this.as.addAc(accountName, accountStatus)
  }
}
