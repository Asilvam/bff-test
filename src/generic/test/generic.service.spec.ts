import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GenericService } from '../generic.service';
import { mockCharacterApiResponse } from './genericMock.data';

describe('GenericService', () => {
  let httpClient: HttpService;
  let service: GenericService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HttpService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(() =>
              of({
                // your response body goes here
              }),
            ),
          },
        },
        GenericService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              // this is being super extra, in the case that you need multiple keys with the `get` method
              if (key === 'FOO') {
                return 123;
              }
              return null;
            }),
          },
        },
      ],
    }).compile();
    httpClient = module.get<HttpService>(HttpService);
    service = module.get<GenericService>(GenericService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllCountries()', () => {
    it('Should return mock Generic of getAllCountries', async () => {
      const mockReturn = [mockCharacterApiResponse()];

      const response: AxiosResponse = {
        data: { mockReturn },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };

      const mockGet = jest.spyOn(httpClient, 'get');
      mockGet.mockImplementation(() => of(response));
      const responseService = await service.getAllCharacters(1);
      responseService.subscribe(() => {
        expect(mockReturn).toEqual(response.data.mockReturn);
      });
    });
  });
});
