import { Module } from '@nestjs/common';

import { RESPONSES } from './test.constants';
import { ITestExpectedResponses } from './test.interfaces';

@Module({})
export class DataProviderModule {
    static register(responses: ITestExpectedResponses) {
        return {
            module: DataProviderModule,
            providers: [
                {
                    provide: RESPONSES,
                    useValue: responses,
                },
            ],
            exports: [RESPONSES],
        };
    }
}
