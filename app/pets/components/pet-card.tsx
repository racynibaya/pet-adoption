'use client';

import { MouseEvent } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { usePathname, useRouter } from 'next/navigation';

export type AdoptionType = 'available' | 'pending' | 'adopted';
interface PetCardProps {
  id: string;
  name: string;
  species: string;
  age: number;
  description: string | null;
  imageUrl?: string;
  adoptionStatus: AdoptionType;
}

const PetCard: React.FC<PetCardProps> = ({
  id,
  name,
  species,
  age,
  description,
  imageUrl,
  adoptionStatus,
}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('CLick');
    router.push(`${pathname}/${id}`);
  };

  return (
    <Card>
      <CardHeader>
        {/* <Image fill src={imageUrl!} alt='Main Image' /> */}
      </CardHeader>
      <CardContent>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <div className='flex justify-between'>
          <span>{age}</span>
          <span>{species}</span>
        </div>
      </CardContent>
      <CardFooter className='flex justify-between items-center'>
        <p>{adoptionStatus}</p>

        <Button onClick={handleClick}>Adopt</Button>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
