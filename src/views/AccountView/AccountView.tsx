'use client';
import { SignInComp } from '@/src/components/signInComp';
import { SignUpComp } from '@/src/components/signUpComp';
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
      {/* <GoogleLogInButton /> */}
      {/* <CredentialAuthButton /> */}
      <SignInComp />
      {/* <SignUpComp /> */}
      {/* <SignOutButton /> */}
      <button onClick={() => router.push('/watchlist')}>Go to watchlist</button>
    </div>
  );
};

export default AccountView;
