import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./lib/auth";

export async function sessionUpdateMiddleware(request : NextRequest){
    return await updateSession(request)
}

export async function adminVerificationMiddleware(request: Request) {
    const session = await getSession(); // Fetch session information
  
    const url = new URL(request.url);
  
    // Protect /admin routes
    if (url.pathname.startsWith("/admin")) {
      if (!session) {
        // If the user is not authenticated, redirect to login
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
  
    // Allow the request to continue if authenticated
    return undefined;
  }




// Combined middleware function
export async function middleware(request: NextRequest) {
    // Run the session update middleware
    const sessionUpdateResponse = await sessionUpdateMiddleware(request);
    console.log(sessionUpdateResponse)
    // If session update middleware returns a response, stop and return that response
   
    
    // Run the admin verification middleware
    const adminVerificationResponse = await adminVerificationMiddleware(request);
  
    // If admin verification returns a response (e.g., redirect), stop and return it
    if (adminVerificationResponse) {
      return adminVerificationResponse;
    }
  
    // If neither middleware needs to intercept the request, allow it to continue
    return NextResponse.next();
  }