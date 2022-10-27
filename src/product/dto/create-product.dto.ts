import { ApiProperty } from '@nestjs/swagger';
import { Type } from "class-transformer";
import { IsOptional, IsString } from 'class-validator';
import { ProductVar, Tag } from "./base_product_dto";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ type: [ProductVar] })
  @Type(() => ProductVar)
  @IsOptional()
  ProductVar?: ProductVar[] = []

  @ApiProperty({ type: [Tag] })
  @Type(() => Tag)
  @IsOptional()
  Tags?: Tag[] = []


}

