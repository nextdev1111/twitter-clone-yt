import Image from "next/image";
import React from "react";
import { LineWobble } from "@uiball/loaders";

function LoadingPage() {
  return (
    <div className="min-h-screen grid place-items-center">
      {/* Twitter Icon */}
      <div>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"
          width={100}
          height={90}
          layout="fixed"
          priority={true}
          quality={100}
          className=""
        />

        <div className="mt-10">
          <LineWobble size={80} lineWeight={5} speed={1.75} color="#1D9BF0" />
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
