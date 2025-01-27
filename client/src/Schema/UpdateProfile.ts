import { z } from "zod"

const UpdateProfileSchema = z.object({
    PhotoUrl: z.string().nullable(),
    Name: z.string().nullable(),
    Gender: z.string().nullable(),
});


export default UpdateProfileSchema