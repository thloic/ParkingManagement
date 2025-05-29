import { NextResponse } from "next/server";

// Rechercher un parking par ID
export async function GET_BY_ID(_: Request, { params }: { params: { id: string } }) {
    try {
        const parking = await prisma.parking.findUnique({ where: { id: params.id } });
        if (!parking) {
            return NextResponse.json({ error: 'Parking non trouvé par son ID' }, { status: 404 });
        }
        return NextResponse.json(parking);
    } catch (error) {
        console.log('Erreur lors de la récupération du parking par ID', error);
        return NextResponse.json({ status: 500 });
    }
}

// Mettre à jour un parking
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const body = await req.json();
        const updatedParking = await prisma.parking.update({
            where: { id: params.id },
            data: body,
        });
        return NextResponse.json(updatedParking);
    } catch (error) {
        console.error('Erreur PUT /parking/:id:', error);
        return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 });
    }
}

// Supprimer un parking
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        await prisma.parking.delete({
            where: { id: params.id }
        });
        return NextResponse.json({ message: 'Parking supprimé' });
    } catch (error) {
        console.error('Erreur DELETE /parking/:id:', error);
        return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
    }
}
