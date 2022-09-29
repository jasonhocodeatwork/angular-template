import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

    // it gives you the reference where you use the directive
    constructor(public viewcontainerref: ViewContainerRef) { }
}