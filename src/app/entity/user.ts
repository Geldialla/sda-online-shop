import { BaseEntity } from "./baseEntity";

export interface User extends BaseEntity {
    name: string;
    lastName: string;
    adress: string;
    email: string;
    password: string;
    phoneNumber: number;
}