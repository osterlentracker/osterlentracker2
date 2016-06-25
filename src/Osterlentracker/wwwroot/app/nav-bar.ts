import {bindable, Router} from 'aurelia-framework';

import $ from "jquery";
import signalr from "services/signalr";

export class NavBarCustomElement {
  @bindable
  items = [];

  @bindable
  public showCount = false;

  @bindable
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