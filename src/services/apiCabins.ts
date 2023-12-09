import { CabinType } from "../features/cabins/cabinTypes";

export const getCabins = async () => {
  const res = await fetch("/api/cabins");

  if (!res.ok) {
    throw new Error("Unable to load cabins data");
  }

  const body = await res.json();
  return body.data.cabins;
};

export const createCabin = async (newCabin: CabinType) => {
  const formData = new FormData();
  Object.entries(newCabin).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const res = await fetch("/api/cabins", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Could not create cabin");
  }

  const body = await res.json();
  return body.data;
};

export const deleteCabin = async (id: string) => {
  const res = await fetch(`/api/cabins/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error("Unable to delete cabin");
  }
};
