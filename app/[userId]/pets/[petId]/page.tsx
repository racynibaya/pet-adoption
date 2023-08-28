import prismadb from '@/lib/prismadb';

const PetPage = async ({ params }: { params: { petId: string } }) => {
  const pet = await prismadb.pet.findUnique({
    where: {
      id: params.petId,
    },
  });
  return <div>{pet?.name}</div>;
};

export default PetPage;
