import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
  CalloutCard,
  Divider,
  Button,
  Grid,
} from "@shopify/polaris";

export default function PricingPage() {
  return (
    <Page>
      <ui-title-bar title="Pricing" />
      <Layout>
        <Layout.Section>
          <CalloutCard
            title="Upgrade to Pro"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: "Upgrade to Pro",
              url: "#",
            }}
          >
            <p>
              You are currently on free plan. Upgrade to pro to get more
              options.
            </p>
          </CalloutCard>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Free
                  </Text>
                  <Text as="h3" variant="bodyMd">
                    Free plan with basic features
                  </Text>
                  <Divider borderColor="border" />
                  <List type="bullet">
                    <List.Item>100 giftlists per day</List.Item>
                    <List.Item>500 porducts</List.Item>
                    <List.Item>Basic customisation</List.Item>
                    <List.Item>Basic support</List.Item>
                  </List>
                  <Divider borderColor="border" />
                  <Button>Upgrade to Pro</Button>
                </BlockStack>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Pro
                  </Text>
                  <Text as="h3" variant="bodyMd">
                    Pro plan with advanced features £10
                  </Text>
                  <Divider borderColor="border" />
                  <List type="bullet">
                    <List.Item>Unlimited giftlists per day</List.Item>
                    <List.Item>10000 porducts</List.Item>
                    <List.Item>Advanced customisation</List.Item>
                    <List.Item>Priority support</List.Item>
                  </List>
                  <Divider borderColor="border" />
                  <Button>Upgrade to Pro</Button>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>
      </Layout>
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
