import { BaseEntity } from "./baseEntity";

export interface Order extends BaseEntity {
    userName: string;
    userEmail: string;
    userPhoneNumber: number;
    productName: string;
}