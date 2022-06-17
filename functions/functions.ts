import supabase from "../utils/supabase";

// function to upload image
export const uploadImage = async (e: any) => {
  // create empty row in images table
  const { data, error } = await supabase.from("images").insert({}).single();

  console.log(data, error);

  // upload image to supabase storage with the path of `public/${data.id}`
  const { data: imageData, error: imageError } = await supabase.storage
    .from("images")
    .upload(`public/${data.id}`, e.target.files[0]);

  // function to get width and height of the image
  const { width, height } = await getImageDimensions(
    `https://udtndleajmnrvcztmlur.supabase.co/storage/v1/object/public/images/public/${data.id}`
  );

  // update the row with details
  const { data: updateData, error: updateError } = await supabase
    .from("images")
    .update({
      url: `public/${data.id}`,
      width: width,
      height: height,
    })
    .eq("id", data.id)
    .single();

  // return the updated row
  return updateData;
};

// function to get image dimensions
export const getImageDimensions = async (src: string) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = () => resolve({ width: image.width, height: image.height });
    image.onerror = () => reject(new Error("Could not load image at " + src));
  });
};
