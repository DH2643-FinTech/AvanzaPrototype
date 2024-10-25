import NextAuth from 'next-auth'
import { AuthOptions } from 'next-auth';
import { authConfig } from "@/lib/features/auth/auth";


const handler = NextAuth(authConfig);

export {handler as GET, handler as POST}