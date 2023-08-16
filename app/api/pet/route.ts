import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      species,
      breed,
      age,
      gender,
      color,
      size,
      adoption_status,
      adoption_fee,
      description,
    } = body;

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    if (
      !name ||
      !species ||
      !breed ||
      !age ||
      !gender ||
      !color ||
      !size ||
      !adoption_status ||
      !adoption_fee ||
      !description
    ) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    console.log(Number(age));

    const pet = await prismadb.pet.create({
      data: {
        name,
        species,
        breed,
        age: Number(age),
        gender,
        color,
        size,
        adoption_status,
        adoption_fee: Number(adoption_fee),
        description,
        image_url: 'asdfa',
      },
    });

    return NextResponse.json(pet);

    // return NextResponse.json(pet);
  } catch (error) {
    console.log('{PET_POST', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
