import { LocalDbConfig } from './sda-be-mock.module';

export const dbConfig: LocalDbConfig[] = [
    {
        table: "Users",
        columns: ['id', 'name', 'lastName', 'email', 'adress', 'phoneNumber']
      },
    {
        table: "Product",
        columns: ['id', 'title', 'name', 'category', 'description']
      },
    {
        table: "Users",
        columns: ['id', 'userName', 'userEmail', 'userPhoneNumber', 'productName']
      },
];
