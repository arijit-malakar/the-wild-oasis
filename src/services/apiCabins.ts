export const getCabins = async () => {
  const res = await fetch("/api/cabins");

  if (!res.ok) {
    throw new Error("Unable to load cabins data");
  }

  const body = await res.json();
  return body.data.cabins;
};

export const deleteCabin = async (id: string) => {
  const res = await fetch(`/api/cabins/${id}`, { method: "DELETE" });

  if (!res.ok) {
    throw new Error("Unable to delete cabin");
  }

  //   const body = await res.json();
  //   console.log(body);
  //   return body;
};
