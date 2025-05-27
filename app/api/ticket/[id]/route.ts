import { NextResponse } from "next/server"

//rechercher par id 
export async function GET_BY_ID (_: Request, { params }: { params: { id: string } }){

    try
    {
    const ticket = await prisma.ticket.findUnique({ where: { id: params.id}})
    if (
        !ticket
    ){
        return NextResponse.json({error: 'Ticket non trouve par son id'}, {status:404})
    }

    }
    catch(error){
        console.log('erreur lors de la mise a jour du ticket',error)
        return NextResponse.json({status: 500})
 }
}

//mettre a jour
export async function PUT(req: Request, {params}: {params : {id: string}}){
    try{
        const body = await req.json()
        const updated = await prisma.ticket.update({
            where : { id: params.id},
            data: body,
        })
        return NextResponse.json(updated)

    }catch(error){
        console.error('Erreur PUT /vehicle/:id:', error)
        return NextResponse.json({ error: 'Erreur lors de la mise à jour' }, { status: 500 })    }

}

//supprimer
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try{
        await prisma.ticket.delete({
            where: {id: params.id}
        })
        return NextResponse.json({ message: 'Véhicule supprimé' })
    }
    catch (error) {
        console.error('Erreur DELETE /vehicle/:id:', error)
        return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 })
      }
}
