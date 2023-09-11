import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { SdaHttpClient } from './sda-be-mock.service';
import { dbConfig } from './db.config';

export interface LocalDbConfig {
    table: string;
    columns: Array<string>;
}

function dbConfigFunction() {
    const dbConfigLocal: DBConfig = {
        name: 'SdaBeDB',
        version: 1,
        objectStoresMeta: [],
    };
    dbConfig.forEach((element) => {
        dbConfigLocal.objectStoresMeta.push({
            store: element.table,
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
                ...element.columns.map((x: string) => {
                    return {
                        name: x,
                        keypath: x,
                        options: { unique: false },
                    };
                }),
            ],
        });
    });

    return dbConfigLocal;
}

@NgModule({
    declarations: [],
    imports: [CommonModule, NgxIndexedDBModule.forRoot(dbConfigFunction())],
    exports: [NgxIndexedDBModule],
})
export class SdaHttpClientModule {
    static forRoot(): ModuleWithProviders<SdaHttpClientModule> {
        return {
            ngModule: SdaHttpClientModule,
            providers: [SdaHttpClient],
        };
    }
}
