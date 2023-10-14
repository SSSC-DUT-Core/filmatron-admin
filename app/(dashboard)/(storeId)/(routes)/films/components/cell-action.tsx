"use client";

import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { FilmEntity } from "@/graphql/generated";
import {useToggle} from 'usehooks-ts';
import { ShareQRCode } from "@/components/QRCode";
import { Modal } from "@/components/ui/modal";
import { getClientFilmDetailUrlById } from "@/lib";

interface CellActionProps {
  data: FilmEntity;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const [isShareShown, toggleIsShareShown] = useToggle();
  const onConfirm = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/products/${data.id}`);
      toast.success('Product deleted.');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(getClientFilmDetailUrlById(id));
    toggleIsShareShown();
    toast.success('Film campaign url copied to clipboard.');
  }

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
         <Modal
                title="Your QR code:"
                description="Share the movie with everyone."
                isOpen={isShareShown}

                onClose={toggleIsShareShown}
            >
              <div className="flex justify-center flex-col align-center items-center">
                            <ShareQRCode
                    data={data}
                    />
                    <Button
                        onClick={toggleIsShareShown}
                        className="w-60 mt-8 hover:bg-brand rounded-full transform active:scale-75 transition-transform hover:scale-110 duration-500 ease-out cursor-pointer flex flex-row justify-center items-center bg-brand text-black"
                    >
                        <p className="text-lg font-semibold">Close</p>
                    </Button>
                </div>
        
                </Modal>
     
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data.id)}
          >
            <Copy className="mr-2 h-4 w-4" /> Share to social
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/collections/new?filmId=${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Create collection
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/NFTmetadata/new?filmId=${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Create NFT Metadata
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
