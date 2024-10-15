// import * as React from "react";
// import { AuthProvider, SignInPage } from "@toolpad/core";
// import { createTheme } from "@mui/material/styles";
// // import { useColorSchemeShim } from 'docs/src/modules/components/ThemeContext';
// // import { getDesignTokens } from './brandingTheme';

// const signIn: (provider: AuthProvider) => void = async (provider) => {
//   const promise = new Promise<void>((resolve) => {
//     setTimeout(() => {
//       console.log(`Sign in with ${provider.id}`);
//       console.log(provider);

//       resolve();
//     }, 500);
//   });
//   return promise;
// };

// export default function ThemeSignInPage() {
//   //   const { mode, systemMode } = useColorSchemeShim();
//   //   const calculatedMode = (mode === 'system' ? systemMode : mode) ?? 'light';
//   //   const brandingDesignTokens = getDesignTokens(calculatedMode);
//   //   // preview-start
//   //   const THEME = createTheme({
//   //     ...brandingDesignTokens,
//   //     palette: {
//   //       ...brandingDesignTokens.palette,
//   //       mode: calculatedMode,
//   //     },
//   //   });
//   // preview-end

//   return (
//     // preview-start
//     // <AppProvider theme={THEME}>
//     <SignInPage
//       signIn={signIn}
//       providers={[
//         { id: "github", name: "GitHub" },
//         { id: "google", name: "Google" },
//         { id: "credentials", name: "Email and Password" },
//       ]}
//     />
//     // </AppProvider>
//     // preview-end
//   );
// }
