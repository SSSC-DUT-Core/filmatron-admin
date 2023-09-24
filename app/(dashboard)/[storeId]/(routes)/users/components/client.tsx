"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, UserColumn } from './columns';

interface UsersClientProps {
	data: UserColumn[];
}

export const UsersClient: React.FC<UsersClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  function generateRandomUser(id: number) {
		const firstNameList = [
			'John',
			'Jane',
			'Michael',
			'Emily',
			'David',
			'Sarah',
			'Daniel',
			'Olivia',
			'William',
			'Sophia',
		];
		const lastNameList = [
			'Smith',
			'Johnson',
			'Brown',
			'Davis',
			'Jones',
			'Wilson',
			'Clark',
			'Hall',
			'Walker',
			'Anderson',
		];
		const roles = ['user', 'film maker'];
		const states = ['active', 'inactive'];
		const actions = ['edit', 'delete'];

		const randomFirstName =
			firstNameList[Math.floor(Math.random() * firstNameList.length)];
		const randomLastName =
			lastNameList[Math.floor(Math.random() * lastNameList.length)];
		const randomUsername = `${randomFirstName.toLowerCase()}.${randomLastName.toLowerCase()}`;
		const randomEmail = `${randomUsername}@example.com`;
		const randomRole = roles[Math.floor(Math.random() * roles.length)];
		const randomState = states[Math.floor(Math.random() * states.length)];

		return {
			id: id.toString(),
			username: randomUsername,
			email: randomEmail,
			firstName: randomFirstName,
			lastName: randomLastName,
			role: randomRole,
			state: randomState,
			actions: actions,
		};
	}

	function generateFakeUsers(count: number) {
		const fakeUsers = [];
		for (let i = 1; i <= count; i++) {
			fakeUsers.push(generateRandomUser(i));
		}
		return fakeUsers;
	}

	const fakeUsers = generateFakeUsers(30);


  return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Users (${fakeUsers.length})`}
					description="Manage users for your website"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/users/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="label" columns={columns} data={fakeUsers} />
			<Heading title="API" description="API Calls for Users" />
			<Separator />
			<ApiList entityName="users" entityIdName="userId" />
		</>
	);
};
