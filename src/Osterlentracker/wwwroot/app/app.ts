import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css!';

import {Router, RouterConfiguration} from 'aurelia-router'

import signalr from "services/signalr";

export class App {
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'welcome'], name: 'welcome',      moduleId: 'welcome',      nav: true, title: 'Welcome' },
      { route: 'chat',         name: 'chat',        moduleId: 'chat',        nav: true, title: 'Chat' },
      { route: 'login',         name: 'login',        moduleId: 'login',        nav: true, title: 'Login' },
      { route: 'register',         name: 'register',        moduleId: 'register',        nav: true, title: 'Register' }
    ]);

    this.router = router;
  }
}
