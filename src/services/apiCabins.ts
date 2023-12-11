import { CabinType } from "../features/cabins/cabinTypes";

export const getCabins = async () => {
  const res = await fetch("/api/cabins");

  if (!res.ok) {
    throw new Error("Unable to load cabins data");
  }

  const body = await res.json();
  return body.data.cabins;
};

export const createEditCabin = async (newCabin: CabinType, id?: string) => {
  const formData = new FormData();
  Object.entries(newCabin).forEach(([key, value]) => {
    formData.append(key, value);
  });

  const fetchUrl = `/api/cabins${id ? "/" + id : ""}`;

  const res = await fetch(fetchUrl, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(`Could not ${id ? "edit" : "create"} cabin`);
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
