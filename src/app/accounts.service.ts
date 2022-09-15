import { Injectable,EventEmitter } from "@angular/core";
import { LoggingService } from "./logging.service";

@Injectable()
// accounts.service.ts
export class AccountService {

      constructor(private ls: LoggingService) {}

      
    accounts = [
      {
        name: 'Master Account',
        status: 'active'
      },
      {
        name: 'Testaccount',
        status: 'inactive'
      },
      {
        name: 'Hidden Account',
        status: 'unknown'
      }
    ];

      addAc(name, status) {
        this.accounts.push({name, status})
        this.ls.logstatuschange(status)
      }

      updateAc(id, newStatus) {
        this.accounts[id].status = newStatus;
        this.ls.logstatuschange(newStatus)
      }

      statusupdate = new EventEmitter<string>()

}