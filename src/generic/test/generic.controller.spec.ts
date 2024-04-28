import { Test, TestingModule } from '@nestjs/testing';
import { GenericController } from '../generic.controller';
import { GenericService } from '../generic.service';

describe('Test GenericController', () => {
  let controller: GenericController;
  let service: GenericService;

  beforeEach(async () => {
    const mockService = {
      getAllCharacters: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenericController],
      providers: [
        {
          provide: GenericService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<GenericController>(GenericController);
    service = module.get<GenericService>(GenericService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllCountries()', () => {
    it('Should call getAllCharacters() of GenericService ', async () => {
      const findSpy = jest.spyOn(service, 'getAllCharacters');
      await controller.getAllCharacters(1);
      expect(findSpy).toHaveBeenCalled();
    });

    it('Should throw if GenericService find all throws', async () => {
      jest
        .spyOn(service, 'getAllCharacters')
        .mockRejectedValueOnce(new Error());
      await expect(controller.getAllCharacters(1)).rejects.toThrow(new Error());
    });
  });
});
