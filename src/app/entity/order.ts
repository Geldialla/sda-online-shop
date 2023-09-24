import { BaseEntity } from "./baseEntity";

export interface Order extends BaseEntity {
    userId: number;
    productId: number;
    quantity: number;
    userName: string;
    productName: string;
}
