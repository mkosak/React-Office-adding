import * as React from "react";

export interface HeaderProps {
  title: string;
}

export const MainHeader = (props: HeaderProps) => {  
  const { title } = props;

  return (
    <section>
      <h1>{title}</h1>
    </section>
  );
}
