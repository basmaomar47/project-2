import { product, productStore } from "../../models/product";

const store= new productStore();
const testproduct :product={
    name: "prod1",
    price: 333
} ;
let product: product;


describe("testing product model definition", ()=>{
    it ('should have index method',()=>{
        expect(store.index).toBeDefined();
    });
    it ('should have show method',()=>{
        expect(store.show).toBeDefined();
    });
    it ('should have create method',()=>{
        expect(store.create).toBeDefined();
    });
    it ('should have delete method',()=>{
        expect(store.delete).toBeDefined();
    });

});

describe("testing product model functionality", ()=>{

    it('the create function should add a product', async()=>{
        product= await store.create(testproduct);
        expect({
            name: product.name, 
            price: product.price
        })
        .toEqual({
            name: testproduct.name, 
            price: testproduct.price
        });
    });
    it('the index method should return the product we created', async()=>{
        const listp= await store.index()
        expect(listp).toContain(product);
    });
    it('the show method should return the product with that id', async()=>{
        const thatproduct= await store.show(product.id as number)
        expect(thatproduct).toEqual(product);
    });
    it('the delete function should delete the product whith that id so the list of products be empty', async()=>{
        await store.delete(product.id as number)

        const listp= await store.index();
        expect(listp).toEqual([]);
    });


});

