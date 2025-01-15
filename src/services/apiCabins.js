import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  let { data: cabins, error } = await supabase
    .from("cabins")
    .select("*")
    .order("created_at", false);
  if (error) {
    console.log(error);
    throw new Error("مشکلی پیش آمد، دوباره تلاش کنید.");
  }
  return cabins;
};

export const createEditCabin = async (newCabin, id) => {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id)
    query = query.insert([
      {
        ...newCabin,
        image: imagePath,
        created_at: new Date().toLocaleString(),
      },
    ]);

  // B) EDIT
  if (id)
    query = query
      .update({
        ...newCabin,
        image: imagePath,
        updated_at: new Date().toLocaleString(),
      })
      .eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("مشکلی پیش آمد و عملیات انجام نشد!");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. If there was problem uploading image, delete the cabin.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.log(storageError);
    throw new Error("مشکلی پیش آمد و عکس آپلود نشد، اتاق هم حذف شد!");
  }

  return data;
};

export const deleteCabin = async (id) => {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("مشکلی پیش آمد و اتاق حذف نشد!");
  }
  return data;
};
