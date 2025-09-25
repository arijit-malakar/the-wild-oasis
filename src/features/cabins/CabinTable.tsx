import type { CabinType } from "./cabinType";

import { useSearchParams } from "react-router-dom";

import { useCabins } from "./useCabins";

import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import CabinRow from "./CabinRow";

const CabinTable = () => {
  const { isPending, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  if (!cabins?.length) return <Empty resourceName="cabins" />;

  // Filtering cabins
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  // Sorting cabins
  const sortByValue = searchParams.get("sortBy") || "name-asc";
  const [fieldStr, order] = sortByValue.split("-");
  const field = fieldStr as keyof CabinType;
  const modifier = order === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins?.sort(
    (a, b) => ((a[field] as never) - (b[field] as never)) * modifier
  );

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedCabins ?? []}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
