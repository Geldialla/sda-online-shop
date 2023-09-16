import { BaseEntity } from "./baseEntity";

export interface Product extends BaseEntity {
    title: string;
    pName: string;
    category: string;
    description: string;
    price: number;
}