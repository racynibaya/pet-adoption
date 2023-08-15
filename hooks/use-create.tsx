import { create } from 'zustand';

interface useCreateModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}
const useCreate = create<useCreateModalStore>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreate;
