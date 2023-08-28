'use client';

import { MouseEvent } from 'react';
import useCreate from '@/hooks/use-create';
import { CldUploadWidget } from 'next-cloudinary';
import { useEffect, useState } from 'react';
import { Button } from './button';

interface ImageUploadProps {
  onChange: (url: string) => void;
  onRemove: () => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onCloseModal = useCreate(state => state.onClose);
  const onOpenModal = useCreate(state => state.onOpen);

  const onUpload = (result: any) => {
    console.log(result);
    onOpenModal();
  };

  return (
    <CldUploadWidget onUpload={onUpload} uploadPreset='bacsfqoq'>
      {({ open }) => {
        const onClick = (e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          open();
          onCloseModal();
        };
        return <Button onClick={onClick}>Upload an Image</Button>;
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
