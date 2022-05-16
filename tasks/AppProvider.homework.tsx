import * as React from "react";

const Context = React.createContext(null);

function Component(props) {
  return (
    <div className={props.className}>
      <Context.Provider value={props.className}>
        {props.children}
      </Context.Provider>
    </div>
  );
}

const items = Array(100)
  .fill(null)
  .reduce((children, item, index) => {
    return React.createElement(
      Component,
      { className: "item" + index },
      children
    );
  }, React.createElement("div"));

function AppProviderCase() {
  return items;
}

export default {
  component: AppProviderCase,
};
