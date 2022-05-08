import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

/*
  const GET_NODES = gql`
      query riddleQuery {
        nodeQuery(filter:{conditions:{field: "type", value: "riddle", operator: EQUAL}}){
          entities {
            ... on NodeRiddle {
              nid
              question
              answer
            }
          }
        }
      }
      `;
      data: any;*/
  model: {
    username: string;
    password: string;
  };
  
 

  errorMessage: string = null;
  constructor(private router: Router, private accountService: AccountService, private apollo: Apollo) { }

  ngOnInit() {
    this.model = { username: null, password: null };
  }

  onSubmit() {
   
   /* this.apollo.query({
      query: gql`
      query riddleQuery {
        nodeQuery(filter:{conditions:{field: "type", value: "riddle", operator: EQUAL}}){
          entities {
            ... on NodeRiddle {
              nid
              question
              answer
            }
          }
        }
      }
      `
    }).subscribe(({ data, loading }) => {
      this.data = data;
      console.log(data);
    });
    */
   /* 
    this.apollo.mutate({
      mutation: gql`mutation {
        createVehicle(type: "car", modelCode: "XYZ0192", brandName: "XYZ", launchDate: "2016-08-16") 
        {
          id
        }
      }`
    }).subscribe(data => {
      //successfully created vehicle entity.
    });
    */

    this.errorMessage = null;
    this.accountService.login(this.model.username, this.model.password).subscribe(c => {
      this.router.navigateByUrl('/list');
    }, e => this.errorMessage = e.message);
  }
}
