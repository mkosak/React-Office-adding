import * as React from 'react';
import classNames from 'classnames';
import { Post } from '../UserList';
import { Icon } from "@fluentui/react/lib/Icon";

import './accordion.css';

export interface AccordionProps {
  users: any[];
  posts: any[];
  setUser: (userId: number) => void;
}

export const Accordion = (props: AccordionProps) => {
  const { users, posts, setUser } = props;
  const [ active, setActive ] = React.useState(1);

  const getUserPosts = (userId: number): Post[] => {    
    return posts.filter((post) => post.userId === userId);
  }
  
  const listPosts = (userId: number) => { 
    return getUserPosts(userId).map((item, index) => (
      <div className="accordion-sub-item" key={item.id}>
        <div className="accordion-sub-item__index">{index + 1}</div>
        <div className="accordion-sub-item__line">
          <div className="line-label">ID</div>
          <div className="line-value">{item.id}</div>
        </div>
        <div className="accordion-sub-item__line">
          <div className="line-label">Title</div>
          <div className="line-value">{item.title}</div>
        </div>
        <div className="accordion-sub-item__line">
          <div className="line-label">Body</div>
          <div className="line-value">{item.body}</div>
        </div>
      </div>
    ));
  };

  const toggleAccordion = (id: number) => {
    setActive(id);
    setUser(id);
  };

  const activeCss = (id: number) => classNames({
    'accordion-item': true,
    'accordion-item--active': (active === id),
  });
  const activeContentCss = (id: number) => classNames({
    'accordion-item__content': true,
    'accordion-item__content--active': (active === id),
  });

  const listUsers = users.map((item) => (
    <div className={activeCss(item.id)} key={item.id} onClick={() => toggleAccordion(item.id)}>
      <div className="accordion-item__title flex">
        <div className="direction">
          {(active === item.id) ? <Icon iconName="ChevronUpMed" /> : <Icon iconName="ChevronDownMed" />}
        </div>
        {item.name}
      </div>
      <div className={activeContentCss(item.id)}>{listPosts(item.id)}</div>
    </div>
  ));

  return (
    <div className="accordion">
      {listUsers}
    </div>
  );
}
