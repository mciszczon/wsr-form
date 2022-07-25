import React, { useState } from 'react';

import {
  Card,
  Cell,
  Layout,
  FormField,
  Input,
  Page,
  WixStyleReactProvider,
  Dropdown,
  Heading,
  Box,
  IconButton,
  Text,
  AddItem,
} from 'wix-style-react';
import { DeleteSmall } from 'wix-ui-icons-common';

import formHooks from '../../constants/form';

import ActionsBar from '../ActionsBar/ActionsBar';

const options = [
  {
    id: 1,
    value: 'White',
  },
  {
    id: 2,
    value: 'Black',
  },
  {
    id: 3,
    value: 'These are one color',
  },
];

const defaultValues = {
  firstName: '',
  lastName: '',
  colorId: '',
};

interface FormInterface {
  firstName: string;
  lastName: string;
  colorId: string;
}

const App = () => {
  const [form, setForm] = useState<FormInterface>(defaultValues);
  const [savedData, setSavedData] = useState<FormInterface | null>(null);

  const setField = (name: string, value: string): void => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setSavedData(form);
    setForm(defaultValues);
  };

  return (
    <WixStyleReactProvider>
      <Page>
        <Page.Header
          dataHook={formHooks.PAGE_HEADER}
          title="WSR Form"
          actionsBar={
            <ActionsBar
              onClearClicked={() => setForm(defaultValues)}
              onSubmitClicked={handleSubmit}
              formValid={!!form.firstName && !!form.lastName && !!form.colorId}
              formEmpty={!form.firstName && !form.lastName && !form.colorId}
            />
          }
        />
        <Page.Content>
          <Layout>
            <Cell span={8}>
              <Card>
                <Card.Header title="General Info" />
                <Card.Divider />
                <Card.Content>
                  <Layout>
                    <Cell span={6}>
                      <FormField required label="First name">
                        <Input
                          required
                          value={form.firstName}
                          onChange={(e) =>
                            setField('firstName', e.target.value)
                          }
                          status={!form.firstName ? 'error' : undefined}
                          dataHook={formHooks.FIRST_NAME}
                        />
                      </FormField>
                    </Cell>
                    <Cell span={6}>
                      <FormField required label="Last name">
                        <Input
                          required
                          value={form.lastName}
                          onChange={(e) => setField('lastName', e.target.value)}
                          status={!form.lastName ? 'error' : undefined}
                          dataHook={formHooks.LAST_NAME}
                        />
                      </FormField>
                    </Cell>
                    <Cell span={12}>
                      <Heading size="tiny">Additional info</Heading>
                    </Cell>
                    <Cell span={12}>
                      <FormField required label="Favorite color">
                        <Box verticalAlign="middle" gap="12px">
                          <Box direction="vertical" width="100%">
                            <Dropdown
                              placeholder="Choose a color"
                              selectedId={form.colorId}
                              options={options}
                              onSelect={(option) =>
                                setField('colorId', option.id as string)
                              }
                              status={!form.colorId ? 'error' : undefined}
                              dataHook={formHooks.FAVORITE_COLOR}
                            />
                          </Box>
                          <IconButton
                            size="small"
                            disabled
                            priority="secondary"
                          >
                            <DeleteSmall />
                          </IconButton>
                        </Box>
                      </FormField>
                    </Cell>
                    <Cell span={12}>
                      <AddItem disabled>Add New List Item</AddItem>
                    </Cell>
                  </Layout>
                </Card.Content>
              </Card>
            </Cell>
            <Cell span={4}>
              <Box direction="vertical" gap={4}>
                <Card>
                  <Card.Header title="Role details" />
                  <Card.Divider />
                  <Card.Content>
                    <Layout>
                      <Cell span={12}>
                        <Heading size="tiny">Official Title</Heading>
                        <Text>Keyboard annihilator</Text>
                      </Cell>
                      <Cell span={12}>
                        <Heading size="tiny">Experience</Heading>
                        <Text>It's over 9k</Text>
                      </Cell>
                    </Layout>
                  </Card.Content>
                </Card>
                {savedData && (
                  <Card dataHook={formHooks.SAVED_DATA}>
                    <Card.Header title="Saved data" />
                    <Card.Divider />
                    <Card.Content>
                      <Layout>
                        <Cell span={12}>
                          <Heading size="tiny">First name</Heading>
                          <Text dataHook={formHooks.FIRST_NAME}>
                            {savedData.firstName}
                          </Text>
                        </Cell>
                        <Cell span={12}>
                          <Heading size="tiny">Last name</Heading>
                          <Text dataHook={formHooks.LAST_NAME}>
                            {savedData.lastName}
                          </Text>
                        </Cell>
                        <Cell span={12}>
                          <Heading size="tiny">Favorite color</Heading>
                          <Text dataHook={formHooks.FAVORITE_COLOR}>
                            {options.find(
                              (option) =>
                                option.id === parseInt(savedData.colorId, 10),
                            )?.value || 'Unknown'}
                          </Text>
                        </Cell>
                      </Layout>
                    </Card.Content>
                  </Card>
                )}
              </Box>
            </Cell>
          </Layout>
        </Page.Content>
      </Page>
    </WixStyleReactProvider>
  );
};

export default App;
