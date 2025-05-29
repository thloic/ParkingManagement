import { NextResponse } from "next/server"
import prisma from '@/lib/prisma';


// recuperation de tous les tickets
 export async function GET(){
    try{
    const tickets = await prisma.ticket.findMany()
    return NextResponse.json(tickets)
    }
    catch (error){
        console.log('erreur lors de la recuperation de Tickets',error)
        return NextResponse.json({
            status: 500
        })
    }
 }

 //creer un ticket
 export async function POST(req: Request){
    try {
        const body = await req.json()
        const ticket = await  prisma.ticket.create({data : body})
        return NextResponse.json(ticket,{status:201})
    }
    catch(error){
        console.log('erreur lors de la creation de ticket',error)
        return NextResponse.json({status: 500})
    }
 }

 