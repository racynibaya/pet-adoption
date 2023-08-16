'use client';

import axios from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import useCreate from '@/hooks/use-create';
import { Input } from '@/components/ui/input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import Modal from '../ui/modal';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

import { Plus, Cat } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  species: z.string().min(1, { message: 'Species is required' }),
  breed: z.string().min(1, { message: 'Breed is required' }),
  age: z.coerce.number().gte(0, { message: 'Age should be positive' }),
  gender: z.string(),
  color: z.string(),
  size: z.string(),
  description: z.string(),
  image_url: z.string().optional(),
  adoption_status: z.string(),
  adoption_fee: z.coerce.number().positive(),
});

type CreateFormValues = z.infer<typeof formSchema>;

const CreatePetModal = () => {
  const router = useRouter();
  const onClose = useCreate(state => state.onClose);

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      age: 0,
      gender: '',
      color: '',
      size: '',
      adoption_status: '',
      adoption_fee: 0,
      description: '',
    },
  });

  const onSubmit = async (data: CreateFormValues) => {
    console.log('click');
    console.log(data);
    try {
      await axios.post(`/api/pet`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      onClose();
      form.reset();
      router.refresh();
      toast.success('Pet is created.');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };
  const petStore = useCreate();

  return (
    <Modal
      trigger={
        <Button
          variant='outline'
          className='flex gap-1  rounded-full py-2 px-4 fixed bottom-5 right-10'
        >
          <Cat />
          <Plus className=' absolute top-0 -right-2' />
        </Button>
      }
      isOpen={petStore.isOpen}
      onClose={petStore.onClose}
      onOpen={petStore.onOpen}
      title='Add pet'
      description='Fill the information'
    >
      <Form {...form}>
        <div className='mt-3'>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-2'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder='Name' {...field} />
                    {/* Your form field */}
                  </FormControl>
                </FormItem>
              )}
            />
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='species'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Species' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='breed'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Breed' {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='age'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='number' placeholder='Age' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='M | F' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='Color' {...field} />
                    </FormControl>
                    <FormDescription />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='adoption_status'
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='status' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='available'>Available</SelectItem>
                        <SelectItem value='adopted'>Adopted</SelectItem>
                        <SelectItem value='pending'>Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='adoption_fee'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder='$' />
                    </FormControl>
                    <FormDescription />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='size'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder='size' {...field} />
                    </FormControl>
                    <FormDescription />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder='Pet description' />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
            <div className='flex gap-4 mt-4 justify-end'>
              <Button>Create</Button>
              <Button variant='outline' onClick={() => form.reset()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </Modal>
  );
};

export default CreatePetModal;
