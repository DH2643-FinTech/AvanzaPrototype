// @/src/views/WatchlistView/WatchlistView.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WatchlistTable from "@/src/components/WatchlistTable";
import ToggleSingInSignUpForm from "@/src/components/ui/toggleSingInSignUpForm";
import { signIn } from "next-auth/react";

export default function WatchlistView() {
	const { data: session, status } = useSession();

	const handleSignIn = async (credProps: any) => {
		if (credProps.method === "google") {
			const response = await signIn("google");
			// console.log("success", response);
			return response;
		} else {
			const signInResponse = await signIn("credentials", {
				email: credProps.email,
				password: credProps.password,
				redirect: false,
			});
			return signInResponse;
		}
	};

	const handleSignUp = async (credProps: any) => {
		if (credProps.method === "google") {
			const response = await signIn("google");
			// console.log("success", response);
			return response;
		} else {
			const res = await fetch("/api/register", {
				method: "POST",
				body: JSON.stringify({
					email: credProps.email,
					password: credProps.password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			return res;
		}
	};

	return (
		<div className="flex flex-col h-screen bg-white w-full">
			<div className="flex flex-1 overflow-hidden">
				<main className="flex-1 p-6 overflow-auto">
					<h1 className="text-3xl font-bold mb-6">Watchlist</h1>
					{status === "loading" ? (
						<div>Loading...</div>
					) : status === "unauthenticated" ? (
						<div className="text-center py-10">
							<h2 className="text-2xl font-bold mb-4">
								Please sign in to view your watchlist
							</h2>
							{/* <Button onClick={() => router.push('/sign-in')}>Sign In</Button> */}
							<div className="flex w-full justify-center justify-items-center">
								<ToggleSingInSignUpForm
									signIn={handleSignIn}
									signUp={handleSignUp}
								/>
							</div>
						</div>
					) : (
						<WatchlistTable />
					)}
				</main>
			</div>
		</div>
	);
}
