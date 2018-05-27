import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EmailModel } from '../contact/models/email-body-model';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class FormService {

  // private hostName = 'http://ec2-18-188-63-49.us-east-2.compute.amazonaws.com';
  private endpoint = 'http://localhost:8080/send';

  constructor(
    private http: HttpClient
  ) { }

  sendEmail(body: EmailModel) {

    const emailParams = new HttpParams()
      .set('to' , body.to)
      .set('subject', body.subject)
      .set('text', body.text);

    return this.http.get(this.endpoint, { params: emailParams })
      .map(res => res)
      .catch((error: any) =>
      Observable.throw(error || ' Server Error '));
  }
}
