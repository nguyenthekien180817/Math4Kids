function calc_image_size(image) {
  let y = 1;
  if (image.endsWith("==")) {
    y = 2;
  }
  const x_size = image.length * (3 / 4) - y;
  return Math.round(x_size / 1024);
}

async function reduce_image_file_size(
  base64Str,
  MAX_WIDTH = 450,
  MAX_HEIGHT = 450
) {
  let resized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      resolve(canvas.toDataURL()); // this will return base64 image results after resize
    };
  });
  return resized_base64;
}

async function image_to_base64(file) {
  if (file != null) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  }
  return "";
}

export async function base64Converter(file, min_image_size = 300) {
  const res = await image_to_base64(file);
  if (res) {
    const old_size = calc_image_size(res);
    if (old_size > min_image_size) {
      const resized = await reduce_image_file_size(res);
      const new_size = calc_image_size(resized);
      console.log("new_size=> ", new_size, "KB");
      console.log("old_size=> ", old_size, "KB");
      return resized;
    } else {
      console.log("image already small enough");
      return res;
    }
  } else {
    console.log("return err");
    return null;
  }
}
