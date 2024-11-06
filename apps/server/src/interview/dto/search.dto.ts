// // src/mock-interview/dto/search-mock-interview.dto.ts
// import { IsOptional, IsString, IsInt, Min } from 'class-validator';
// import { Type } from 'class-transformer';

export class SearchMockInterviewDto {
  //   @IsOptional()
  //   @IsString()
  jobPosition?: string;

  //   @IsOptional()
  //   @Type(() => Number)
  //   @IsInt()
  //   @Min(1)
  page?: number = 1;

  //   @IsOptional()
  //   @Type(() => Number)
  //   @IsInt()
  //   @Min(1)
  limit?: number = 4;
}
