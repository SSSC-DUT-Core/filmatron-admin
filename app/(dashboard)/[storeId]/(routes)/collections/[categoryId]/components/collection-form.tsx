"use client"

import * as z from "zod"
import axios from "axios"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Trash } from "lucide-react"
import { useParams, useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { useCreateCollectionMutation } from "@/graphql/generated"
import { CreateCollectionNftDto, CollectionMetadataDto } from "@/graphql/generated"

type CollectionFormValues = CreateCollectionNftDto

interface CollectionFormProps {
  initialData: CollectionFormValues | null;
};

export const CollectionForm = ({
  initialData,
}: CollectionFormProps) => {
  const searchParams = useSearchParams();
  const filmId = Number(searchParams.get('filmId'));

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Collection' : 'Create Collection';
  const description = initialData ? 'Edit a Collection.' : 'Add a new Collection';
  const toastMessage = initialData ? 'Collection updated.' : 'Collection created.';
  const action = initialData ? 'Save changes' : 'Create';

  const form = useForm<CollectionFormValues>({
    // resolver: zodResolver(formSchema), // You can add zodResolver here if needed
    defaultValues: initialData || {
      metadata: {
        name: "", // Initialize with empty values
        symbol: "",
        uri: "",
      },
    },
  });
  const [createCollectionMutation] = useCreateCollectionMutation(
    {
      "context" : {
          "authorization":localStorage.getItem("access_token")}
      }
  );

  const onSubmit = async (data: CreateCollectionNftDto) => {
    setLoading(true);
    try {
      if (initialData) {
        // Handle editing here if needed
      } else {
        setLoading(true);
        await createCollectionMutation({
					variables: {
						input: {
							filmId,
							metadata: data.metadata,
						},
					},
					context: {
						headers: {
							Authorization: localStorage.getItem('access_token'),
						},
					},
					onCompleted: () => {
						setLoading(false);
						router.push(`/${params.storeId}/categories`);
						toast.success(toastMessage);
					},
				});
      }
    } catch (error: any) {
      toast.error('Something went wrong');
			setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/categories/${params.CollectionId}`);
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Collection deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this Collection first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const metadataKeys: (keyof CollectionMetadataDto)[] = ["name", "symbol", "uri"];

  const metadataFields = metadataKeys.map((fieldName) => {
    const capitalizedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
  
    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={`metadata.${fieldName}`}
        rules={{ required: true }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{capitalizedFieldName}</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder={`Enter ${capitalizedFieldName}`} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  });

  return (
    <>
      <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading} />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button disabled={loading} variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            {metadataFields}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};