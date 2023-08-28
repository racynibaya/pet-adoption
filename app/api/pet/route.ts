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

    let imageUrl = body.image_url;

    if (!imageUrl) imageUrl = 'test';

    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }

    const formattedAge = Number(age);
    const formattedAdoptionFee = Number(adoption_fee);

    console.log('[LINE 31]', body);

    if (
      !name ||
      !species ||
      !breed ||
      !formattedAge ||
      !gender ||
      !color ||
      !size ||
      !adoption_status ||
      !formattedAdoptionFee ||
      !description ||
      !imageUrl
    ) {
      return new NextResponse('Invalid input', { status: 400 });
    }

    const pet = await prismadb.pet.create({
      data: {
        name,
        species,
        breed,
        age: formattedAge,
        gender,
        color,
        size,
        adoption_status,
        adoption_fee: formattedAdoptionFee,
        description,
        image_url: imageUrl,
      },
    });

    return NextResponse.json(pet);

    // return NextResponse.json(pet);
  } catch (error) {
    console.log('{PET_POST', error);
    return new NextResponse('Internal error', { status: 500 });
  }
}
