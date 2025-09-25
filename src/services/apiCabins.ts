import type {
  CabinType,
  CreateEditCabinArgs,
} from "../features/cabins/cabinType";
import supabase, { supabaseUrl } from "./supabase";

const getCabins = async (): Promise<CabinType[]> => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
};

const createEditCabin = async ({ newCabin, id }: CreateEditCabinArgs) => {
  const hasImagePath = (newCabin.image as unknown as string)?.startsWith?.(
    supabaseUrl
  );

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // Create/edit cabin
  let query;

  // A) Create
  if (!id)
    query = supabase.from("cabins").insert([{ ...newCabin, image: imagePath }]);
  // B) Edit
  else
    query = supabase
      .from("cabins")
      .update({ ...newCabin, image: imagePath })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // Delete the cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
};

const deleteCabin = async (id: CabinType["id"]) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
};

export { getCabins, createEditCabin, deleteCabin };
