import { Request, Response } from "express";
import { Users } from "../../Models";
import { SuccessResponse, RejectResponse } from "../../utils";
import { putthefile, gethefile } from "../../services";

const Gettheuserprofile = async (req: Request, res: Response) => {
  try {
    let userid = req.user?.Id;
    let data = {};

    let user = await Users.findOne({
      where: { Id: userid },
      attributes: ["Name", "Gender", "PhotoUrl", "followers"],
    });

    if (!user?.PhotoUrl) {
      data = {
        ...user,
        PhotoUrl:
          "https://th.bing.com/th/id/OIP.ADA-vGQMw0K3Bzbn9ZOhPgHaE8?rs=1&pid=ImgDetMain",
      };
    } else {
      let img = gethefile(user.PhotoUrl);
      data = { ...user, PhotoUrl: img };
    }

    return SuccessResponse(res, { data }, 200);
  } catch (error) {
    return RejectResponse(res, "internal server errors", 500);
  }
};

const updatetheprofile = async (req: Request, res: Response) => {
  try {
    const { Name, Gender, PhotoUrl } = req.body;
    console.log(Name, Gender, PhotoUrl);
    const updateData: any = {};

    if (Name) updateData.Name = Name;
    if (Gender) updateData.Gender = Gender;

    if (PhotoUrl) {
      const filename = `${Date.now()}.jpg`;
      const url = await putthefile("image/jpeg", filename);
      updateData.PhotoUrl = filename;
    }

    if (Object.keys(updateData).length === 0) {
      return RejectResponse(res, "No data provided for update", 400);
    }

    await Users.update(updateData, {
      where: {
        Id: req.user?.Id,
      },
    });

    return SuccessResponse(
      res,
      { message: "Successfully updated", updateData },
      202
    );
  } catch (error) {
    console.error(error);
    return RejectResponse(res, "Internal server error", 500);
  }
};
export { updatetheprofile, Gettheuserprofile };
