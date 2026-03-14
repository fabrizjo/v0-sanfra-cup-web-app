"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SlideTextButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  hoverText?: string;
  href?: string;
  className?: string;
  variant?: "default" | "ghost" | "whatsapp";
  external?: boolean;
}

export default function SlideTextButton({
  text = "Browse Components",
  hoverText,
  href = "/",
  className,
  variant = "default",
  external = false,
  ...props
}: SlideTextButtonProps) {
  const slideText = hoverText ?? text;
  const variantStyles =
    variant === "ghost"
      ? "border border-black/10 text-black hover:bg-black/5 dark:border-white/10 dark:text-white dark:hover:bg-white/5"
      : variant === "whatsapp"
      ? "bg-green-500 text-white hover:bg-green-600"
      : "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90";

  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <motion.div
      animate={{ x: 0, opacity: 1, transition: { duration: 0.2 } }}
      className="relative"
      initial={{ x: 0, opacity: 1 }}
    >
      <a
        className={cn(
          "group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full px-8 font-medium text-md tracking-tighter transition-all duration-300 md:min-w-56",
          variantStyles,
          className
        )}
        href={href}
        {...linkProps}
        {...props}
      >
        <span className="relative inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          <span className="flex items-center gap-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
            <span className="font-medium">{text}</span>
          </span>
          <span className="absolute top-full left-0 flex items-center gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="font-medium">{slideText}</span>
          </span>
        </span>
      </a>
    </motion.div>
  );
}
