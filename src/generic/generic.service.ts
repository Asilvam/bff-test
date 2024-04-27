import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosRequestConfig } from 'axios';
import { map } from 'rxjs';

@Injectable()
export class GenericService {
  url = this.configService.get<string>('MS.url_ms_sql');
  logger = new Logger(GenericService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAllCharacters(id: number): Promise<any> {
    const requestConfig: AxiosRequestConfig = {};
    return this.httpService
      .get(`${this.url}characters/${id}`, requestConfig)
      .pipe(map((response) => response.data));
  }
}
