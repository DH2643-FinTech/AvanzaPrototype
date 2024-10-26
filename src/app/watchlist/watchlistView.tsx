// @/views/WatchlistView/WatchlistView.tsx
import WatchlistTable from "@/components/WatchlistTable";
import ToggleSingInSignUpForm from "@/components/ui/toggleSingInSignUpForm";

// const RenderSignIn = ({
// 	handleSignIn,
// 	handleSignUp,
//   }: {
// 	handleSignIn: any;
// 	handleSignUp: any;
//   }) => (
// 	<div className="text-center py-10">
// 	  <h2 className="text-2xl font-bold mb-4">
// 		Please sign in to view your watchlist
// 	  </h2>
// 	  {/* <Button onClick={() => router.push('/sign-in')}>Sign In</Button> */}
// 	  <div className="flex w-full justify-center justify-items-center">
// 		<ToggleSingInSignUpForm signIn={handleSignIn} signUp={handleSignUp} />
// 	  </div>
// 	</div>
//   );

const WatchlistView = (props: any) => {
//   const { status, signUp, signIn } = props;
  const { status } = props;
//   const handleSignIn = async (credProps: any) => {
//     return signIn(credProps);
//   };

//   const handleSignUp = async (credProps: any) => {
//     return signUp(credProps);
//   };

  return (
    <div className="flex flex-col h-screen bg-white w-full">
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-auto">
          <h1 className="text-3xl font-bold mb-6">Watchlist</h1>
          {status === "loading" && <div>Loading...</div>}
          {status === "unauthenticated" && (
            <h2 className="text-2xl text-center pt-[200px] font-bold mb-4">
              Please log in to view your watchlist
            </h2>
            // <RenderSignIn
            //   handleSignIn={handleSignIn}
            //   handleSignUp={handleSignUp}
            // />
          )}
          {status === "authenticated" && <WatchlistTable />}
        </main>
      </div>
    </div>
  );
};
export default WatchlistView;
