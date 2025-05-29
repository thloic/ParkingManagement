import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
      // Récupérer les parkings qui ne sont pas liés à un véhicule
      const parkingsDisponibles = await prisma.parking.findMany({
        where: {
          vehicle: null 
        }
      });
  
      return NextResponse.json(parkingsDisponibles, { status: 200 });
    } catch (error) {
      console.error('Erreur GET /parking/disponibles:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des parkings disponibles' },
        { status: 500 }
      );
    }
  }
  
