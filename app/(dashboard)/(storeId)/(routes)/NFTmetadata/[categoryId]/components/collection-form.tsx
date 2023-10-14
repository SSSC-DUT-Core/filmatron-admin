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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/heading"
import { AlertModal } from "@/components/modals/alert-modal"
import { CreateCompressedNftMetadata, useCreateCompressedNftMetadataMutation } from "@/graphql/generated"
import AutoForm, { AutoFormInputComponentProps, AutoFormSubmit } from "@/components/ui/auto-form"
import ImageUpload from "@/components/ui/image-upload"
import { config } from "@/src/config"
import FileUploadInput from "@/components/ui/FileUploadPreviewInput"

type CompressedNFTMetadataValues = CreateCompressedNftMetadata

interface CompressedNFTMetadataProps {
  initialData: CompressedNFTMetadataValues | null;
};

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  symbol: z.string().nonempty("Symbol is required"),
  uri: z.string().url(),
});

export const CompressedNFTMetadata = ({
  initialData,
}: CompressedNFTMetadataProps) => {
  const searchParams = useSearchParams();
  const filmId = Number(searchParams.get('filmId'));

  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const title = initialData ? 'Edit NFT MetaData' : 'Create NFT MetaData';
  const description = initialData ? 'Edit a NFT MetaData.' : 'Add a new NFT MetaData';
  const toastMessage = initialData ? 'NFT MetaData updated.' : 'NFT MetaData created.';
  const action = initialData ? 'Save changes' : 'Create';

  const [createCollectionMutation] = useCreateCompressedNftMetadataMutation(
    {
      "context" : {
          "authorization":localStorage.getItem("access_token")}
      }
  );
 

  const onSubmit = async (data: CreateCompressedNftMetadata) => {
    setLoading(true);
    try {
      if (initialData) {
        // Handle editing here if needed
      } else {
        setLoading(true);
        await createCollectionMutation({
					variables: {
						input: {
              ...data
						},
					},
					context: {
						headers: {
							Authorization: localStorage.getItem('access_token'),
						},
					},
					onCompleted: () => {
						setLoading(false);
						toast.success(toastMessage);
						router.push(`/films`);
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
      await axios.delete(`/api/categories/${params.CollectionId}`);
      router.refresh();
      router.push(`/categories`);
      toast.success("Collection deleted.");
    } catch (error: any) {
      toast.error("Make sure you removed all products using this Collection first.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };


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
      <AutoForm
      onSubmit={(data)=>{
          onSubmit({
            filmId: filmId.toString(),
            ...data
          })
      }}
      fieldConfig={{
        uri: {
          fieldType: ({
            label,
        isRequired,
        field,
        fieldConfigItem,
        fieldProps,
          }: AutoFormInputComponentProps) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
               <FormLabel>
              {label}
              {isRequired && <span className="text-destructive"> *</span>}
            </FormLabel>
                <FormControl
                >

               <FileUploadInput
               value={field.value}
               onFieldChange={field.onChange}
               />
                </FormControl>

                <div className="space-y-1 leading-none">
         
            {fieldConfigItem.description && (
              <FormDescription>{fieldConfigItem.description}</FormDescription>
            )}
          </div>
            </FormItem>
          ),
        },
      }}
      formSchema={formSchema}

    >
 
    <AutoFormSubmit>Create NFT Metadata</AutoFormSubmit>
   
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