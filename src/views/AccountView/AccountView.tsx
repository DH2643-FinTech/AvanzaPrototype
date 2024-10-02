'use client';
import {
  GoogleLogInButton,
  CredentialAuthButton,
  SignOutButton,
} from '@/src/components/ui/authButtons';
import { useRouter } from 'next/navigation';

const AccountView = () => {
  const router = useRouter();

  return (
    <div>
      <GoogleLogInButton />
      <CredentialAuthButton />
      <SignOutButton />
      <button onClick={() => router.push('/watchlist')}>Go to watchlist</button>
    </div>
  );
};

export default AccountView;
