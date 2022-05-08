import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { ApolloModule, gql, Apollo, APOLLO_OPTIONS, APOLLO_NAMED_OPTIONS, NamedOptions } from 'apollo-angular';
import {HttpClientModule, } from '@angular/common/http';
import {ApolloClient, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { DemoComponent } from './demo/demo.component';

const routes: Routes = [
  {
    path: 'demo',
    component: DemoComponent
  },  
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GraphQLModule,   
    RouterModule.forRoot(routes),
    HttpClientModule,
    ApolloModule,    
  ],
  providers: [  
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://graphql.local/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo: Apollo, httpLink: HttpLink) {
    
  }

}
