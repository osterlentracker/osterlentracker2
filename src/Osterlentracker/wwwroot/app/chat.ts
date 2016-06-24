import {autoinject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

import $ from 'jquery';
import 'ms-signalr-client';

@autoinject
export class Chat {
  heading = 'Chat';
  users = [];

  constructor(private http: HttpClient) {
    
  }

getResult() {
  return new Promise(function(resolve, reject) {
      resolve(42);
  });
}

  async activate() {

 var signalrAddress = 'http://localhost:8080';
            var hubName = 'chat';
        
            var connection = $.hubConnection("/signalr", { useDefaultPath: false });
            var chat = connection.createHubProxy(hubName);
                        
            $("#sendButton").click(function() {
                var text = $("#messageText").val();
                chat.server.sendMessage(text).done(function (value) {
                    console.log("Message sent.");
                });
            });
            
            chat.on("onMessageReceived", function (date, user, message) {
            	$("#table tbody").append("<tr><td>" + date + "</td><td>" + user + "</td><td>" + message + "</td></tr>");
            });

            connection.start(function () {
                console.info("Connected.");
            });

            connection.disconnected(function() {
                setTimeout(function() {
                    console.info("Reconnecting...");
                    connection.start(function() {
                        console.info("Connected.");
                    });
                }, 5000); // Restart connection after 5 seconds.

                console.info("Reconnecting in 5 sec...");
            });

      let r = await this.getResult();
      console.log(r);
      return r;
  }
}

/*
 var signalrAddress = 'http://localhost:36823';
            var hubName = 'chat';
        
            var connection = $.hubConnection(signalrAddress);
            var chat = connection.createHubProxy(hubName);
                        
            $("#sendButton").click(function() {
                var text = $("#messageText").val();
                chat.server.sendMessage(text).done(function (value) {
                    console.log("Message sent.");
                });
            });
            
            chat.on("onMessageReceived", function (date, user, message) {
            	$("#table tbody").append("<tr><td>" + date + "</td><td>" + user + "</td><td>" + message + "</td></tr>");
            });

            connection.start(function () {
                console.info("Connected.");
            });

            connection.disconnected(function() {
                setTimeout(function() {
                    console.info("Reconnecting...");
                    connection.start(function() {
                        console.info("Connected.");
                    });
                }, 5000); // Restart connection after 5 seconds.

                console.info("Reconnecting in 5 sec...");
            });
            */