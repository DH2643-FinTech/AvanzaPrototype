import StoreProvider from "./_providers/_storeProvider";
import AuthProvider from "./_providers/_authProvider";
import "./globals.css";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import NavbarPresenter from "./_navbar/navbarPresenter";
import SidebarPresenter from "./_sidebar/sidebarPresenter";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
      </head>
      <body>
        <AuthProvider>
          <StoreProvider>
            <div className="flex flex-col">
              <NavbarPresenter />
              <div className="flex flex-row overflow-hidden">
                <SidebarPresenter />
                {children}
              </div>
            </div>
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
