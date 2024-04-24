"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
require("dotenv/config");
let ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async rateProduct(id, rateProduct) {
        const product = await this.findOne(id);
        let { rating } = rateProduct;
        rating += product.rating;
        if (rating > 0)
            rating /= 2;
        product.rating = rating;
        const updatedProduct = new this.productModel(product);
        return updatedProduct.save();
    }
    async create(product) {
        const createdProduct = new this.productModel(product);
        return createdProduct.save();
    }
    async findAll() {
        return this.productModel.find().exec();
    }
    async findOne(id) {
        return this.productModel.findById(id).exec();
    }
    async update(id, product) {
        return this.productModel
            .findByIdAndUpdate(id, product, { new: true })
            .exec();
    }
    async remove(id) {
        await this.productModel.findByIdAndDelete(id).exec();
    }
    async getProductHistory(id) {
        const response = await (0, axios_1.default)({
            method: 'GET',
            url: `${process.env.ORDER_URL}/history/product/${id}`,
        }).catch(() => {
            throw new common_1.ForbiddenException('API not available');
        });
        return response.data;
    }
    async updateQuantity(productDetails, itr) {
        if (productDetails.productIds) {
            productDetails.productIds.forEach((productId) => {
                this.productModel.findByIdAndUpdate(productId, {
                    $inc: { quantity: itr },
                });
            });
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map