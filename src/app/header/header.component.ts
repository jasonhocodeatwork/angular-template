import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private dataStorageService: DataStorageService, private as: AuthService) {}

  private userSub: Subscription
  isAuthenticated = false;

  ngOnInit(): void {
    this.userSub = this.as.user.subscribe(user => {
      this.isAuthenticated = !!user;
    })
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  logout() {
    this.as.logout()
  }

}
