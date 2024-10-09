import stripe from "@/app/_components/stripeInstance";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the amount
    const { amount,id } = await request.json();
    console.log(`this is the id: ${id}`)
    // Validate the amount (ensure it's a number and greater than 0)
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    // Create a PaymentIntent using Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount should be in the smallest currency unit (e.g., pence for GBP)
      currency: "gbp",
      metadata: {
        product_id: id, // Add product ID to metadata
      },
      automatic_payment_methods: { enabled: true }, // Enable automatic payment methods
    });

   

    // Respond with the client secret for confirming payment on the client side
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);

    // Return an error response if something goes wrong
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }
}
