import { cn } from "@/lib/utils"

interface AnimatedPillButtonProps {
  text?: string
  className?: string
  onClick?: () => void
}

export function AnimatedPillButton({
  text = "Get Started",
  className,
  onClick,
}: AnimatedPillButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-full bg-foreground px-8 py-3 text-background font-medium tracking-wide transition-shadow duration-300 hover:shadow-lg hover:shadow-foreground/20",
        className
      )}
    >
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
    </button>
  )
}
