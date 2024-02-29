import { json } from "@remix-run/node";

export async function loader() {
  // provides data to the component
  return json({
    ok: true,
    message: "obota from the API",
  });
}

export async function action({ request }) {
  const method = request.method;

  switch (method) {
    case "POST":
      return json({ message: "Successs", method: method });
    case "PATCH":
      return json({ message: "Successs", method: method });
    default:
      return new Response("Method Not Allowed!", { status: 405 });
  }
}
