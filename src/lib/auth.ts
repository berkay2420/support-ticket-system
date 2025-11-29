import { jwtVerify, SignJWT } from "jose";
import {cookies} from "next/headers"
import { logEvent } from "@/utils/sentry";

const secret = new TextEncoder().encode(process.env.AUTH_SECRET);

const cookieName = 'auth-token';

export async function signAuthToken(payload:any) {
  try {
    const token = await new SignJWT(payload)
    .setProtectedHeader({alg:'HS256'})
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

    return token;
  } catch (error) {
    console.log(`Failed to sign auth token error: ${error}`)

    throw new Error('Failded to create new auth token');
  }
}

// Using <T> with Promise<T> means this function must return a value of type T.
// T can represent any type, e.g., userId, name, or a more complex object.
// This also allows us to call verifyAuthToken with different expected types, 
// like verifyAuthToken<number>(...) or verifyAuthToken<{ expiredAt: string }>(...)
// "Generics" means we can decide the type when we call  the function:
export async function verifyAuthToken<T>(token:string): Promise<T> {
  try {
    const {payload} = await jwtVerify(token, secret);
    
    return payload as T;
  } catch (error) {
    logEvent(
      'Failded to verify auth token', 
      'auth',
      {tokenSnippet: token.slice(0,10)}, //first 10 chars of token  
      'error', 
      error
    );

    throw new Error('Failded to verify auth token');
  
  }
}

export async function setAuthCookie(token:string) {
  try {
    const cookieStore = await cookies();
    cookieStore.set(cookieName, token,{
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV == 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 
    })
  } catch (error) {
    console.log(`failed to set cookie error ${error}`);
  }
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  const token = cookieStore.get(cookieName);
  return token?.value;
}

export async function removeAuthCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(cookieName);
  } catch (error) {
    console.log(`error while removing cookie erorr ${error}`);
  }
}