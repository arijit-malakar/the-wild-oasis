export const getCabins = async () => {
  const res = await fetch("/api/cabins");

  if (!res.ok) {
    throw new Error("Unable to load cabins data");
  }

  const body = await res.json();
  return body.data.cabins;
};
