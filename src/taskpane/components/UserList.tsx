import * as React from "react";

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
  children: any;
  users: User[];
  posts: Post[];
}

export default function UserList(props: UserListProps) {  
  const { children, users, posts } = props;

  const getUserPosts = (userId: number): Post[] => {    
    return posts.filter((post) => post.userId === userId);
  }
  
  const listPosts = (userId: number) => { 
    return getUserPosts(userId).map((item, index) => (
      <li className="ms-ListItem" key={index}>
        <i className={`ms-Icon ms-Icon--${item.id}`}></i>
        <span className="ms-font-m ms-fontColor-neutralPrimary">{item.title}</span>
      </li>
    ));
  };

  const listUsers = users.map((item, index) => (
    <li className="ms-ListItem" key={index}>
      <i className={`ms-Icon ms-Icon--${item.id}`}></i>
      <span className="ms-font-m ms-fontColor-neutralPrimary">{item.name}</span>
      <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">{listPosts(item.id)}</ul>
    </li>
  ));

  return (
    <main className="ms-welcome__main">
      <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">{listUsers}</ul>
      {children}
    </main>
  );
}
