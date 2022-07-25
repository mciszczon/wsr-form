import {
  ButtonTestkit,
  InputTestkit,
  DropdownTestkit,
  CardHeaderTestkit,
} from 'wix-style-react/dist/testkit/puppeteer';

import formHooks from '../src/constants/form';

describe('WSR Form', () => {
  const kits: any = {};

  beforeEach(async () => {
    await page.goto(app.getUrl('/'));

    kits.submitButtonTestkit = await ButtonTestkit({
      dataHook: formHooks.SUBMIT_BUTTON,
      page,
    });

    kits.clearButtonTestkit = await ButtonTestkit({
      dataHook: formHooks.CLEAR_BUTTON,
      page,
    });

    kits.firstNameInputTestkit = await InputTestkit({
      dataHook: formHooks.FIRST_NAME,
      page,
    });

    kits.lastNameInputTestkit = await InputTestkit({
      dataHook: formHooks.LAST_NAME,
      page,
    });

    kits.colorDropdownTestkit = await DropdownTestkit({
      dataHook: formHooks.FAVORITE_COLOR,
      page,
    });

    kits.savedDataCardHeaderTestkit = await CardHeaderTestkit({
      dataHook: formHooks.SAVED_DATA,
      page,
    });
  });

  it('should submit component', async () => {
    await kits.firstNameInputTestkit.enterText('Mat');
    await kits.lastNameInputTestkit.enterText('C');
    await kits.colorDropdownTestkit.driver.selectOptionById(1);

    expect(await kits.savedDataCardHeaderTestkit.exists()).toEqual(false);
    await kits.submitButtonTestkit.click();
    expect(await kits.savedDataCardHeaderTestkit.exists()).toEqual(true);
  });

  it('doesnt submit form without required field', async () => {
    await kits.firstNameInputTestkit.enterText('Mat');
    await kits.colorDropdownTestkit.driver.selectOptionById(1);

    expect(await kits.submitButtonTestkit.isButtonDisabled()).toEqual(true);
    expect(await kits.savedDataCardHeaderTestkit.exists()).toEqual(false);
    await kits.submitButtonTestkit.click();
    expect(await kits.savedDataCardHeaderTestkit.exists()).toEqual(false);
  });

  it('should clear the form', async () => {
    await kits.firstNameInputTestkit.enterText('Mat');
    await kits.lastNameInputTestkit.enterText('C');
    await kits.colorDropdownTestkit.driver.selectOptionById(1);

    expect(await kits.firstNameInputTestkit.getValue()).toEqual('Mat');
    expect(await kits.lastNameInputTestkit.getValue()).toEqual('C');
    expect(await kits.colorDropdownTestkit.inputDriver.getValue()).toEqual(
      'White',
    );

    await kits.clearButtonTestkit.click();

    expect(await kits.firstNameInputTestkit.getValue()).toEqual('');
    expect(await kits.lastNameInputTestkit.getValue()).toEqual('');
    expect(await kits.colorDropdownTestkit.inputDriver.getValue()).toEqual('');
  });
});
