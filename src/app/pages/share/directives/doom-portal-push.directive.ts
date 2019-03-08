import { Directive, Injector, ApplicationRef,  ComponentFactoryResolver, Input } from '@angular/core';
import { CdkPortal, DomPortalHost } from '@angular/cdk/portal';

@Directive({
  selector: '[doomPortalPush]',
})
export class DoomPortalPushDirective {

  @Input('doomPortalPush') elementId;

  portalHost;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private cdkPortal:CdkPortal,
  ) {
  }

  ngOnInit(): void {
    this.portalHost = new DomPortalHost(
      document.querySelector('#'+this.elementId),
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

    // Attach portal to host
    //this.portalHost.attach(templatePortal);
    let viewRef = this.portalHost.attach(this.cdkPortal);
    console.log(viewRef.rootNodes[0]);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DoomPortalPushDirective],
  imports: [ CommonModule ],
  exports: [DoomPortalPushDirective],
  providers: [],
})
export class DoomPortalPushModule {}