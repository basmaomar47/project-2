import {  user, userStore } from "../../models/user";


const store= new userStore;
const mtestuser: user={
    fname: "basma",
    lname: "omar",
    password: "xyz"
} ;
let user: user;

describe("testing user model definition", ()=>{
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
    it ('should have authenticate method',()=>{
        expect(store.authenticate).toBeDefined();
    });

});



describe("testing user model functionality", ()=>{

    it('the create function should add a user',async ()=>{
        user= await store.create(mtestuser);
        expect({fname: user.fname, lname: user.lname}).toEqual({
            fname: mtestuser.fname,
            lname: mtestuser.lname
        });
    });
    
    it('the index method should return the user we created', async()=>{
        const listu= await store.index();
        expect(listu).toContain(user);
    });
    it('the show method should return the user with that id', async()=>{
        const thatuser= await store.show(user.id as number)
        expect(thatuser).toEqual(user);
    });
    it('the authenticate function should check the authentication', async()=>{
        const authuser: user|null= await store.authenticate(user.fname, user.lname, user.password)
        if (authuser) {
            const {fname, lname} = authuser
      
            expect(fname).toBe(user.fname),
            expect(lname).toBe(user.lname)
          }
      
    });
    it('the delete function should delete the user whith that id so the list of users be empty', async()=>{
        await store.delete(user.id as number)

        const listu= await store.index();
        expect(listu).toEqual([]);
    });
});

