import * as React from "react";

export interface UserListItem {
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
  items: UserListItem[];
}

export default class UserList extends React.Component<UserListProps> {
  render() {
    const { children, items } = this.props;

    console.log(items);

    const listItems = items.map((item, index) => (
      <li className="ms-ListItem" key={index}>
        <i className={`ms-Icon ms-Icon--${item.id}`}></i>
        <span className="ms-font-m ms-fontColor-neutralPrimary">{item.name}</span>
      </li>
    ));
    return (
      <main className="ms-welcome__main">
        <ul className="ms-List ms-welcome__features ms-u-slideUpIn10">{listItems}</ul>
        {children}
      </main>
    );
  }
}
