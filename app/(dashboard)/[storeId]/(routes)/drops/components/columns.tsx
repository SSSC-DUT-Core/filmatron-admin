"use client"

import { ColumnDef } from "@tanstack/react-table"

export type DropColumn = {
	id: string;
	dropName: string;
	blockchain: string;
	startDate: string;
	supply: string;
	status: string;
};

export const columns: ColumnDef<DropColumn>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'dropName',
		header: 'Drop name',
	},
	{
		accessorKey: 'blockchain',
		header: 'Blockchain',
	},
	{
		accessorKey: 'startDate',
		header: 'Start Date',
	},
	{
		accessorKey: 'supply',
		header: 'Supply',
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
];
