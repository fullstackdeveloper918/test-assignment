"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import nookies from "nookies";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/components/dropdown";
import {
  ArrowRightStartOnRectangleIcon,
  Bars2Icon,
  Bars3Icon,
  ChevronDownIcon,
  Cog8ToothIcon,
  InformationCircleIcon,
  MoonIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
  useAuth,
} from "@clerk/nextjs";

import shadesOfPurple from "@clerk/themes";
import { useEffect, useState } from "react";
const inter = Inter({ subsets: ["latin"] });

function CustomUserButton() {
  return (
    <UserButton className="text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg p-2" />
  );
}
function CustomSignIn() {
  return (
    <SignIn
      routing="hash"
      appearance={{
        baseTheme: shadesOfPurple,
      }}
    />
  );
}
function TokenLogger() {
  const { getToken } = useAuth();

  useEffect(() => {
    const saveTokenToCookies = async () => {
      const token = await getToken();
      if (token) {
        // Save the token in cookies using nookies
        nookies.set(null, "userToken", token, {
          path: "/",
          maxAge: 432000, // 5 days
          secure: true,
          sameSite: "strict",
        });
        console.log("User token saved in cookies:", token);
      }
    };

    saveTokenToCookies();
  }, [getToken]);

  return null;
}
export default function RootLayout({ children }) {
  const [open, setIsOpen] = useState(false);
  return (
    <ClerkProvider appearance={{ baseTheme: shadesOfPurple }}>
      <html lang="en">
        <body className={inter.className}>
          <header className="flex items-center justify-between p-4 gap-x-3 bg-black">
            <div onClick={() => setIsOpen(!open)}>
              <Bars3Icon className="size-6 block lg:hidden" />
            </div>
            <div className="header_div">
              <Dropdown>
                <DropdownButton outline>
                  Catalyst
                  <ChevronDownIcon />
                </DropdownButton>
                {open && (
                  <DropdownMenu anchor="bottom">
                    <DropdownItem href="#">
                      <UserIcon />
                      <DropdownLabel>Account</DropdownLabel>
                    </DropdownItem>
                    <DropdownItem href="#">
                      <Cog8ToothIcon />
                      <DropdownLabel>Settings</DropdownLabel>
                    </DropdownItem>
                    <DropdownItem href="#">
                      <InformationCircleIcon />
                      <DropdownLabel>Help center</DropdownLabel>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="#">
                      <MoonIcon />
                      <DropdownLabel>Dark mode</DropdownLabel>
                    </DropdownItem>
                    <DropdownDivider />
                    <DropdownItem href="#">
                      <ArrowRightStartOnRectangleIcon />
                      <DropdownLabel>Sign out</DropdownLabel>
                    </DropdownItem>
                  </DropdownMenu>
                )}
              </Dropdown>
            </div>

            <CustomUserButton />
          </header>
          <main className="flex justify-center min-h-screen bg-black">
            <div className="flex items-center justify-center min-h-screen bg-black">
              <SignedOut>
                <CustomSignIn />
              </SignedOut>
            </div>
            <SignedIn>
              <TokenLogger />
              {children}
            </SignedIn>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
