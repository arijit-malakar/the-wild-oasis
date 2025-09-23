export type CabinType = {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
};

export type CreateEditCabinArgs = {
  newCabin: Omit<CabinType, "image"> & { image: File };
  id?: CabinType["id"];
};
