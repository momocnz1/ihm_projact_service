import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  async search(query: string): Promise<any> {
    // โค้ดการค้นหาจริง ๆ จะอยู่ที่นี่
  }
}