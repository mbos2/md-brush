import { DOCUMENT } from '@angular/common';
import { ElementRef } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, Inject } from '@angular/core';
import { Auth0Service } from 'src/app/services/auth0.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.sass']
})
export class AuthButtonComponent implements AfterViewInit {
  //@ts-ignore
  @ViewChild('loggedIn', { static: false }) private loggedIn: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('loggedOut', { static: false }) private loggedOut: ElementRef<HTMLDivElement> | undefined;
  loader = this.document.querySelector('.loader') as HTMLElement;
  constructor(public auth: Auth0Service, @Inject(DOCUMENT) public document: Document) {
  
  }

  ngAfterViewInit(): void {
    
    // const loader = document.querySelector('.loader') as HTMLElement;
    this.auth.isLoading$.subscribe(loading => {      
      if (loading == true) {
        // this.loader.style.display = 'block';
      } else {        
        // this.loader.style.display = 'none';
      }
    })

    this.auth.user$.subscribe(user => {
      if (user === null || user == null) {
        console.log('User is null')
      }
    })

    let dropdown = document.querySelector('.dropdown')!;
    dropdown.addEventListener('click', function (event) {
      const icon = dropdown.querySelector('.icofont-rounded-down');      
      event.stopPropagation();
      dropdown.classList.toggle('is-active');
      icon?.classList.toggle('green-arrow');
      icon?.classList.toggle('icofont-rotate-270');
    });
  }
}