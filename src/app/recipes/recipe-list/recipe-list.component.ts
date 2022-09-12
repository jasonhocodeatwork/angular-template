import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.mode';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('r1', 
    'fuckfuckfuckfuckfuckfuckfuckfuckfuckfuckfuckfuckfuckfuck', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLKioLxDBnCPkGzpjl04c7pBNu_5HzypJ5d-hqEWSz&s'),
    new Recipe('r2', 
    'fuck2 fuck2 fuck2 fuck2 fuck2', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLKioLxDBnCPkGzpjl04c7pBNu_5HzypJ5d-hqEWSz&s')
  ]


  constructor() { }

  ngOnInit(): void {
  }

 


}
