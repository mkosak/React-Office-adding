import * as React from "react";

export interface HeaderProps {
  title: string;
}

export default class Header extends React.Component<HeaderProps> {
  render() {
    const { title } = this.props;

    return (
      <section>
        <h1>{title}</h1>
      </section>
    );
  }
}
