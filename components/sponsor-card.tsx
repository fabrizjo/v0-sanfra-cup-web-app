"use client";

import { ArrowRight, Repeat2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface SponsorCardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  backText?: string;
  features?: string[];
  image?: string;
}

export default function SponsorCard({
  title = "Sponsor",
  subtitle = "Partner ufficiale",
  description = "Scopri di più su questo sponsor.",
  backText,
  features = [],
  image,
}: SponsorCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[320px] w-[280px] min-w-[280px] [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          "relative h-full w-full",
          "[transform-style:preserve-3d]",
          "transition-all duration-700",
          isFlipped
            ? "[transform:rotateY(180deg)]"
            : "[transform:rotateY(0deg)]"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(0deg)]",
            "overflow-hidden rounded-2xl",
            "bg-white",
            "border-2 border-yellow-500/30",
            "shadow-lg shadow-yellow-500/10",
            "transition-all duration-700",
            "group-hover:shadow-xl group-hover:shadow-yellow-500/20 group-hover:border-yellow-500/50",
            isFlipped ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="relative h-full overflow-hidden bg-white flex items-center justify-center">
            {image && (
              <div className="flex items-center justify-center p-8">
                <Image
                  src={image}
                  alt={title}
                  width={200}
                  height={200}
                  className="object-contain max-h-[200px] w-auto"
                />
              </div>
            )}
          </div>

          </div>

{/* Back of card */}
        <div
          className={cn(
            "absolute inset-0 h-full w-full",
            "[backface-visibility:hidden] [transform:rotateY(180deg)]",
            "rounded-2xl p-6",
            "bg-gradient-to-b from-neutral-900 to-black",
            "border border-yellow-500/20",
            "shadow-xs dark:shadow-lg",
            "flex flex-col",
            "transition-all duration-700",
            "group-hover:shadow-lg group-hover:shadow-yellow-500/10 dark:group-hover:shadow-xl",
            isFlipped ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <h3 className="font-semibold text-xl text-white leading-snug tracking-tight mb-4">
              {title}
            </h3>
            <p className="text-lg text-yellow-400 italic">
              {backText || subtitle}
            </p>
          </div>

          
        </div>
      </div>
    </div>
  );
}
