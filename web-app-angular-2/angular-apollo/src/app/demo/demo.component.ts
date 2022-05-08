import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';

const GET_POSTS = gql `
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

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})


export class DemoComponent implements OnInit {
  loading: boolean | undefined;
  posts: any;

  private querySubscription: Subscription | undefined;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery<any>({
      query: GET_POSTS
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.posts = data.posts;
        console.log(data.nodeQuery);
      });
  }

  

}
