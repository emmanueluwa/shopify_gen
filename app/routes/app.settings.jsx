import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  Divider,
  useBreakpoints,
  Button,
} from "@shopify/polaris";
import { useState } from "react";

export async function loader() {
  // data from db
  let settings = {
    name: "csws app",
    description: "the description",
  };
  return json(settings);
}

export async function action({ request }) {
  // updates persistent data
  let settings = await request.formData();

  const settingsObject = Object.fromEntries(settings);

  return json(settingsObject);
}

export default function SettingsPage() {
  const settings = useLoaderData();
  const [formState, setFormState] = useState(settings);

  return (
    <Page
      divider
      primaryAction={{ content: "View on your store", disabled: true }}
      secondaryActions={[
        {
          content: "Duplicate",
          accessibilityLabel: "Secondary action label",
          onAction: () => alert("Duplicate action"),
        },
      ]}
    >
      <ui-title-bar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings and preferences.
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="App name"
                  name="name"
                  value={formState.name}
                  onChange={(value) =>
                    setFormState({ ...formState, name: value })
                  }
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formState.description}
                  onChange={(value) =>
                    setFormState({ ...formState, description: value })
                  }
                />

                <Button submit={true}>Save</Button>
              </BlockStack>
            </Form>
          </Card>
        </InlineGrid>
      </BlockStack>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
