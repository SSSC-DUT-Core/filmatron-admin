import { format } from "date-fns";

import { CreditsClient } from "./components/client";

const SizesPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CreditsClient data={[]} />
      </div>
    </div>
  );
};

export default SizesPage;
