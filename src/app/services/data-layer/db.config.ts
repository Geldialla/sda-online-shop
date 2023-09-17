import { LocalDbConfig } from './sda-be-mock.module';

export const dbConfig: LocalDbConfig[] = [
    {
        table: "User",
        columns: ['id', 'name', 'lastName', 'email', 'adress', 'phoneNumber']
      },
    {
        table: "Product",
        columns: ['id','image', 'title', 'name', 'category', 'description']
      },
    {
        table: "Order",
        columns: ['id', 'userName', 'userEmail', 'userPhoneNumber', 'productName']
      },
];
