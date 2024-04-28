import {
  CharacterApiResponseDto,
  CharacterDataDto,
  InfoDataDto,
} from '../dto/getAllCharacters.dto';

const mockCharaterData = (): CharacterDataDto => ({
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: {
    name: 'Earth (C-137)',
    url: 'https://rickandmortyapi.com/api/location/1',
  },
  location: {
    name: 'Earth (Replacement Dimension)',
    url: 'https://rickandmortyapi.com/api/location/20',
  },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: [
    'https://rickandmortyapi.com/api/episode/1',
    'https://rickandmortyapi.com/api/episode/2',
  ],
  url: 'https://rickandmortyapi.com/api/character/1',
  created: '2017-11-04T18:48:46.250Z',
});

const mockInfoData = (): InfoDataDto => ({
  count: 671,
  pages: 34,
  next: 'https://rickandmortyapi.com/api/character/?page=2',
  prev: null,
});

export const mockCharacterApiResponse = (): CharacterApiResponseDto => ({
  info: mockInfoData(),
  results: [mockCharaterData()],
});
