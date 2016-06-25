import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

import $ from "jquery";
import signalr from "services/signalr";

@autoinject
export class Chat {
  heading = 'Chat';
  users = [];

  constructor(private http: HttpClient) {

  }

  getResult() {
    return new Promise(function (resolve, reject) {
      resolve(42);
    });
  }

  attached() {
    let chat = signalr.getHubProxy("chat");
    $("#sendButton").click(async () => {
      let text = $("#messageText").val();
      await chat.invoke("sendMessage", text);
    });
  }

  detached() {
    let chat = signalr.getHubProxy("chat");
    chat.removeListener("onMessageReceived", this.add);  
  }

  add(date, user, message) {
      $("#table tbody").append("<tr><td>" + date + "</td><td>" + user + "</td><td>" + message + "</td></tr>");
  };

  async activate() {
    try {
    let chat = signalr.getHubProxy("chat");
    chat.addListener("onMessageReceived", this.add);
    await signalr.connect();
    } catch (error) {
      let x = error;
      console.log(x);
    }
    let r = await this.getResult();
    console.log(r);
    return r;
  }
}