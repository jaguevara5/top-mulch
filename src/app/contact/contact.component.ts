import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormService } from '../services/form.service';
import { EmailModel } from './models/email-body-model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  private name = '';
  private messageSent: boolean;

  constructor(
    private formService: FormService) {
      this.messageSent = false;
    }

  ngOnInit() {
    this.messageSent = false;
  }

  sendMessage(f: NgForm) {

    const to = 'j.alanguevara@gmail.com';
    const subject = 'Email sent from your website!';

    const name: string = f.controls['name'].value;
    const email: string = f.controls['email'].value;
    const message: string = f.controls['message'].value;
    let bodyText: string = 'Name: ' + name + '\n' + 'Email: ' + email + '\n' + 'Message: ' + message;
    bodyText += '\n\n\nWebara Technologies';

    const body: EmailModel = {
      to,
      subject,
      text: bodyText
    };

    this.formService.sendEmail(body)
    .subscribe(
      data => {
        this.messageSent = true;
      },
      error => console.log(error)
    );
  }

}
