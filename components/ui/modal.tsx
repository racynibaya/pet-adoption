'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ModalProps {
  trigger: React.ReactNode;
  isOpen: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: () => void;
  onOpen: () => void;
}

const Modal: React.FC<ModalProps> = ({
  trigger,
  title,
  description,
  children,
  isOpen,
  onClose,
  onOpen,
}) => {
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    } else {
      onOpen();
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
