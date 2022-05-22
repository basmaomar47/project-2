import supertest from "supertest";
import app from "../../server";
import { user } from "../../models/user";
import { JwtPayload, verify } from "jsonwebtoken";


const req= supertest(app);

describe('testing handler endpoint /users', ()=>{
    const htestuser:user ={
        id: 1,
        fname: "basma",
        lname: "omar",
        password: "XYZ",
    };
    let testtoken: string;
    let id: number;
    // afterAll(async () => {
    //     await req
    //     .delete('/users')
    //     .send({id: htestuser.id})
    //     .set('Authorization', `Bearer ${testtoken}`)
    //     .expect(200);

    // })


    it('testing the create endpoint to create user', async()=>{
        await req
            .post('/users')
            .send({fname: htestuser.fname, lname: htestuser.lname, password: htestuser.password})
            .expect(200)
            .then((res)=>{
                testtoken= res.body;
                const djwt=verify(testtoken, process.env.TOKEN_SECRET as string) as JwtPayload;
                id=djwt.user.userId;
            });
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
            .set('Authorization', `Bearer jsgjrijgtihyjtyiq`)
            .expect(401);
    });

    it('testing the show endpoint with the right token and right id', async()=>{
        await req
            .get(`/users/${id}`)
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200);
    });
    it('testing the show endpoint with the wrong token and right id', async()=>{
        await req
            .get(`/users/${id}`)
            .set('Authorization', `Bearer jsgjrijgtihyjtyiq`)
            .expect(401);
    });

    it('testing the delete endpoint to delete the htestuser', async()=>{
        await req
            .delete('/users')
            .send({id: id})
            .set('Authorization', `Bearer ${testtoken}`)
            .expect(200);
    });
    it('testing the delete endpoint to delete the htestuser with the wrong token', async()=>{
        await req
            .delete('/users')
            .send({id: id})
            .set('Authorization', `Bearer oivkeikiuhj695fdlw`)
            .expect(401);
    });

});
