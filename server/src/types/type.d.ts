import { UserAttributes } from "./models/Users"

declare global {
    namespace Express {
        interface Request {
            user: UserAttributes;
        }
    }
}