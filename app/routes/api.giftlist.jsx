import { json } from "@remix-run/node";
import db from "../db.server";
import { cors } from "remix-utils/cors";

export async function loader({ request }) {
  // provides data to the component
  const url = new URL(request.url);
  const customerId = url.searchParams.get("customerId");
  const shop = url.searchParams.get("shop");
  const productId = url.searchParams.get("productId");

  if (!customerId || !shop || !productId) {
    return json({
      message: "Missing data",
      method: "GET",
    });
  }

  const giftlist = await db.giftlist.findMany({
    where: {
      customerId: customerId,
      shop: shop,
      productId: productId,
    },
  });

  const response = json({
    ok: true,
    message: "Success",
    data: giftlist,
  });

  return cors(request, response);
}

export async function action({ request }) {
  let data = await request.formData();
  data = Object.fromEntries(data);
  const customerId = data.customerId;
  const productId = data.productId;
  const shop = data.shop;
  const _action = data._action;

  if (!customerId || !productId || !shop || !_action) {
    return json({
      message:
        "Missing data, customerId, productId, _action and shop are required",
      method: _action,
    });
  }

  let response;

  switch (_action) {
    case "CREATE":
      const giftlist = await db.giftlist.create({
        data: {
          customerId,
          productId,
          shop,
        },
      });

      response = json({
        message: "Product added to wishlist",
        method: _action,
        giftlisted: true,
      });

      return cors(request, response);
    case "PATCH":
      return json({ message: "Successs", method: "Patch" });

    case "DELETE":
      await db.giftlist.deleteMany({
        where: {
          customerId: customerId,
          shop: shop,
          productId: productId,
        },
      });

      response = json({
        message: "Product removed from giftlist",
        method: _action,
        giftlisted: false,
      });
      return cors(request, response);

    default:
      return new Response("Method Not Allowed!", { status: 405 });
  }
}
