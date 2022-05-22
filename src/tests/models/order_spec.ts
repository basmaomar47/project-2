import { orderStore, order } from "../../models/order";
import { user, userStore } from "../../models/user";
import { product, productStore } from "../../models/product";


const ostore= new orderStore;
const ustore= new userStore;
const pstore= new productStore;

const testorder: order={
    user_id: 0,
    status:"complete"
};
let nworder: order;

const testuser: user={
    fname: "basma",
    lname: "omar",
    password: "XYZ"
};
let tuser: user;

const testproduct: product={
    name: "prod1",
    price: 222
};

let tproduct: product;
let prodId: number;

describe("testing order model definition", ()=>{
    it ('should have index method',()=>{
        expect(ostore.index).toBeDefined();
    });
    it ('should have show method',()=>{
        expect(ostore.show).toBeDefined();
    });
    it ('should have create method',()=>{
        expect(ostore.create).toBeDefined();
    });
    it ('should have delete method',()=>{
        expect(ostore.delete).toBeDefined();
    });

    it ('should have an add product method',()=>{
        expect(ostore.addProduct).toBeDefined();
    });

});


describe("testing order model functionality", ()=>{
    beforeAll(async()=>{
        tuser= await ustore.create(testuser) ;
        if(tuser.id){
            testorder.user_id=tuser.id;
            
        };
        tproduct= await pstore.create(testproduct);
        if(tproduct){
            prodId= tproduct.id as number;
        }
    });

    afterAll(async()=>{
        await ustore.delete(tuser.id as number) ;
        await pstore.delete(prodId) ;
    })

    it('the create function should add an order', async()=>{
        nworder= await ostore.create(testorder);
        expect({
            user_id: Number(nworder.user_id), 
            status: nworder.status
        }).toEqual({
            user_id: testorder.user_id, 
            status: testorder.status
        });
    });

    it('the index method should return the order we created', async()=>{
        const listo= await ostore.index()
        expect(listo).toContain(nworder);
    });

    it('the show method should return the order with that id', async()=>{
        const thatorder= await ostore.show(tuser.id as number)
        expect(thatorder).toEqual(nworder);
    });


    it('the delete function should delete the order whith that id so the list of orders be empty', async()=>{
        await ostore.delete(nworder.id as number);

        const listo= await ostore.index();
        expect(listo).toEqual([]);
    });

});


