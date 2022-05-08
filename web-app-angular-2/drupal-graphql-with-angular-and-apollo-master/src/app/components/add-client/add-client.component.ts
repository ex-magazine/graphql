import { Component, OnInit } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const submitClient = gql`
mutation submitClient($title: String!, $email: String!) {
  addClient(input:{title:$title, email:$email}){
    entity{
      ...on NodeClient {
        nid,
        title,
        email
      }
    }
  }
}
`;

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  constructor(private apollo: Apollo) { }

  newClient() {
    this.apollo.mutate({
      mutation: submitClient,
      variables: {
        title: 'New Client',
        email: 'newClient@gmail.com',
      }
    }).subscribe(r => console.log(r), e => console.log(e), () => console.log('done'))
  }

  ngOnInit() {
  }

}
