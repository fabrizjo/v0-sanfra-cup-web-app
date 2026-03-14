import { cn } from "@/lib/utils"
import Link from "next/link"

interface AnimatedPillButtonProps {
  text?: string
  className?: string
  onClick?: () => void
  href?: string
}

export function AnimatedPillButton({
  text = "Get Started",
  className,
  onClick,
  href,
}: AnimatedPillButtonProps) {
  const buttonClasses = cn(
    "group relative overflow-hidden rounded-full bg-foreground px-8 py-3 text-background font-medium tracking-wide transition-shadow duration-300 hover:shadow-lg hover:shadow-foreground/20",
    className
  )

  const content = (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="flex">
        {text.split("").map((letter, index) => {
          const isFromTop = index % 2 === 0
          return (
            <span
              key={`${letter}-${index}`}
              className="relative inline-block h-5 overflow-hidden"
              style={{ width: letter === " " ? "0.25em" : "auto" }}
            >
              <span
                className={cn(
                  "inline-block transition-transform duration-300 ease-out",
                  isFromTop
                    ? "group-hover:-translate-y-full"
                    : "group-hover:translate-y-full"
                )}
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
              <span
                className={cn(
                  "absolute left-0 top-0 inline-block transition-transform duration-300 ease-out",
                  isFromTop
                    ? "translate-y-full group-hover:translate-y-0"
                    : "-translate-y-full group-hover:translate-y-0"
                )}
                style={{ transitionDelay: `${index * 25}ms` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            </span>
          )
        })}
      </span>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    )
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
    >
      {content}
    </button>
  )
}
