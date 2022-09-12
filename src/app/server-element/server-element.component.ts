import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked,AfterViewInit, AfterViewChecked, OnDestroy {
  @Input('aliasEle') element: {type: string, name: string, content: string};

  @ViewChild('heading') header: ElementRef
  @ContentChild('contentP') contentP: ElementRef
  


  constructor() { 
    console.log('constructor called');
    

  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }
  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked called');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called');
    console.log('ngAfterViewInit '  + this.header)
    console.log('ngAfterViewInit2 '  + this.contentP)
  }


  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked called');
  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
    console.log('ngAfterContentInit '  + this.header)
    console.log('ngAfterContentInit2 '  + this.contentP)
  }
  ngDoCheck(): void {
    console.log('ngDoCheck called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
    console.log('ngOnChanges called');
  }

  

  ngOnInit(): void {
    console.log('init called');
    console.log('init '  + this.header)
    console.log('init2 '  + this.contentP)
  }

  

}
