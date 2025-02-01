import { Response } from 'express';
import cloudinary from '../services/cloudinary';
import { Users } from '../Models';
import bcrypt from 'bcryptjs';
import jwtwebtoken from 'jsonwebtoken';
import { JwtPayload } from '../types';
import { UserAttributes } from '../types/models/Users';

function SuccessResponse(
  res: Response,
  data: object,
  code: number,
  messages?: string,
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


const storetheimagesintocloudinary = async (images: any): Promise<string> => {
  try {

    const response = await cloudinary.uploader.upload(images, {
      folder: `/Videoapplication_images`,
    });

    return response.url;

  } catch (error) {
    console.log(error, 'Gettings errors store images into the cloudinary', error);
    return '';

  }
};

const storethevideosintocloudinary = async (video: any): Promise<string> => {
  try {
    const response = await cloudinary.uploader.upload(video, { resource_type: 'video' });
    return response?.url;
  } catch (error) {
    console.log('store_the_videos_clodinary_errors', error);
    return '';
  }
};

const Createdummyuser = async ({ Name, Email, Password }: { Name: string, Email: string, Password: string }) => {
  try {

    const hashpassword = await bcrypt.hash(Password, 8);
    const user = await Users.create({
      Name,
      Email,
      Password: hashpassword,

    });
    console.log(`Sucessfully create dummy User ${user}`);
  } catch (error) {
    console.log(`errors creaateing dummy User ${error}`);
  }
};


const jsonwebtokentoGetUser = async (token: string): Promise<UserAttributes | null> => {
  try {

    const { Email } = jwtwebtoken.verify(token, process.env.JSONWEBSECRECT as string) as JwtPayload;

    const user = await Users.findOne({
      where: {
        Email,
      },
    });

    return user;
  } catch (error) {
    console.log(error, 'errors in jsonwebtoken_to_GetUser');
    return null;
  }
};

export { SuccessResponse, RejectResponse, Createdummyuser, storetheimagesintocloudinary, storethevideosintocloudinary, jsonwebtokentoGetUser };
