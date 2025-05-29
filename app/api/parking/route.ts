import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';

// Récupération de tous les parkings
export async function GET() {
    try {
        const parkings = await prisma.parking.findMany();
        return NextResponse.json(parkings);
    } catch (error) {
        console.log('Erreur lors de la récupération des parkings', error);
        return NextResponse.json({
            status: 500,
            message: 'Erreur interne du serveur'
        });
    }
}

// Créer un parking
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parking = await prisma.parking.create({ data: body });
        return NextResponse.json(parking, { status: 201 });
    } catch (error) {
        console.log('Erreur lors de la création du parking', error);
        return NextResponse.json({ status: 500, message: 'Erreur interne du serveur' });
    }
}
