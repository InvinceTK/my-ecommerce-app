"use server"
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
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
  return payload;
}

export async function login(formData: FormData) {
  const adminEmail = process.env.ADMIN_EMAIL
  const hashedPassword = process.env.HASHED_PASSWORD

  const authInfo = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  
  const { email, password } = authInfo;

  const isMatch = bcrypt.compare(password, hashedPassword)
  if (isMatch && email == adminEmail) {
    const expires = new Date(Date.now() + 10 * 60 * 1000);
    const session = await encrypt({ authInfo, expires });

    cookies().set("session", session, { expires, httpOnly: true });
    redirect("/admin");
  } else {
    console.log("login error");
  }
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) });
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
    expires: parsed.expires,
  });
}
