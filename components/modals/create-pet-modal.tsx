'use client';

import axios from 'axios';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import useCreate from '@/hooks/use-create';
import { toast } from 'react-hot-toast';

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
import ImageUpload from '../ui/image-upload';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  species: z.string().min(1, { message: 'Species is required' }),
  breed: z.string().min(1, { message: 'Breed is required' }),
  age: z.string(),
  gender: z.string(),
  color: z.string(),
  size: z.string(),
  description: z.string(),
  image_url: z.string().optional(),
  adoption_status: z.string(),
  adoption_fee: z.string(),
});

type CreateFormValues = z.infer<typeof formSchema>;

const CreatePetModal = () => {
  const router = useRouter();
  const params = useParams();

  // to control the opening and closing of the create pet modal
  const petStore = useCreate();

  const form = useForm<CreateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      species: '',
      breed: '',
      age: '',
      gender: '',
      color: '',
      size: '',
      adoption_status: '',
      adoption_fee: '',
      description: '',
      image_url: '',
    },
  });

  const onSubmit = async (data: CreateFormValues) => {
    console.log('click');
    console.log(data);
    try {
      await axios.post(`/api/pets`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      petStore.onClose();
      form.reset();
      router.refresh();
      toast.success('Pet is created.');
      router.push(`/${params.userId}/pets`);
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  if (!params.userId) {
    return null;
  }

  return (
    <Modal
      trigger={
        <div className='flex gap-1 w-8 h-8 rounded-full p-7 bg-red-100 fixed bottom-5 right-5 items-center justify-center shadow-2xl transition duration-500 hover:-translate-y-1'>
          <span className='relative transition duration-300 text-slate-600 '>
            <Cat className=' ' />
            <Plus className='absolute font-bold w-4 h-4 -top-1 z-20 -right-3 ' />
          </span>
        </div>
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
              name='image_url'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <ImageUpload
                        value={field.value ? field.value : ''}
                        onChange={url => field.onChange(url)}
                        onRemove={() => field.onChange('')}
                      />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
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
              <Button
                variant='outline'
                onClick={() => {
                  form.reset();
                  petStore.onClose();
                }}
              >
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
