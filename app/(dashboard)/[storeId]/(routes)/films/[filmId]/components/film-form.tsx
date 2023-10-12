"use client"

import * as z from "zod"
import axios from "axios"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from "@/components/ui/image-upload"
import { Checkbox } from "@/components/ui/checkbox"
import { useActiveStore } from '../../../../../../../hooks/use-active-store';
import { useCreateFilmMutation, CreateFilmDto } from '@/graphql/generated/index';

// const validGenres = Object.values(FilmGenre).map((genre) => genre.toString());
const formSchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
  description: z.string(),
  duration: z.coerce.number(),
  releaseDate: z.string(),
  genres: z.array(z.string()),
  stars: z.array(z.string()),
  directors: z.union([z.array(z.string()), z.string()]),
  topCasts: z.union([z.array(z.string()), z.string()]),
  endDateSubscriber: z.string(),
});

type FilmFormValues = z.infer<typeof formSchema>

interface FilmFormProps {
  initialData: {
    images: any[]
  } | null;
  categories: any[];
  colors: any[];
  sizes: any[];
};

export const FilmForm: React.FC<FilmFormProps> = ({
  initialData,
  categories,
  sizes,
  colors
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Film' : 'Create Film';
  const description = initialData ? 'Edit a Film.' : 'Add a new Film';
  const toastMessage = initialData ? 'Film updated.' : 'Film created.';
  const action = initialData ? 'Save changes' : 'Create';
  const  [createFilm] = useCreateFilmMutation();
  const defaultValues = initialData ? {
    ...initialData,
    price: parseFloat(String('')),
  } : {
    name: '',
    images: [],
  
  }

  const form = useForm<FilmFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: FilmFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storeId}/films/${params.filmId}`, data);
      } else {
        await createFilm(
          {
            variables: {
              input: {
                "avatar": "created",
                "background": "created",
                "name": "Film Name",
                "description": "Film Description",
                "duration": 120,
                "releaseDate": "2023-10-04",
                "genres": ["ADVENTURES"],
                "stars": ["Actor 1", "Actor 2"],
                "directors": ["Director 1"],
                "topCasts": [{"name": "Actor 3", "avatar": "https://placebear.com/g/200/200"}],
                "endDateSubscriber": "2023-11-04T00:00:00Z"
            }
            }
          }
        )
      }
      router.refresh();
      router.push(`/${params.storeId}/films`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error('Something went wrong.', error);
      toast.success(toastMessage);

    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/films/${params.filmId}`);
      router.refresh();
      router.push(`/${params.storeId}/films`);
      toast.success('Film deleted.');
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title="Create Film" description="Add a new Film" />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <div className="md:grid md:grid-cols-3 gap-8">
                <div>
                  <FormLabel>Name</FormLabel>
                  <Input
                    disabled={false} // Set to true if needed
                    placeholder="Film name"
                    {...field}
                  />
                  <FormMessage />
                </div>
              </div>
            )}
          />
               <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <div className="md:grid md:grid-cols-3 gap-8">
                <div>
                  <FormLabel>Description</FormLabel>
                  <Input
                    disabled={false} // Set to true if needed
                    placeholder="Film descrption"
                    {...field}
                  />
                  <FormMessage />
                </div>
              </div>
            )}
          />
               <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <div className="md:grid md:grid-cols-3 gap-8">
                <div>
                  <FormLabel>Duration</FormLabel>
                  <Input
                    type="number"
                    disabled={false} // Set to true if needed
                    placeholder="Film descrption"
                    {...field}
                  />
                  <FormMessage />
                </div>
              </div>
            )}
          />
             <FormField
            control={form.control}
            name="releaseDate"
            render={({ field }) => (
              <div className="md:grid md:grid-cols-3 gap-8">
                <div>
                  <FormLabel>Release Date</FormLabel>
                  <Input
                    disabled={false} // Set to true if needed
                    placeholder="Film release date"
                    {...field}
                  />
                  <FormMessage />
                </div>
              </div>
            )}
          />
        <FormField
              control={form.control}
              name="genres"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genres</FormLabel>
                  <Input
                    disabled={false} // Set to true if needed
                    placeholder="Film stars<"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />        
               <FormField
            control={form.control}
            name="stars"
            render={({ field }) => (
              <div className="md:grid md:grid-cols-3 gap-8">
                <div>
                  <FormLabel>Stars</FormLabel>
                  <Input
                    disabled={false} // Set to true if needed
                    placeholder="Film stars<"
                    {...field}
                  />
                  <FormMessage />
                </div>
              </div>
            )}
          />
              <FormField
            control={form.control}
            name="directors"
            render={({ field }) => (
              <div className="md:grid md:grid-cols-3 gap-8">
                <div>
                  <FormLabel>Directors</FormLabel>
                  <Input
                    disabled={false} // Set to true if needed
                    placeholder="Film directors"
                    {...field}
                  />
                  <FormMessage />
                </div>
              </div>
            )}
          />
          <FormField
  control={form.control}
  name="topCasts"
  render={({ field }) => (
    <div className="md:grid md:grid-cols-3 gap-8">
      <div>
        <FormLabel>Top Casts</FormLabel>
        {Array.isArray(field.value) ? (
          // If it's an array, map through the values
          field.value.map((cast, index) => (
            <div key={index}>
              <Input
                disabled={false} // Set to true if needed
                placeholder={`Top Cast ${index + 1}`}
                value={cast}
              />
              <FormMessage />
            </div>
          ))
        ) : (
          // If it's a single string, render a single input field
          <Input
            disabled={false} // Set to true if needed
            placeholder="Top Cast"
            {...field}
          />
        )}
      </div>
    </div>
  )}
/>

      <FormField
            control={form.control}
            name="endDateSubscriber"
            render={({ field }) => (
              <div className="md:grid md:grid-cols-3 gap-8">
                <div>
                  <FormLabel>End Date Subscriber</FormLabel>
                  <Input
                    disabled={false} // Set to true if needed
                    placeholder="Film end date subscriber"
                    {...field}
                  />
                  <FormMessage />
                </div>
              </div>
            )}
          />
          <Button className="ml-auto" type="submit">
            Create
          </Button>
        </form>
      </Form>
    </>
  );
};
