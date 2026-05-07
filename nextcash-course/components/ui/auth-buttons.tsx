"use client";

import { useAuth } from "@clerk/nextjs";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import UserDropdown from "@/app/user-dropdown";

export default function AuthButtons() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <UserDropdown />; // ✅ signed in হলে এটা দেখাবে
  }

  return (
    <div className="flex gap-2">
      <SignInButton mode="modal">
        <Button variant="outline" className="text-black">Sign In</Button>
      </SignInButton>
      <SignUpButton mode="modal">
        <Button>Sign Up</Button>
      </SignUpButton>
    </div>
  );
}