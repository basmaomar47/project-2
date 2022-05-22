import supertest from "supertest";
import app from "../../server";
import { product } from "../../models/product";
import { user } from "../../models/user";
import { JwtPayload, verify } from "jsonwebtoken";

const req =supertest(app);

describe('testing handler endpoint /products', ()=>{

    const testproduct: product={
        id: 1,
        name: "prod1",
        price: 333
    }
    const user: user={
        id: 1,
        fname: "basma",
        lname: "omar",
        password: "XUZ"
    };
    let testtoken: string;
    let id: number;
    let pid: number;

    beforeAll(async()=>{
        await req
            .post('/users')
            .send(user)
            .expect(200)
            .then((res)=>{
                testtoken= res.body;
                const djwt=verify(testtoken, process.env.TOKEN_SECRET as string) as JwtPayload;
                id=djwt.user.userId;

            });
    });
    afterAll(async()=>{
        await req
            .delete('/users')
            .send({id: id})
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200);
        });

    it('testing the product create endpoint with the right token', async()=>{
        await req
            .post('/products')
            .send({
                name: testproduct.name,
                price: testproduct.price
            })
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200)
            .then((res)=>{
                pid= res.body.id;
                testproduct.id= pid;
            });
    });
    it('testing the create endpoint with the wrong token', async()=>{
        await req
            .post('/products')
            .send({
                name: testproduct.name,
                price: testproduct.price
            })
            .set('Authorization', `Bearer kkbikbrobpdoplxcih`)
            .expect(401)
        });

    it('testing the index endpoint with the right token', async()=>{
        await req
            .get('/users')
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200);      
    });

    it('testing the index endpoint with the wrong token', async()=>{
        await req
            .get('/users')
            .set('Authorization', `Bearer ldldoveroghtbmgvms`)
            .expect(401);      
    });

    it('testing the show endpoint with the right token', async()=>{
        await req
            .get(`/users/${pid}`)
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200);      
    });
    it('testing the show endpoint with the wrong token', async()=>{
        await req
            .get(`/users/${pid}`)
            .set('Authorization', `Bearer sdfghldolkjhhtbmgvms`)
            .expect(401);      
    });

    it('testing the delete endpoint with the right token', async()=>{
        await req
            .delete('/products')
            .send({id: pid})
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200);
    });
    it('testing the delete endpoint with the wrong token', async()=>{
        await req
            .delete('/products')
            .send({id: pid})
            .set('Authorization', `Bearer ldevgbjmigkfoperoribmnj`)
            .expect(401);
    })

});
