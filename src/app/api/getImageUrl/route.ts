"use server"

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    const searchParams = request.nextUrl.searchParams
    const signedUrl = searchParams.get("filename")
    
    

    return NextResponse.json({
        signedUrl,
    })
}