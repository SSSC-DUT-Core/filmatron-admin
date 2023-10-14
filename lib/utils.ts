import { FilmEntity, GetFilmsQuery } from "@/graphql/generated";
import { config } from "@/src/config";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
export const getFilmRoute = (id: string) => {
  return `film/${id}`
}
export function mapFilmsFromGraphQLResponse(data?: GetFilmsQuery): FilmEntity[] | [] {
  if (!data || !data.getFilms || !data.getFilms.edges) {
    return [];
  }

  return data.getFilms.edges.map((filmEdge) => filmEdge.node);
}
export async function uploadFile(file: File, onUploadSuccess?: (url: string) => void) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${config.restfulUrl}/upload`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      onUploadSuccess?.(data.secure_url ?? data.url);
    } else {
      console.error("Error uploading file");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
}
export const getClientFilmDetailUrlById = (id: string) => {
  return `${config.clientDomain}/film/${id}`
}

