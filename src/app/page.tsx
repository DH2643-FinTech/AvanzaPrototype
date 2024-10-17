"use client";
import { redirect } from 'next/navigation';

const DefaultPage = () => {
  redirect('/overview');
}

export default DefaultPage  