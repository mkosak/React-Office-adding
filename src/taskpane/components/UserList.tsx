import * as React from "react";
import { MessageBar, Icon} from "office-ui-fabric-react";

import { Accordion } from "./accordion/Accordion";
import { Tabs } from "./tabs/Tabs";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  address: any;
  company: any;
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface UserListProps {
  users: User[];
  posts: Post[];
}

export const UserList = (props: UserListProps) => {
  const { users, posts } = props;
  const [ postsToRender, setPostsToRender ] = React.useState([]);
  const [ message, setMessage ] = React.useState('');

  /**
   * Retrieve user's posts from the props
   * @method getUserPosts
   * @param {userId} number - user id
   */
  const getUserPosts = (userId: number): Post[] => {    
    return posts.filter((post) => post.userId === userId);
  }

  /**
   * Set active user posts to the state for future render
   * @method activeUser
   * @param {userId} number - user id
   */
  const activeUser = (userId: number) => {
    setPostsToRender(getUserPosts(userId));
  };

  /**
   * Get posts keys, like ["id", "userId", ...]
   * @method getPostKeys
   */
  const getPostKeys = () => {
    const { posts } = props;
    if (!posts && !posts.length) return null;

    return Object.keys(posts[0]);
  }

  /**
   * Play add-in render function
   * @method play
   */
  const play = async () => {
    try {
      await Excel.run(async context => {
        // get selected range
        const selected = context.workbook.getSelectedRange();
        
        // get selected cell indexes
        selected.load(['rowIndex', 'columnIndex']);

        await context.sync();

        // continue if user posts selected
        if (postsToRender.length <= 0) {
          setMessage('Please select user first');
        } else {
          // get values as array or values array, like [[ "id", "userId", ...]]
          let posts = postsToRender.map(Object.values);

          // add post keys at the begining of the array (this will be the table header)
          posts.unshift(getPostKeys());

          // Get active sheet.
          let sheet = context.workbook.worksheets.getActiveWorksheet();

          // Get Range object that encompasses table data.
          let tableRange = sheet.getCell(selected.rowIndex, selected.columnIndex).getResizedRange(posts.length - 1, getPostKeys().length - 1);

          // Write values to the range.
          tableRange.values = posts;

          // Create a table from the range.
          let userPostsTable = sheet.tables.add(tableRange, true);

          // Give table a name
          userPostsTable.name = "PostsTable";

          setMessage('');
        }

        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="users-panel">
      {/* action bar */}
      <div className="users-panel__action-bar flex">
        <div className="left-panel"></div>
        <div className="right-panel">
          <Icon iconName="Play" className="play-button" onClick={play} />          
        </div>
      </div>

      {/* panel content */}
      <section className="users-panel__content flex">
        <div className="left-panel">
          <div className="users-panel__tabs">
            <Tabs />
          </div>
        </div>
        <div className="right-panel">
          {message && (<MessageBar>{message}</MessageBar>)}

          {/* panel header */}
          <header className="users-panel__header">Posts</header>

          {/* content accordion */}          
          <div className="users-panel__accordion">
            <div className="users-panel__model-bar">
              <div className="users-panel__model-bar__icon">                
                <Icon iconName="SearchData" />
              </div>
            </div>
            <Accordion users={users} posts={posts} setUser={activeUser} />
          </div>
        </div>
      </section>
    </main>
  );
}
