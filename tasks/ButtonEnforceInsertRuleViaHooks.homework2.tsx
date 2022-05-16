import { FluentProvider, teamsLightTheme } from "@fluentui/react-components";
import * as React from "react";

import { ButtonCase } from "./Button";

export default {
  component: ButtonCase,
  componentProps: {
    children: "Hello world!",
    size: "Large",
  },
  env: {
    GRIFFEL_ENFORCE_CSS_INSERTION: true,
    GRIFFEL_CSS_INSERTION_VIA_HOOKS: true,
  },
  wrapper: (props) => (
    <FluentProvider theme={teamsLightTheme}>{props.children}</FluentProvider>
  ),
};