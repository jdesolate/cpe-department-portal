"use client";

import { useState } from "react";
import Image from "next/image";

// Looks for /public/faculty/{id}.png; falls back to the initials circle
// if that photo hasn't been added yet, so photos can be dropped in one at a time.
export default function FacultyAvatar({
  id,
  name,
  initials,
}: {
  id: string;
  name: string;
  initials: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className="w-14 h-14 rounded-full bg-maroon-bright flex items-center justify-center text-background font-display font-semibold text-lg shrink-0">
        {initials}
      </div>
    );
  }

  return (
    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 bg-maroon-bright">
      <Image
        src={`/faculty/${id}.png`}
        alt={name}
        fill
        sizes="56px"
        className="object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  );
}
