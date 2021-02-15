import * as React from "react";
import axios from "axios";
import API from "./../utils/API";
import { Button, ButtonType, Spinner, SpinnerType } from "office-ui-fabric-react";
import Header from "./Header";
import UserList, { User, Post } from "./UserList";
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
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 2500);
    }).catch(errors => {
      // react on errors.
      console.log(errors);
    });
  }

  getUsersKeys() {
    const { users } = this.state;

    if (!users && !users.length) return null;

    return Object.keys(users[0]);
  }

  click = async () => {
    try {
      await Excel.run(async context => {
        const selected = context.workbook.getSelectedRange();
        selected.load(["address"]);

        await context.sync();

        console.log(selected.address);
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { title, isOfficeInitialized } = this.props;
    const { users, posts, isLoading } = this.state;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    return (
      <div className="ms-welcome">
        <Header title={this.props.title} />
        {isLoading && (<Spinner type={SpinnerType.large} label="Loading..." />)}
        {!isLoading && (
          <UserList users={users} posts={posts}>
            <Button
              className="ms-welcome__action"
              buttonType={ButtonType.hero}
              iconProps={{ iconName: "ChevronRight" }}
              onClick={this.click}
            >
              Run
            </Button>
          </UserList>
        )}
      </div>
    );
  }
}
