import { User } from "./user";

export interface JWTObject {
    access_token: string;
    expires_in: number;
    token_type: string;
    user?: User
}