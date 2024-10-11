"use server"
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcryptjs');

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

type Payload = {
  authInfo: AuthInfo;
  expires: Date;
};

type AuthInfo = {
  email: string | null;
  password: string | null;
};

export async function encrypt(payload : Payload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(key);
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return {
    authInfo: payload.authInfo as AuthInfo,
    expires: new Date(payload.expires as string), // Ensure expires is a Date object
  };
}

export async function login(formData: FormData) {
  const adminEmail = process.env.ADMIN_EMAIL
  const hashedPassword = process.env.HASHED_PASSWORD

  const authInfo = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  };

 

  
  const { email, password } = authInfo;


  async function checkPasswordMatch(password : string) {
    try {
      
      const hash = await bcrypt.hash(password, 10);
     
  
     
      const isMatch = await bcrypt.compare(password, hash);
      
  
      return isMatch; // Return the result of the comparison
    } catch (error) {
      console.error("Error during password hashing/comparison:", error);
      throw error;
    }
  }

  const isMatch = await checkPasswordMatch(password)

  if (!email || !password) {
    console.log("Missing email or password");
  
  }

  
  console.log(isMatch)
  if (isMatch && email == adminEmail) {
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    const session = await encrypt({ authInfo, expires });

    cookies().set("session", session, { expires, httpOnly: true });
    redirect("/admin");
  } else {
    console.log("login error");
  }
}



export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (!session) return;

  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 10 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires as Date,
  });
}
