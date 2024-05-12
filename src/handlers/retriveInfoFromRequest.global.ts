import * as jwt from 'jsonwebtoken';

function RetrieveInfoFromRequest(request: any) {
  const token = request.cookies.access_token;
  const decoded = jwt.decode(token);
  const userId: any = decoded ? decoded : 'No user id found';
  return {
    id: userId.sub,
    email: userId.email,
    token: userId.token,
  };
}

export default RetrieveInfoFromRequest;
