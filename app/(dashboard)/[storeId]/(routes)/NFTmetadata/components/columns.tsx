"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type CollectionColumn = {
	id: string;
	name: string;
	description: string;
	mint: string;
	tokenAccount: string;
	metadataAccount: string;
	masterEditionAccount: string;
	createdAt: string;
	actions: string[];
};

export const columns: ColumnDef<CollectionColumn>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'name',
		header: 'Name',
	},
	{
		accessorKey: 'description',
		header: 'Description',
	},
	{
		accessorKey: 'tokenAccount',
		header: 'Token Account',
	},
	{
		accessorKey: 'metadataAccount',
		header: 'Metadata Account',
	},
	{
		accessorKey: 'masterEditionAccount',
		header: 'Master Edition Account',
	},
	{
		accessorKey: 'createdAt',
		header: 'Date',
	},
	{
		id: 'actions',
		cell: ({ row }) => <CellAction data={row.original} />,
	},
];
