'use client';
//import { SignInComp } from '@/components/signInComp';
import { SignUpComp } from '@/components/signUpComp';
import {
  GoogleLogInButton,
  CredentialAuthButton,
  SignOutButton,
} from '@/components/ui/authButtons';
import { useRouter } from 'next/navigation';

const AccountView = () => {
  const router = useRouter();

  return (
    <div>
      {/* <GoogleLogInButton /> */}
      {/* <CredentialAuthButton /> */}
      {/* <SignInComp /> */ }
      {/* <SignUpComp /> */}
      {/* <SignOutButton /> */}
      <button onClick={() => router.push('/watchlist')}>Go to watchlist</button>
    </div>
  );
};

export default AccountView;
