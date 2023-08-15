'use client';

import CreatePetModal from '@/components/modals/create-pet-modal';
import { useEffect, useState } from 'react';

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreatePetModal />
    </>
  );
};

export default ModalProvider;
