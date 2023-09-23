import { BaseEntity } from "./baseEntity";

export interface Order extends BaseEntity {
    userName: string;
    userId: any;
    productId: number;
    quantity: number;
}