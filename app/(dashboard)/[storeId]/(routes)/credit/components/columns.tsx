"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type CreditColumn = {
	id: string;
  addressUser: string;
	event: string;
	amount: number;
	pricePerCredit: number;
  total: number;
	createdAt: string;
};

export const columns: ColumnDef<CreditColumn>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
	},
	{
		accessorKey: 'addressUser',
		header: 'Address User',
	},
	{
		accessorKey: 'event',
		header: 'Event',
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
	},
	{
		accessorKey: 'pricePerCredit',
		header: 'Price Per Credit',
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
