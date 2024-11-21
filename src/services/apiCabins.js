import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw Error("Cabin data cannot be feteched right now");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw Error("Cabin could not be deleted");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = `${supabaseUrl}/storage/v1/object/public/Cabins/${imageName}`;

  let query = supabase.from("cabins"));
  //1.create or edit the cabin

  //create the cabin
  if (!id) query.insert([{ ...newCabin, image: imagePath }]);

      
  //for edit
  if (id) query.update({ ...newCabin, image: imagePath })
      .eq("id", id);
      
  const {data, error} = await query.select().single();
  
  if (error) {
    console.error(error);
    throw Error("Cabin could not be created");
  }

  //2. uplaod image
  const { error: imageError } = await supabase.storage
    .from("Cabins")
    .upload(imageName, newCabin.image);

  //3. prevent new cabin is been created while the image is not uploaded
  if (imageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(imageError);
    throw Error("Image could not be uploaded and the cabin was not craeted");
  }

  return data;
}
