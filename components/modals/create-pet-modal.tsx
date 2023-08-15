'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

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

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  species: z.string().min(1, { message: 'Species is required' }),
  breed: z.string().min(1, { message: 'Breed is required' }),
  age: z.number().nonnegative(),
  gender: z.string(),
  color: z.string(),
  size: z.string(),
  description: z.string(),
  image_url: z.string(),
  adoption_status: z.string(),
  adoption_fee: z.number(),
});

type CreateFormValues = z.infer<typeof formSchema>;

const CreatePetModal = () => {
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
    },
  });

  const onSubmit = async (data: CreateFormValues) => {
    console.log(data);
  };
  const petStore = useCreate();

  return (
    <Modal
      trigger='Add Pet'
      isOpen={petStore.isOpen}
      onClose={petStore.onClose}
      title='Add pet'
      description='Fill the information'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                  {/* Your form field */}
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />

          <div className='flex gap-2'>
            <FormField
              control={form.control}
              name='species'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Species</FormLabel>
                  <FormControl>
                    <Input placeholder='Species' {...field} />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='breed'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input placeholder='Species' {...field} />
                  </FormControl>
                  <FormDescription />
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
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input type='number' placeholder='Age' {...field} />
                    {/* Your form field */}
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='gender'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <Input placeholder='M | F' {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='color'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input placeholder='Color' {...field} />
                    {/* Your form field */}
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
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Input placeholder='Dog size' {...field} />
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
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Adoption status' />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='adoption_fee'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adoption Fee</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='$' />
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
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder='Pet description' />
                </FormControl>
                <FormDescription />
              </FormItem>
            )}
          />

          <div className='flex justify-end gap-2'>
            <Button type='submit'>Create</Button>
            <Button variant='outline' onClick={() => form.reset()}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default CreatePetModal;
