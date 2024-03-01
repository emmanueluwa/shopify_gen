import { json } from "@remix-run/node";
import db from "../db.server";
import { cors } from "remix-utils/cors";

export async function loader() {
  // provides data to the component
  return json({
    ok: true,
    message: "obota from the API",
  });
}

export async function action({ request }) {
  const method = request.method;
  let data = await request.formData();
  data = Object.fromEntries(data);
  const customerId = data.customerId;
  const productId = data.productId;
  const shop = data.shop;

  if (!customerId || !productId || !shop) {
    return json({
      message: "Missing data, customerId, productId and shop are required",
      method: method,
    });
  }

  switch (method) {
    case "POST":
      const giftlist = await db.giftlist.create({
        data: {
          customerId,
          productId,
          shop,
        },
      });

      const response = json({
        message: "Product added to wishlist",
        method: method,
        giftlist: giftlist,
      });

      return cors(request, response);
    case "PATCH":
      return json({ message: "Successs", method: method });
    default:
      return new Response("Method Not Allowed!", { status: 405 });
  }
}
