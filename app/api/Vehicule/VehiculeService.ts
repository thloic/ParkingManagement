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

// 🚗 GET : récupérer un véhicule par son ID
export async function GET_BY_ID(_: Request, { params }: { params: { id: string } }) {
  try {
    const vehicle = await prisma.vehicle.findUnique({ where: { id: params.id } })
    if (!vehicle) {
      return NextResponse.json({ error: 'Véhicule non trouvé' }, { status: 404 })
    }
    return NextResponse.json(vehicle)
  } catch (error) {
    console.error('Erreur GET /vehicle/:id:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

// 🚗 PUT : mettre à jour un véhicule
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json()
    const updated = await prisma.vehicle.update({
      where: { id: params.id },
      data: body,
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error('Erreur PUT /vehicle/:id:', error)
    return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })
  }
}

// 🚗 DELETE : supprimer un véhicule
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.vehicle.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Véhicule supprimé' })
  } catch (error) {
    console.error('Erreur DELETE /vehicle/:id:', error)
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
  }
}

