import { BaseEntity } from "./baseEntity";

export interface Product extends BaseEntity {
    title: string;
    name: string;
    category: string;
    description: string;
}