"use client";
import { redirect } from 'next/navigation';

const DefaultPage = () => {
  redirect('/company/overview');
}

export default DefaultPage  