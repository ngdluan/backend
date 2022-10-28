import { ProductVar } from './dto/base_product_dto';
import { PrismaService } from './../prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 } from 'uuid'
import { Prisma } from "@prisma/client"
import { validateHeaderValue } from 'http';
import { info } from 'console';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) { }
  async create(createProductDto: CreateProductDto) {
    const { ProductVar, Tags, ...product } = { ...createProductDto, id: v4(), ProductAttr: { connect: [] } }
    const createProductAttr: any[] = []
    const CheckUnique: { [key: string]: boolean } = {}
    const productVar: Prisma.ProductVarCreateInput[] = []
    const productConnect = []
    for (let i = 0; i < ProductVar.length; i++) {
      if (ProductVar[i].ProductAttr) {
        const ProductAttr = ProductVar[i].ProductAttr
        delete ProductVar[i].ProductAttr

        const ProductVarItem: Prisma.ProductVarCreateInput = {
          ...ProductVar[i],
          Product: { connect: { id: product.id } },
          ProductAttr: { connect: [] }
        }

        ProductVarItem.ProductAttr = { connect: [] }
        const connect = []
        for (let j = 0; j < ProductAttr.length; j++) {
          const ProductAttrItem = ProductAttr[j]
          connect.push({ key: ProductAttrItem.key, value: ProductAttrItem.value })
          if (!CheckUnique[`${ProductAttrItem.key}${ProductAttrItem.value}`]) {
            createProductAttr.push(this.prisma.productAttr.upsert({
              where: { key_value: ProductAttrItem },
              create: ProductAttrItem,
              update: ProductAttrItem
            }))
            CheckUnique[`${ProductAttrItem.key}${ProductAttrItem.value}`] = true
            productConnect.push({ key_value: ProductAttrItem })
          }
          connect.push({ key_value: ProductAttrItem })
        }

        ProductVarItem.ProductAttr.connect = productConnect;

        productVar.push(ProductVarItem)
      }
    }
    product.ProductAttr.connect = productConnect
    const TagConnect = []
    const createTag = []
    for (let i = 0; i < Tags.length; i++) {
      const tag = Tags[i]
      createTag.push(this.prisma.tag.upsert({ where: { key_value: tag }, create: tag, update: tag }))
      TagConnect.push({ key_value: tag })
    }

    const tagConnect = [...Tags.map(tag => { key_value: tag })]

    await this.prisma.$transaction([
      ...createProductAttr,
      ...createTag
    ])
    await this.prisma.$transaction([
      this.prisma.product.create({
        data: {
          ...product, Tags: {
            connect: TagConnect
          }
        }
      }),
      ...productVar.map(pv => this.prisma.productVar.create({ data: pv })),
    ])


    return { message: "Product successfully created" };
  }

  async findAll(search?: string, skip?: number, take?: number) {
    let where = { OR: [] }
    if (search) {
      ['name', 'Tags.value', 'ProductAttr.value', 'ProductVar.sku', 'Category.name'].map(e => {
        if (e.includes('.')) {
          const keys = e.split('.')
          where.OR.push({ [keys[0]]: { some: { [keys[1]]: { contains: search } } } })
        } else {
          where.OR.push({ [e]: { contains: search } })
        }
      })
    } else {
      where = undefined
    }
    const [result, count] = await this.prisma.$transaction([this.prisma.product.findMany({
      where, select: {
        name: true,
        Tags: { select: { key: true, value: true } },
        ProductVar: {
          select: {
            price: true,
            public: true,
            sku: true,
            kiotId: true,
            quantity: true,
            ProductAttr: { select: { key: true, value: true } }
          }
        },
      }, skip: Number(skip || 0), take: Number(take || 50)
    }), this.prisma.product.count({ where })]);
    return { count, result }
  }

  async findOne(id: string) {
    return await this.prisma.product.findUnique({
      where: { id }, select: {
        name: true,
        Tags: { select: { key: true, value: true } },
        ProductVar: {
          select: {
            price: true,
            public: true,
            sku: true,
            kiotId: true,
            quantity: true,
            ProductAttr: { select: { key: true, value: true } }
          }
        },
      }
    });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
