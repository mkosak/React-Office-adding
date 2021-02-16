import * as React from "react";

import axios from "axios";
import API from "./../utils/API";

import { Spinner, SpinnerType } from "office-ui-fabric-react";
import { MainHeader } from "./MainHeader";
import { UserList, User, Post } from "./UserList";
import { SidePanel } from "./SidePanel";
import Progress from "./Progress";

import './styles/app.css';

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

      // timeout is for visual purpose only, representing the loading state
      setTimeout(() => {
        // stop loading
        this.setState({ isLoading: false });
      }, 22500); // this is a magic number yes :), please reade above

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
      <section className="app flex">
        {isLoading && (
          <div className="app__spinner flex flex--centered">
            <Spinner type={SpinnerType.large} label="Loading..." />
          </div>
        )}
        
        {!isLoading && (
          <>
              <div className="panel-wrapper">
                <MainHeader title={this.props.title} />            
                <UserList users={users} posts={posts}></UserList>
              </div>

              <SidePanel />
          </>
        )}
      </section>
    );
  }
}
