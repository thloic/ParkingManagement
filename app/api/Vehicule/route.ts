import { NextResponse } from 'next/server'

// 🚗 GET : récupérer tous les véhicules
export async function GET() {
  try {
    const vehicles = await prisma.vehicle.findMany()
    return NextResponse.json(vehicles)  
  } catch (error) {
    console.error('Erreur GET /vehicle:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// 🚗 POST : créer un véhicule
export async function POST(req: Request) {
  try {
    const body = await req.json() 
    const vehicle = await prisma.vehicle.create({ data: body })  
    return NextResponse.json(vehicle, { status: 201 })  
  } catch (error) {
    console.error('Erreur POST /vehicle:', error)
    return NextResponse.json({ error: 'Impossible de créer le véhicule' }, { status: 500 })
  }
}

