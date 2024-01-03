import getRawBody from "raw-body";
import { stripe } from "src/pricing/utils/stripe";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const signature = req.headers["stripe-signature"];
  const signingSecret = process.env.STRIPE_SIGNING_SECRET;

  let event;

  try {
    const rawBody = await getRawBody(req, { limit: "2mb" });
    event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
  } catch (error) {
    console.log("Webhook signature verification failed.");
    return res.status(400).end();
  }

  try {
    console.log(event);
    switch (event.type) {
      case "customer.subscription.updated":
        await updateSubscription(event);
        break;
      case "customer.subscription.deleted":
        await deleteSubscription(event);
        break;
    }

    res.send({ success: true });
  } catch (error) {
    console.log(error.message);
    res.send({ success: false });
  }
}

async function updateSubscription(event) {}

async function deleteSubscription(event) {}
