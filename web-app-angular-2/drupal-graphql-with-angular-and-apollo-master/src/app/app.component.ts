import { Client } from './models/Client';
import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc';
import { authConfig } from './auth.config';

import { Observable } from 'rxjs/observable';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  authenticated = false;
  clients: Observable<Client[]>;

  query = gql`{
  nodeQuery(limit: 5, offset: 0, filter: {type: "Client"}) {
    entities {
      entityId,
      entityLabel,
      entityUrl {
        path
      },
      entityPublished
      ... on NodeClient {
        telephone,
        email
      }
    }
  }
}`;

  removeClient = gql`
  mutation submitClient($identifier: Int!) {
  deleteClient(id:$identifier){
    entity{
      ...on NodeClient {
        nid
      }
    }
  }
}
`;

  constructor(private oauthService: OAuthService, public apollo: Apollo) {
    this.configureWithNewConfigApi();
  }

  runQuery() {
    // Sample query
    this.clients = this.apollo.query({ query: this.query }).map(q => {
      return q.data['nodeQuery']['entities'];
    });
  }

  deleteClient(id: number) {
    this.apollo.mutate({
      mutation: this.removeClient,
      variables: {
        identifier: parseInt(id.toString()),
      }
    }).subscribe(r => console.log(r), e => console.log(e), () => console.log('done'))
  }

  private configureWithNewConfigApi() {
    this.oauthService.configure(authConfig);
    this.oauthService.setStorage(sessionStorage);
    this.oauthService.tryLogin().then(_ => {
      // save the token in localstorage
      localStorage.setItem('token', this.oauthService.getAccessToken());
      this.authenticated = this.oauthService.hasValidAccessToken();
    });
  }

  public login() {
    this.oauthService.initImplicitFlow();
  }

  public logoff() {
    this.oauthService.logOut();
    localStorage.removeItem('token');
    this.authenticated = false;
    // reset the store after that
    this.apollo.getClient().resetStore();
  }
}
