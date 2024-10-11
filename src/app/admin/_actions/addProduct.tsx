"use server";
import { revalidatePath } from "next/cache"; // Import from Next.js cache module if using revalidation
import prisma from "../../../../db/db";
import { z } from "zod";
import { Storage } from "@google-cloud/storage";
import { redirect } from "next/navigation";

export default async function AddProduct(formData: FormData) {
  const MAX_FILE_SIZE = 5000000;

  function checkFileType(file: File) {
    if (file?.name) {
      const fileType = file.name.split(".").pop();
      if (fileType === "docx" || fileType === "pdf") return true;
    }
    return false;
  }

  function checkImageType(image: File) {
    if (image?.name) {
      const imageType = image.name.split(".").pop();
      if (
        imageType === "png" ||
        imageType === "jpg" ||
        imageType === "jpeg" ||
        imageType === "webp"
      )
        return true;
    }
    return false;
  }

  const schema = z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    description: z.string().min(1),
    stock: z.number().positive(),
    filePath: z
      .instanceof(File) // Ensure the value is a File object
      .refine((file) => file?.name.length !== 0, "File is required")
      .refine((file) => file.size < MAX_FILE_SIZE, "Max size is 5MB.")
      .refine(
        (file) => checkFileType(file),
        "Only .pdf, .docx formats are supported."
      ),

    imagePath: z
      .instanceof(File) // Ensure the value is a File object
      .refine((image) => image?.name.length !== 0, "File is required")
      .refine((image) => image.size < MAX_FILE_SIZE, "Max size is 5MB.")
      .refine(
        (file) => checkImageType(file),
        "Only .jpg, .png formats are supported."
      ),
  });

  const formContents = {
    name: formData.get("name") as string,
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string),
    description: formData.get("description") as string,
    filePath: formData.get("file") as File,
    imagePath: formData.get("image") as File,
  };
  const validation = schema.safeParse(formContents);

  if (!validation.success) {
    console.log("Validation errors:", validation.error.format());
  } else {
    const { name, price, description, imagePath, filePath, stock } =
      validation.data;

    await prisma.product.create({
      data: {
        name: name,
        price: price,
        stock: stock,
        description: description,
        imagePath: imagePath.name,
        filePath: filePath.name,
      },
    });
    const fileBuffer = await filePath.arrayBuffer();
    const imageBuffer = await imagePath.arrayBuffer();



    const storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    });

    await storage
      .bucket("ecommerce-bucket-wds")
      .file(filePath.name)
      .save(Buffer.from(fileBuffer));

    await storage
      .bucket("ecommerce-bucket-wds")
      .file(imagePath.name)
      .save(Buffer.from(imageBuffer));
  }

  revalidatePath("/admin/dashboard");
  redirect("/admin/dashboard");
}
