import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import 'fetch';

@inject(HttpClient)
export class Register {
  heading = 'Register';

  http: HttpClient;

  username = '';
  password = '';
  confirmPassword = '';

 constructor(http){
    http.configure(config => {
      config
        .useStandardConfiguration();
    });

    this.http = http;
  }

  async submit() {
    await this.http.fetch("/Account/Register", {
      method: 'post',
      body: JSON.stringify({
        Email: this.username,
        Password: this.password,
        ConfirmPassword: this.confirmPassword
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}