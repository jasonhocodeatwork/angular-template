import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountService } from '../accounts.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  // providers: [LoggingService]
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private ls: LoggingService, private as: AccountService) {}


  onSetTo(status: string) {
    this.as.updateAc(this.id, status)
    // this.ls.logstatuschange(status)
    this.as.statusupdate.emit(status)
  }
}
