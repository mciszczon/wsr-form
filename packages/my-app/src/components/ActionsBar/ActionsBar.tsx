import React from 'react';
import { Box, Button } from 'wix-style-react';

import formHooks from '../../constants/form';

type MouseEventFunction = (
  event: React.MouseEvent<HTMLElement, MouseEvent>,
) => void;

interface IActionsBar {
  formValid: boolean;
  formEmpty: boolean;
  onClearClicked: MouseEventFunction;
  onSubmitClicked: MouseEventFunction;
}

const ActionsBar = ({
  formValid,
  formEmpty,
  onClearClicked,
  onSubmitClicked,
}: IActionsBar) => (
  <Box gap={2}>
    <Button
      dataHook={formHooks.CLEAR_BUTTON}
      priority="secondary"
      onClick={onClearClicked}
      disabled={formEmpty}
    >
      Clear
    </Button>
    <Button
      disabled={!formValid}
      dataHook={formHooks.SUBMIT_BUTTON}
      onClick={onSubmitClicked}
    >
      Submit
    </Button>
  </Box>
);

export default ActionsBar;
