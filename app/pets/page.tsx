import prismadb from '@/lib/prismadb';
import PetCard, { AdoptionType } from './components/pet-card';

const PetsPage = async () => {
  const pets = await prismadb.pet.findFirst({
    where: {
      species: 'Dog',
    },
  });

  console.log(pets);

  return (
    <div className='flex flex-col gap-4 p-4'>
      {/* {pets.map(pet => (
        <PetCard
          id={pet.id}
          key={pet.id}
          name={pet.name}
          description={pet.description}
          age={pet.age}
          species={pet.species}
          adoptionStatus={pet.adoptionStatus as AdoptionType}
        />
      ))} */}
    </div>
  );
};

export default PetsPage;
