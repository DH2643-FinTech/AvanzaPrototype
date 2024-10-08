import { CredentialAuthButton, GoogleLogInButton } from "./ui/authButtons";


export const SignInComp = () => {
    return (
      <div className=" h-[600px] justify-center items-center border border-black flex flex-col">
        <div>
          <GoogleLogInButton />
        </div>
        <div className="mt-10 flex flex-col justify-center items-center">
          <div className="flex justify-between items-center">
            <div className="border border-blue-600 w-[200px]"></div>
            <div className="w-[100px] justify-center items-center text-center">
              OR
            </div>
            <div className="border border-blue-600 w-[200px]"></div>
          </div>
          <CredentialAuthButton />
        </div>
      </div>
    );
  };