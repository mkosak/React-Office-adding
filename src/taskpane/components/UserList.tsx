import * as React from 'react';
import { useState } from 'react';
import { MessageBar } from "office-ui-fabric-react";
// import {
//   MessageBarButton,
//   Link,
//   Stack,
//   StackItem,
//   MessageBar,
//   MessageBarType,
//   ChoiceGroup,
//   IStackProps,
// } from 'office-ui-fabric-react';

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
  const [ postsToRender, setPostsToRender ] = useState([]);
  const [ message, setMessage ] = useState('');

  const getUserPosts = (userId: number): Post[] => {    
    return posts.filter((post) => post.userId === userId);
  }
  
  const listPosts = (userId: number) => { 
    return getUserPosts(userId).map((item, index) => (
      <li key={index}>
        <span>{item.title}</span>
      </li>
    ));
  };

  const listUsers = users.map((item, index) => (
    <li key={index}>
      <span onClick={() => activeUser(item.id)}>{item.name}</span>
      <ul>{listPosts(item.id)}</ul>
    </li>
  ));

  const activeUser = (userId: number) => {
    setPostsToRender(getUserPosts(userId));
  };

  const getPostKeys = () => {
    const { posts } = props;

    if (!posts && !posts.length) return null;

    return Object.keys(posts[0]);
  }

  const play = async () => {
    try {
      await Excel.run(async context => {
        const selected = context.workbook.getSelectedRange();

        // get selected cell indexes
        selected.load(['rowIndex', 'columnIndex']);

        await context.sync();

        // console.log('rowIndex', selected.rowIndex, 'columnIndex', selected.columnIndex);
        // console.log('getPostKeys', getPostKeys());
        // console.log('getPostKeys length', getPostKeys().length);
        // console.log('postsToRender length', postsToRender.length);

        if (postsToRender.length <= 0) {
          setMessage('Please select user first');
        } else {
          let posts = postsToRender.map(Object.values);
          posts.unshift(getPostKeys());
          // console.log('posts');
          // console.log(posts);
          // const values = [].push(posts);

          // console.log('values');
          // console.log(values);

          // Get active sheet.
          let sheet = context.workbook.worksheets.getActiveWorksheet();

          // Get Range object that encompasses table data.
          let tableRange = sheet.getCell(selected.rowIndex, selected.columnIndex).getResizedRange(posts.length - 1, getPostKeys().length - 1);

          // Write values to the range.
          tableRange.values = posts;

          // Create a table from the range.
          let userPostsTable = sheet.tables.add(tableRange, true);

          userPostsTable.name = "PostsTable";
        }

        await context.sync();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <MessageBar>{message}</MessageBar>

      <button onClick={play}>
        Play
      </button>
      
      <ul>{listUsers}</ul>
    </main>
  );
}
