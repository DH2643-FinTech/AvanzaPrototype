import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials:{
                username:{
                    label: "Username",
                    type: "text",
                    placeholder: "jsmith",
                },
                password:{
                    label: "Password",
                    type: "password",
                    placeholder: "your-passwrod",
                }
                
            },
            async authorize(credentials){
                const user = {id: "1", name: "J Smith", password: "password"};
                if(credentials?.username === user.name && credentials?.password === user.password){
                    return { id: user.id, name: user.name };
                }else{
                    return null;
                }
        }})
    ]
};