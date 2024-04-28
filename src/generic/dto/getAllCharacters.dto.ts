export class CharacterDataDto {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export class InfoDataDto {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export class CharacterApiResponseDto {
  info: InfoDataDto;
  results: CharacterDataDto[];
}
