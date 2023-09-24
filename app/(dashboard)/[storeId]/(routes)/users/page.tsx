import { format } from "date-fns";

import { UserColumn } from './components/columns';
import { UsersClient } from './components/client';

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<UsersClient data={[]} />
			</div>
		</div>
	);
};

export default BillboardsPage;
