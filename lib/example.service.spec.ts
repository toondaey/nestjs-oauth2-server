import { Test, TestingModule } from '@nestjs/testing';

import { ExampleService } from './example.service';
import { EXAMPLE_OPTIONS_TOKEN } from './example.constants';

describe('ExampleService', () => {
    let module: TestingModule;
    let exampleService: ExampleService;

    beforeEach(async () => {
        module = await Test.createTestingModule({
            providers: [
                ExampleService,
                {
                    provide: EXAMPLE_OPTIONS_TOKEN,
                    useValue: jest.fn(),
                },
            ],
        }).compile();

        exampleService = module.get<ExampleService>(ExampleService);
    });

    it('should be defined', () => {
        expect(exampleService).toBeDefined();
    });
});
