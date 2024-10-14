"use client";
import { redirect } from 'next/navigation';

// Redirect to /overview since we dont use this page for anything (yet?)
const DefaultPage = () => {
  redirect('/overview');
}

export default DefaultPage  