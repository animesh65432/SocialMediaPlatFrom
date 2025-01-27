import { Response } from "express";
import cloudinary from "../services/cloudinary";
import { Users } from "../Models"
import bcrypt from "bcryptjs"

function SuccessResponse(
  res: Response,
  data: object,
  code: number,
  messages?: string
) {
  return res.status(code).json({
    sucess: true,
    data,
    messages,
  });
}
function RejectResponse(res: Response, messages: string, code: number) {
  return res.status(code).json({
    sucess: false,
    messages,
  });
}


const store_the_images_into_cloudinary = async (images: any): Promise<string> => {
  try {

    let response = await cloudinary.uploader.upload(images, {
      folder: `/Videoapplication_images`
    })

    return response.url

  } catch (error) {
    console.log(error, "Gettings errors store images into the cloudinary", error)
    return ""

  }
}

const store_the_videos_into_cloudinary = async (video: any): Promise<string> => {
  try {
    const response = await cloudinary.uploader.upload(video, { resource_type: "video" })
    return response?.url
  } catch (error) {
    console.log("store_the_videos_clodinary_errors", error)
    return ""
  }
}

const CreatedummyUser = async ({ Name, Email, Password }: { Name: string, Email: string, Password: string }) => {
  try {

    const hashpassword = await bcrypt.hash(Password, 8)
    const user = await Users.create({
      Name,
      Email,
      Password: hashpassword,

    })
    console.log(`Sucessfully create dummy User ${user}`)
  } catch (error) {
    console.log(`errors creaateing dummy User ${error}`)
  }
}


export { SuccessResponse, RejectResponse, store_the_images_into_cloudinary, store_the_videos_into_cloudinary, CreatedummyUser };
