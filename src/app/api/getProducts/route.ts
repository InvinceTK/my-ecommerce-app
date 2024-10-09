"use server"
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../db/db';
import { NextResponse } from 'next/server';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

    // Fetch products from the database
    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        imagePath: true,
        price : true
      },
    });
    
    return NextResponse.json({
      products
    })
}