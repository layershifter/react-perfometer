import * as React from "react";

function Component(props) {
  return <div className={props.className}>{props.children}</div>;
}

const items = Array(100)
  .fill(null)
  .reduce((children, item, index) => {
    return React.createElement(
      Component,
      { className: "item" + index },
      children
    );
  }, React.createElement('div'));

function AppCase() {
  return items;
}

export default {
  component: AppCase,
};
