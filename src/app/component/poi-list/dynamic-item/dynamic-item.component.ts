import {Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, Input, ComponentRef, ComponentFactoryResolver} from '@angular/core';
import {PoiListItemComponent} from '../poi-list-item/poi-list-item.component';
import {PoiUserItemComponent} from '../poi-user-item/poi-user-item.component';

@Component({
  selector: 'poi-dynamic-item',
  templateUrl: './dynamic-item.component.html',
  styleUrls: ['./dynamic-item.component.sass']
})
export class DynamicItemComponent implements OnInit, OnDestroy {

  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef;

  @Input() data: any;

  private _componentRef: ComponentRef<{}>;

  // use multiple components as list items in a CDK virtual scroll
  // if type === user, use user-item, else use poi-item

  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {

    const componentType: any = (this.data.type === 'user') ? PoiUserItemComponent : PoiListItemComponent;

    const factory = this._componentFactoryResolver.resolveComponentFactory(componentType);
    this._componentRef = this.container.createComponent(factory);

    // set dynamic component data
    const instance = <any> this._componentRef.instance;
    instance.data = this.data;
  }

  ngOnDestroy(): void {
    if (this._componentRef) {
      this._componentRef.destroy();
      this._componentRef = null;
    }
  }

}
