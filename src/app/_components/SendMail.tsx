"use server"
import { render } from "@react-email/render";  // Import the render function
import { sendMail } from "@/lib/mail";  // Import your email sending logic
import { TestEmail } from "./TestEmail";
import prisma from "../../../db/db";
  // Import your React email component

// This function sends an email
export async function sendMailPage(id) {
  
  const data = await prisma.product.findFirst({
    where:{
      id,
    }
  })

  const {filePath} = data

  const product = `https://storage.googleapis.com/ecommerce-bucket-wds/${filePath}`

  const emailHtml = await render(<TestEmail product = {product} name="Elliot" />);

 
  await sendMail({
    to: "elliotkaute@gmail.com",
    name: "elliot",
    subject: "Test Mail",
    body: emailHtml,
  });


}