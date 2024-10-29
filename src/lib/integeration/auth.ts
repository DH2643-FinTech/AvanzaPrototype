import {
	NextAuthOptions,
	RequestInternal,
} from "next-auth";


import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import clientPromise from "./mongodb";
import bcrypt from "bcrypt";
import { User } from "@/../interfaces";
import { ObjectId } from "mongodb";

declare module "next-auth" {
	interface Session {
		id: string;
		email: string;
	}
}

export const authConfig: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: "Sign in",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "example@email.com",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},

			async authorize(
				credentials: Record<"email" | "password", string> | undefined,
				req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
			) {
				if (!credentials || !credentials.email || !credentials.password) {
					throw new Error("No credentials provided");
				}

				const client = await clientPromise;
				const db = client.db("database");

				const user = (await db.collection<User>("users").findOne({
					email: credentials.email,
				})) as User;

				if (!user) {
					throw new Error("No user found");
				}

				const isValid = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!isValid) {
					return null;
				}
				return { id: user._id.toString(), name: user.name, email: user.email };
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID! as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
		}),
		// GithubProvider({
		//     clientId: process.env.GITHUB_CLIENT_ID,
		//     clientSecret: process.env.GITHUB_CLIENT_SECRET,
		// })
	],

	callbacks: {
		async jwt({ token, user }) {
			if (token && !!token.email) {
				const client = await clientPromise;
				const db = client.db("database");
				const existingUser = await db
					.collection<User>("users")
					.findOne({ email: token.email });

				if (!existingUser) {
					await db.collection<User>("users").insertOne({
						_id: new ObjectId(),
						email: token.email,
						name: token.name ?? "No name",
						password: "",
						provider: "google",
					});
				}
			}
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
			}

			return token;
		},
		async session({ session, token }) {
			if (!session.user || !session.user.email) {
				return session;
			}

			const client = await clientPromise;
			const db = client.db("database");
			const existingUser = await db
				.collection<User>("users")
				.findOne({ email: session.user.email });

			if (!existingUser) {

				return session;
			}
			const newSession = {
				...session,
				id: existingUser._id.toString(),
				name: token.name,
				email: token.email,
				user: {
					id: existingUser._id.toString(),
					name: existingUser.name,
					email: existingUser.email,
				},
			};
			return newSession;
		},
	},
	session: {
		strategy: "jwt",
	},
};
