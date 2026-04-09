import React from "react";

export interface HelloWorldProps {
  title: string;
  text: string;
}

export default function HelloWorld(props: HelloWorldProps) {
  return (
    <section>
      <h2>{props.title}</h2>
      <p>{props.text}</p>
    </section>
  );
}