import * as React from "react";
import * as ReactDOM from "react-dom";

// @ts-expect-error
import homework from "homework";

const profilerResults: Parameters<React.ProfilerOnRenderCallback>[] = [];
const handleRender: React.ProfilerOnRenderCallback = (...args) => {
  profilerResults.push(args);
};

type AppProps = {
  component: React.ElementType;
  componentProps: Record<string, unknown>;
  times: number;
  wrapper: React.ElementType;
};

const App: React.FC<AppProps> = (props) => {
  const {
    component: Component,
    componentProps,
    times,
    wrapper: Wrapper = React.Fragment,
  } = props;

  return (
    <Wrapper>
      {React.createElement(Component, componentProps)}

      {Array(times)
        .fill(null)
        .map((_, i) => (
          <React.Profiler
            id={i.toString()}
            key={i.toString()}
            onRender={handleRender}
          >
            {React.createElement(Component, componentProps)}
            {React.createElement(Component, componentProps)}
            {React.createElement(Component, componentProps)}
            {React.createElement(Component, componentProps)}
            {React.createElement(Component, componentProps)}
          </React.Profiler>
        ))}
    </Wrapper>
  );
};

function render(times: number = 3) {
  ReactDOM.render(
    <App
      component={homework.component}
      times={times}
      componentProps={homework.componentProps}
      wrapper={homework.wrapper}
    />,
    document.querySelector("#root")
  );

  return profilerResults;
}

window.render = render;

const params = new URL(window.location).searchParams;

if (params.get("render")) {
  render();
}
