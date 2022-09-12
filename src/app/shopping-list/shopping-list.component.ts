import { Component, OnInit } from '@angular/core';
import { ingredient } from '../shared/ingredient.mode';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: ingredient[] = [new ingredient('apple', 5), new ingredient('banana', 2)]
  constructor() { }

  ngOnInit(): void {
  }

}
