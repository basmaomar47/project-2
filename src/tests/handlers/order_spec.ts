import supertest from "supertest";
import app from "../../server";
import { order } from "../../models/order";
import { user } from "../../models/user";
import { product } from "../../models/product";
import { JwtPayload, verify } from "jsonwebtoken";

const req= supertest(app);

describe('testing handler endpoint /orders', ()=>{

    const testorder: order ={
        id:1,
        user_id: 0,
        status: 'complete'
    };

    const user: user={
        fname: "basma",
        lname: "omar",
        password: "XUZ"
    };

    const product: product={
        name: "prod1",
        price: 222
    };

    let pid: number;
    let uid: number;
    let testtoken: string;

    beforeAll(async()=>{
        await req
            .post('/users')
            .send(user)
            .expect(200)
            .then((res)=>{
                testtoken= res.body;
                const djwt=verify(testtoken, process.env.TOKEN_SECRET as string) as JwtPayload;
                uid=djwt.user.userId;
                testorder.user_id=uid;

            });
            await req
            .post('/products')
            .send({
                name: product.name,
                price: product.price
            })
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200)
            .then((res)=>{
                pid= res.body.id;
            });
            });

    afterAll(async()=>{
        await req
            .delete('/users')
            .send({id: uid})
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200);

            await req
            .delete('/products')
            .send({id: pid})
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200);

        });

        it('testing the order create endpoint with the right token', async()=>{
            await req
                .post('/orders')
                .send({
                    user_id: testorder.user_id,
                    status: testorder.status
                })
                .set('Authorization', `Bearer ${testtoken}`)
                .expect(200)
                .then((res)=>{
                    testorder.id= res.body.id;
                });
        });
        it('testing the create endpoint with the wrong token', async()=>{
            await req
            .post('/orders')
            .send({
                user_id: testorder.user_id ,
                status: testorder.status
            })
            .set('Authorization', `Bearer kjhgfdswertyuio`)
            .expect(401)
            });
   
            it('testing the index endpoint with the right token', async()=>{
                await req
                    .get('/orders')
                    .set('Authorization', `Bearer ${testtoken}`)
                    .expect(200);      
            });
        
            it('testing the index endpoint with the wrong token', async()=>{
                await req
                    .get('/orders')
                    .set('Authorization', `Bearer ldxcvmoopvbghtbmgvms`)
                    .expect(401);      
            });
        
            it('testing the show endpoint with the right token', async()=>{
                await req
                    .get(`/users/${testorder.id}`)
                    .set('Authorization', `Bearer ${testtoken}`)
                    .expect(200);      
            });
            it('testing the show endpoint with the wrong token', async()=>{
                await req
                    .get(`/users/${testorder.id}`)
                    .set('Authorization', `Bearer sdfghldolkjhhtbmgvms`)
                    .expect(401);      
            });
        
            it('testing the delete endpoint with the right token', async()=>{
                await req
                    .delete('/orders')
                    .send({id: testorder.id})
                    .set('Authorization', `Bearer ${testtoken}`)
                    .expect(200);
            });
            it('testing the delete endpoint with the wrong token', async()=>{
                await req
                    .delete('/orders')
                    .send({id: testorder.id})
                    .set('Authorization', `Bearer ldevgbjmigkfoperoribmnj`)
                    .expect(401);
            })
        
});

