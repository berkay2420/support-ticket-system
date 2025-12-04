'use server';
import {prisma} from '@/db/prisma';
import bcrypt from 'bcryptjs';
import { signAuthToken, setAuthCookie, removeAuthCookie } from '@/lib/auth';
import { logEvent } from '@/utils/sentry';
import { createAuditLog } from './log.actions';


type ResponseResult = {
  success: boolean,
  message: string,
  errors?: string[];
}

const PASSWORD_MIN_LENGTH = 8;

const PASSWORD_REQUIREMENTS = {
  minLength: PASSWORD_MIN_LENGTH,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumbers: /[0-9]/,
  hasSpecialChars: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
};


function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < PASSWORD_REQUIREMENTS.minLength) {
    errors.push(`Password must be at least ${PASSWORD_REQUIREMENTS.minLength} characters long`);
  }

  if (!PASSWORD_REQUIREMENTS.hasUppercase.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!PASSWORD_REQUIREMENTS.hasLowercase.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!PASSWORD_REQUIREMENTS.hasNumbers.test(password)) {
    errors.push('Password must contain at least one number');
  }

  if (!PASSWORD_REQUIREMENTS.hasSpecialChars.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*, etc.)');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}


export async function registerUser(
  prevState: ResponseResult, 
  formData: FormData
): Promise<ResponseResult>{

  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const department = formData.get('department') as string;
    
    if(!name || !email || !password || !department){
      return { success: false, message: 'Please fill all the fileds' };
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return {
        success: false,
        message: `Password is not strong enough:`,
        errors: passwordValidation.errors
      };
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
        department: department
      }
    })

    await createAuditLog(
      user.id,
      'Registered',
      'User',
      user.id,
      user.name || 'Unknown',
      'User registered'
    );

    const payload = {
      userId: user.id,
      name: user.name,
      email: user.email,
      department: user.department,
      isAdmin: user.isAdmin
    }
    const token = await signAuthToken(payload);
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
      
      const payload = {
        userId: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        isAdmin: user.isAdmin
      }
      const token = await signAuthToken(payload);
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