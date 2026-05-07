"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { ChartColumnBigIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const router = useRouter();
  const { user } = useUser();

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-white">{user?.fullName}</span>
        <span className="text-xs text-white/70">
          {user?.primaryEmailAddress?.emailAddress}
        </span>
      </div>
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarBox: {
              width: 36,
              height: 36,
            },
          },
        }}
      >
        <UserButton.MenuItems>
          <UserButton.Action
            label="Dashboard"
            labelIcon={<ChartColumnBigIcon size={16} />}
            onClick={() => {
              router.push("/dashboard");
            }}
          />
        </UserButton.MenuItems>
      </UserButton>

      {/* Image + Email */}
    </div>
  );
}
