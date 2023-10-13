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
import { DateInput } from "@/components/ui/date-input"
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form"

// const validGenres = Object.values(FilmGenre).map((genre) => genre.toString());
const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.coerce.number(),
  releaseDate: z.coerce.date(),
  genres: z.array(    z.object({
      name: z.string(),
    })).min(1),
  stars: z.array(    z.object({
      name: z.string(),
    })).min(1),
  directors: z.array(    z.object({
      name: z.string(),
    })).min(1),
  topCasts: z.array(
    z.object({
      name: z.string(),
      avatar: z.string().url(), 
    })
  ),
  background: z.string(),
  avatar: z.string(),
  endDateSubscriber: z.coerce.date(),
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


  const onSubmit = async (data: FilmFormValues) => {
    try {
      setLoading(true);
  
  
      const input = {
        avatar: data.avatar,
        background: data.background,
        name: data.name,
        description: data.description,
        duration: data.duration,
        releaseDate: data.releaseDate,
        genres: data.genres.map(item=>item.name),
        stars: data.stars.map(item=>item.name),
        directors: data.directors.map(item=>item.name),
        topCasts: data.topCasts,
        endDateSubscriber: data.endDateSubscriber,
      };
      await createFilm({
        variables: { input },
        context: {
          headers: {
              Authorization: localStorage.getItem("access_token"),
          },
      },
      });
  
      router.refresh();
      router.push(`/films`);
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      toast.success(toastMessage);
    }
  };
  

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/films/${params.filmId}`);
      router.refresh();
      router.push(`/films`);
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
      <AutoForm
      onSubmit={(data)=>{
          onSubmit(data)
      }}
      formSchema={formSchema}

    >
 
    <AutoFormSubmit>Create Film</AutoFormSubmit>
   
      <p className="text-gray-500 text-sm">
        By submitting this form, you agree to our{" "}
        <a href="#" className="text-primary underline">
          terms and conditions
        </a>
        .
      </p>
    </AutoForm>
    </>
  );
};
