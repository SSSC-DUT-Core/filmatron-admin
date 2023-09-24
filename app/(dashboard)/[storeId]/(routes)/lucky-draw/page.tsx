import { format } from "date-fns";

import { ColorColumn } from "./components/columns"
import { ColorClient } from "./components/client";

const ColorsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={[]} />
      </div>
    </div>
  );
};

export default ColorsPage;
