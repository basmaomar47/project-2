import client from '../database';
import bcrypt from 'bcrypt';

export type user = {
  id?: number;
  fname: string;
  lname: string;
  password: string;
};
const { PEPPERR, SALT_ROUNDS } = process.env;
const PEPPER: string = PEPPERR || 'defaultpepper';
export class userStore {
  async index(): Promise<user[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(` couldn't get the users ${err}`);
    }
  }
  async show(id: number): Promise<user> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Couldn't find user ${id}. Error: ${err}`);
    }
  }
  async create(u: user): Promise<user> {
    try {
      const conn = await client.connect();

      const sql =
        'INSERT INTO users (fname, lname, password) VALUES($1, $2, $3) RETURNING *';

      const hash = bcrypt.hashSync(u.password + PEPPER, Number(SALT_ROUNDS));

      const result = await conn.query(sql, [u.fname, u.lname, hash]);
      conn.release();

      return result.rows[0];;
    } catch (err) {
      throw new Error(`Couldn't add new user. Error: ${err}`);
    }
  }
  async delete(id: number): Promise<user> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Couldn't delete user ${id}. Error: ${err}`);
    }
  }
  async authenticate(
    fname: string,
    lname: string,
    password: string
  ): Promise<user | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT password FROM users WHERE fname=($1) and lname=($2)';

      const result = await conn.query(sql, [fname, lname]);
      const user = result.rows[0];

      if (user) {
        if (bcrypt.compareSync(password + PEPPER, user.password)) {
          return user;
        }
      }

      return null;
    } catch (error) {
      throw new Error(`Failed to sign in as user : ${error}`);
    }
  }
}
