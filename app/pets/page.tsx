import prismadb from '@/lib/prismadb';
import PetCard, { AdoptionType } from './components/pet-card';

const PetsPage = async () => {
  const pets = await prismadb.pet.findMany({});

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4'>
      {pets.map(pet => (
        <PetCard
          id={pet.id}
          key={pet.id}
          name={pet.name}
          description={pet.description}
          age={pet.age}
          species={pet.species}
          adoptionStatus={pet.adoption_status as AdoptionType}
        />
      ))}
    </div>
  );
};

export default PetsPage;
