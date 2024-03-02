import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import db from "../db.server";
import {
  Page,
  Layout,
  Text,
  Card,
  BlockStack,
  List,
  Link,
  InlineStack,
  DataTable,
  EmptyState,
} from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { formatDistanceToNow, parseISO } from "date-fns";

export const loader = async ({ request }) => {
  const auth = await authenticate.admin(request);
  const shop = auth.session.shop;

  const giftlistData = await db.giftlist.findMany({
    where: {
      shop: shop,
    },
    orderBy: {
      id: "asc",
    },
  });

  console.log("giftlistData=>>>>", giftlistData);

  return json(giftlistData);
};

export const action = async ({ request }) => {};

export default function Index() {
  const giftlistData = useLoaderData();
  const giftlistArray = giftlistData.map((item) => {
    const createdAt = formatDistanceToNow(parseISO(item.createdAt), {
      addSuffix: true,
    });
    return [item.customerId, item.productId, createdAt];
  });

  return (
    <Page title="Giftlist overview dashboard">
      <ui-title-bar title="Overview"></ui-title-bar>
      <BlockStack gap="500">
        <Layout>
          <Layout.Section>
            <Card>
              {giftlistData.length > 0 ? (
                <DataTable
                  columnContentTypes={["text", "text", "text"]}
                  headings={["Customer ID", "Product ID", "Created At"]}
                  rows={giftlistArray}
                />
              ) : (
                <EmptyState
                  heading="Manage your wishlist products here"
                  action={{
                    content: "Learn more",
                    url: "URL",
                    external: true,
                  }}
                  secondaryAction={{
                    content: "Learn more",
                    url: "URL",
                    external: true,
                  }}
                  image=""
                >
                  <p>You do not have any products in your giftlist yet</p>
                </EmptyState>
              )}
            </Card>
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <BlockStack gap="500">
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    App template specs
                  </Text>
                  <BlockStack gap="200">
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Framework
                      </Text>
                      <Link
                        url="https://remix.run"
                        target="_blank"
                        removeUnderline
                      >
                        Remix
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Database
                      </Text>
                      <Link
                        url="https://www.prisma.io/"
                        target="_blank"
                        removeUnderline
                      >
                        Prisma
                      </Link>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        Interface
                      </Text>
                      <span>
                        <Link
                          url="https://polaris.shopify.com"
                          target="_blank"
                          removeUnderline
                        >
                          Polaris
                        </Link>
                        {", "}
                        <Link
                          url="https://shopify.dev/docs/apps/tools/app-bridge"
                          target="_blank"
                          removeUnderline
                        >
                          App Bridge
                        </Link>
                      </span>
                    </InlineStack>
                    <InlineStack align="space-between">
                      <Text as="span" variant="bodyMd">
                        API
                      </Text>
                      <Link
                        url="https://shopify.dev/docs/api/admin-graphql"
                        target="_blank"
                        removeUnderline
                      >
                        GraphQL API
                      </Link>
                    </InlineStack>
                  </BlockStack>
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">
                    Next steps
                  </Text>
                  <List>
                    <List.Item>
                      Build an{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/getting-started/build-app-example"
                        target="_blank"
                        removeUnderline
                      >
                        {" "}
                        example app
                      </Link>{" "}
                      to get started
                    </List.Item>
                    <List.Item>
                      Explore Shopify’s API with{" "}
                      <Link
                        url="https://shopify.dev/docs/apps/tools/graphiql-admin-api"
                        target="_blank"
                        removeUnderline
                      >
                        GraphiQL
                      </Link>
                    </List.Item>
                  </List>
                </BlockStack>
              </Card>
            </BlockStack>
          </Layout.Section>
        </Layout>
      </BlockStack>
    </Page>
  );
}
