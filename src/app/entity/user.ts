import { BaseEntity } from "./baseEntity";

export interface User extends BaseEntity {
    name: string;
    lastName: string;
    email: string;
    adress: string;
    phoneNumber: number;
}