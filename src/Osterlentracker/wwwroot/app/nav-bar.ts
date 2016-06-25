import {bindable, bindingMode, Router} from 'aurelia-framework';

import $ from "jquery";
import signalr from "services/signalr";

export class NavBarCustomElement {
  @bindable({ defaultBindingMode: bindingMode.oneWay })
  items = [];

  @bindable({ defaultBindingMode: bindingMode.oneWay })
  public showCount = false;

  @bindable({ defaultBindingMode: bindingMode.oneWay })
  router: Router;

  async attached() {
    try {
      this.chatHub = signalr.getHubProxy("chat");
      this.chatHub.addListener("onMessageReceived", this.add.bind(this));
      await signalr.connect();
    } catch (error) {
      console.error(x);
    }
  }

  add(date, user, message) {
      this.items.push({ 
        title: date, 
        user: user, 
        message: message 
      });
      this.showCount = true;
  };
}