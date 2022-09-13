import { Directive, ElementRef, OnInit, Renderer2 , HostListener, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultcolor: string = 'transparent';
  @Input() highlightcolor: string = 'blue';


  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultcolor

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit(): void {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')
  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'blue')
    this.backgroundColor = this.highlightcolor
  }

  @HostListener('mouseleave') mouseleave(eventData: Event) {
    // this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'transparent')
    this.backgroundColor = this.defaultcolor
  }

}
