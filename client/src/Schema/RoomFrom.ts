import { z } from "zod";

const RoomFrom = z.object({
  Name: z.string().min(1, { message: "Please Give The Name" }),
  Topics: z.string().min(1, { message: "Please Give The Name" }),
});

export default RoomFrom;
