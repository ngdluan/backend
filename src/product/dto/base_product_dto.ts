import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ProductAttr {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  value: string;
}

export class Tag extends ProductAttr { }

export class ProductVar {
  @ApiProperty()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsOptional()
  public?: boolean;


  @ApiProperty()
  @IsOptional()
  sku?: string;

  @ApiProperty()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ type: [ProductAttr] })
  @Type(() => ProductAttr)
  ProductAttr: ProductAttr[]
}