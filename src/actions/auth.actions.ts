'use server';
import {prisma} from '@/db/prisma';
import bcrypt from 'bcryptjs';
import { signAuthToken, setAuthCookie, removeAuthCookie } from '@/lib/auth';
import { logEvent } from '@/utils/sentry';

type ResponseResult = {
  success: boolean,
  message: string
}

export async function registerUser(
  prevState: ResponseResult, 
  formData: FormData
): Promise<ResponseResult>{

  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if(!name || !email || !password){
      return { success: false, message: 'Please fill all the fileds' };
    }

    const existingUser = await prisma.user.findUnique({
      where: {email}
    });

    if (existingUser) {
      return { success: false, message: 'Failed to register new user, user already exists' };
    }

    const hashedPassword = await bcrypt.hash(password,10);
    
    const user = await prisma.user.create({
      data:{
        name,
        email,
        password: hashedPassword,
        department: "sales"
      }
    })

    const token = await signAuthToken({userId: user.id})
    await setAuthCookie(token);

    logEvent(
      `User registered succcessfully`,
      'auth',
      { userId: user.id, email },
      'info'
    );
    return {success: true, message: 'Successfully registered new user'}
  } catch (error) {
    console.log(`Failed to register new user error: ${error}`);
    return {success: false, message: 'Something went wrong please try again later'}
  }


}

export async function logoutUser(): Promise<{
  success: boolean,
  message: string
  }> {
    try {
      await removeAuthCookie();

      return {success: true, message: 'Logout Successfull'}
    } catch (error) {
      return {success: false, message: `Failed to log out, please try again`}
    }

}

export async function loginUser(prevState: ResponseResult,
  formData: FormData)
  :Promise<ResponseResult> {
    try {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      if(!email || !password){
        return { success: false, message: 'Please fill all the fileds' };
      }

      const user = await prisma.user.findUnique({
        where: {email}
      });

      if (!user) {
        return { success: false, message: 'Incorrect email or password' };
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return { success: false, message: 'Incorrect email or password' };
      }
      
      const token = await signAuthToken({userId: user.id})
      await setAuthCookie(token);

      logEvent(
        `User logged in  succcessfully`,
        'auth',
        { userId: user.id, email },
        'info'
      );
      return {success: true, message: 'Successfully Logged In'}
    } catch (error) {
      console.log(`Failed to login error: ${error}`);
      return {success: false, message: 'Failed to log in please try again later'}
    }

}