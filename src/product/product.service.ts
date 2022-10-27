import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 } from 'uuid'
import { Prisma } from "@prisma/client"

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto) {
    const { ProductVar, Tags, ...product } = createProductDto
    let ProductAttr = []
    let CheckUnique: { [key: string]: boolean } = {}

    return await this.prisma.product.create({ data: createProductDto })

    for (let i = 0; i < ProductVar.length; i++) {
      if (ProductVar[i].ProductAttr) {
        let productAttr: Prisma.ProductAttrWhereInput = { ...ProductVar[i].ProductAttr, keyValue: '' }
        delete ProductVar[i].ProductAttr
        productAttr.keyValue = `${productAttr.key}${productAttr.value}`.trim()
        if (CheckUnique[productAttr.keyValue] !== true) {
          CheckUnique[productAttr.keyValue] = true
          ProductAttr.push(productAttr)
        }
      }
    }

    const id = v4()


    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
