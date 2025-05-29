import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';
// import { Prisma } from '@prisma/client';


// 🚗 GET : récupérer tous les véhicules
export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany({
      include: {
        parking: true
      }
    });
    return NextResponse.json(vehicles)  
  } catch (error) {
    console.error('Erreur GET /vehicle:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Mappez les valeurs du frontend vers les valeurs Prisma
    const typeMapping: Record<string, string> = {
      'voiture': 'voiture',
      'Moto': 'Moto',
      'Camion': 'Camion'
    };

    if (!typeMapping[body.type]) {
      return NextResponse.json(
        { error: 'Type de véhicule invalide' },
        { status: 400 }
      );
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        plate: body.plate,
        type: body.type,
        status: true,
        entryTime: new Date(),
        parkingId: body.parkingId
      },
      include: {
        parking: true
      }
    });

    return NextResponse.json(vehicle, { status: 201 });
  } catch (error) {
    console.error('POST /vehicle:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du véhicule' },
      { status: 500 }
    );
  }
}

