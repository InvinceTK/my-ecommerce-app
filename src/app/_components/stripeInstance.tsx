import Stripe from "stripe";




if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing Stripe Secret Key");
  }
  
// Initialize Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
apiVersion:"2024-09-30.acacia", // Set the Stripe API version
});

export default stripe

