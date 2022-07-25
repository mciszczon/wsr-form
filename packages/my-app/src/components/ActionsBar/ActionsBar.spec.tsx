import React from 'react';

import { render } from '@testing-library/react';

import ActionsBar from './ActionsBar';

describe('ActionsBar', () => {
  it('renders', async () => {
    render(
      <ActionsBar
        formValid={false}
        formEmpty={true}
        onClearClicked={() => null}
        onSubmitClicked={() => null}
      />,
    );
  });
});
