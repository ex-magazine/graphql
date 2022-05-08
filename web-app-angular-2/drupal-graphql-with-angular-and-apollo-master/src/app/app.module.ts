import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AppComponent } from './app.component';
import { OAuthModule } from 'angular-oauth2-oidc';

import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AddClientComponent } from './components/add-client/add-client.component';

@NgModule({
  declarations: [
    AppComponent,
    AddClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    ApolloModule,
    HttpLinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo,
    httpLink: HttpLink) {
    const http = httpLink.create({ uri: `${environment.contenta_url}${environment.graphql}` //?XDEBUG_SESSION_START=PHPSTORM 
   });

    const auth = setContext((_, { headers }) => {
      // get the authentication token from local storage if it exists
      const token = localStorage.getItem('token');

      if (!token) {
        return {};
      } else {
        return {
          headers: new HttpHeaders().append('Authorization', `Bearer ${token}`).append('Content-Type', 'application/json')
        };
      }
    });

    apollo.create({
      link: auth.concat(http),
      cache: new InMemoryCache(),
    });
  }
}
