import React from 'react';
import { render } from '@testing-library/react';

import { pageHeaderTestkitFactory } from 'wix-style-react/dist/testkit';

import formHooks from '../../constants/form';

import App from './App';

describe('App', () => {
  it('renders a title correctly', async () => {
    const { baseElement } = render(<App />);

    const headerDriver = pageHeaderTestkitFactory({
      wrapper: baseElement,
      dataHook: formHooks.PAGE_HEADER,
    });

    expect(headerDriver.titleText()).toEqual('WSR Form');
  });
});
