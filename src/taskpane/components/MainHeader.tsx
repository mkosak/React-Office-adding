import * as React from "react";

export interface HeaderProps {
  title: string;
}

export const MainHeader = (props: HeaderProps) => {  
  const { title } = props;

  return (
    <div className="main-header flex flex--space-between">
      <h1>{title} </h1>
      <i className="ms-Icon ms-Icon--Cancel close-button" aria-hidden="true"></i>
    </div>
  );
}
