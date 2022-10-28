import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('Product Router')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @ApiOperation({ summary: 'Create Product and Product variation' })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiQuery({
    name: "search",
    type: String,
    description: "search. Optional",
    required: false
  })
  @ApiQuery({
    name: "skip",
    type: String,
    description: "search. Optional",
    required: false
  })
  @ApiQuery({
    name: "take",
    type: String,
    description: "search. Optional",
    required: false
  })
  findAll(@Query('search') searchQuery?: string,
    @Query('skip') skip?: string,
    @Query('take') take?: string
  ) {
    return this.productService.findAll(searchQuery, +skip, +take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
