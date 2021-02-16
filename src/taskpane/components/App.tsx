import * as React from "react";

import axios from "axios";
import API from "./../utils/API";

import { Spinner, SpinnerType } from "office-ui-fabric-react";
import { MainHeader } from "./MainHeader";
import { UserList, User, Post } from "./UserList";
import Progress from "./Progress";

/* global Button, console, Excel, Header, UserList, User, Progress */

export interface AppProps {
  title: string;
  isOfficeInitialized: boolean;
}

export interface AppState {
  users: User[];
  posts: Post[];
  isLoading: boolean;
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      users: [],
      posts: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    const fetchUsers = API.get('/users');
    const fetchPosts = API.get('/posts');

    axios.all([fetchUsers, fetchPosts]).then((responses) => {
      const users = responses[0].data;
      const posts = responses[1].data;

      // use/access the results 
      this.setState({ users: users });
      this.setState({ posts: posts });

      // stop loading
      this.setState({ isLoading: false });
    }).catch(errors => {
      // show on errors.
      console.log(errors);
    });
  }

  render() {
    const { title, isOfficeInitialized } = this.props;
    const { users, posts, isLoading } = this.state;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <section>
        <MainHeader title={this.props.title} />
        
        {isLoading && (<Spinner type={SpinnerType.large} label="Loading..." />)}

        {!isLoading && (
          <UserList users={users} posts={posts}></UserList>
        )}
      </section>
    );
  }
}
