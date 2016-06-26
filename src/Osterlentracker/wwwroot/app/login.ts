import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Login {
  heading = 'Login';

  http: HttpClient;

  username = '';
  password = '';
  rememberMe = false

  constructor(http) {
    http.configure(config => {
      config
        .useStandardConfiguration()
    });

    this.http = http;
  }

  async submit() {
    await this.http.fetch("/Account/Login", {
      method: 'post',
      body: JSON.stringify({
        Email: this.username,
        Password: this.password,
        RememberMe: this.rememberMe
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}