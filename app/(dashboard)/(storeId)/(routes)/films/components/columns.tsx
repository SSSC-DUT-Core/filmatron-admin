"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"
import { FilmEntity } from "@/graphql/generated";



import React from 'react';
import { formatDateToMMMDDYYYY } from '@/lib';

export const columns: ColumnDef<FilmEntity>[]  = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'directors',
    header: 'Directors',
    cell: ({ row }) => <span>{row.original.directors.join(', ')}</span>,
  },
  {
    accessorKey: 'genres',
    header: 'Genres',
    cell: ({ row }) => <span>{row.original.genres.join(', ')}</span>,
  },
  {
    accessorKey: 'releaseDate',
    header: 'Release Date',
    cell: ({ row }) => <span>{formatDateToMMMDDYYYY(row.original.releaseDate)}</span>,
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
  },
  {
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
  // Add more columns as needed
];
