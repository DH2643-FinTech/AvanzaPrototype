"use client";
import { redirect } from 'next/navigation';

const DefaultPage = () => {
  redirect('/user/watchlist');
}

export default DefaultPage  