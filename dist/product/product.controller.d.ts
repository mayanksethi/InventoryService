import { ProductService } from './product.service';
import { Product } from './product.schema';
import { RateProduct } from './product.rate.dto';
import { UpdateProduct } from './product.update.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(productDto: Product): Promise<Product>;
    rateProduct(rateProduct: RateProduct, id: string): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    getOrderHistory(id: string): Promise<any>;
    update(id: string, productDto: UpdateProduct): Promise<Product>;
    increaseQuantity(productDto: UpdateProduct): Promise<void>;
    decreaseQuantity(productDto: UpdateProduct): Promise<void>;
    remove(id: string): Promise<void>;
}
