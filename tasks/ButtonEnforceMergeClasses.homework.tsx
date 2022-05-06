import {
  FluentProvider,
  teamsLightTheme,
  ToggleButton,
} from "@fluentui/react-components";
import * as React from "react";

import { ButtonCase } from "./Button";

export default {
  component: ButtonCase,
  componentProps: {
    children: "Hello world!",
    size: "Large",
  },
  env: {
    GRIFFEL_ENFORCE_CLASSES_COMPUTATION: true,
    GRIFFEL_ENFORCE_CSS_INSERTION: false,
    GRIFFEL_ENFORCE_MERGE_CLASSES_COMPUTATION: false,
  },
  wrapper: (props) => (
    <FluentProvider theme={teamsLightTheme}>{props.children}</FluentProvider>
  ),
};
