import { format } from "date-fns";

import { formatter } from "@/lib/utils";

import { DropClient } from './components/client';


const OrdersPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<DropClient data={[]} />
			</div>
		</div>
	);
};

export default OrdersPage;
