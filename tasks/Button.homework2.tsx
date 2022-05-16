import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import * as React from "react";

import { ButtonCase } from "./Button";

export default {
  component: ButtonCase,
  componentProps: {
    children: "Hello world!",
    size: "Large",
  },
  wrapper: (props) => (
    <FluentProvider theme={teamsLightTheme}>{props.children}</FluentProvider>
  ),
};
