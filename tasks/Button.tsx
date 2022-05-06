import { SplitButton, Button, ToggleButton } from "@fluentui/react-components";
import * as React from "react";

export function ButtonCase() {
  return (
    <>
      <Button appearance="primary" disabledFocusable>
        Disabled focusable state
      </Button>
      <SplitButton menuButton={{}}>Rounded</SplitButton>
      <ToggleButton appearance="primary" disabled>
        Disabled state
      </ToggleButton>
    </>
  );
}
