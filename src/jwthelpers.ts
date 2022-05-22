import { Request } from 'express';
import { verify, JwtPayload, sign } from 'jsonwebtoken';
const secretToken = process.env.TOKEN_SECRET as unknown as string;

function Verify(req: Request, userId?: number) {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader!.split(' ')[1];
  const decoded = verify(token as string, secretToken) as JwtPayload;
  if (userId && decoded.user.userId != userId) {
    throw new Error('User id does not match!');
  }
}

function Sign(userId: number) {
  return sign({ user: { userId } }, secretToken);
}

export { Verify, Sign };
