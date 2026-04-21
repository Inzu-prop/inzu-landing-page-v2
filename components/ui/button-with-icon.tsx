import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    )
  },
)
Button.displayName = "Button"

interface InzuButtonProps {
  label?: string
  href?: string
  onClick?: () => void
  className?: string
}

const InzuRequestButton = ({
  label = "Request Early Access",
  href,
  onClick,
  className,
}: InzuButtonProps) => {
  const inner = (
    <Button
      onClick={onClick}
      className={cn(
        // Base shape
        "relative font-body text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14",
        // Inzu brand colors: sage background, obsidian text
        "bg-[#90B494] text-[#13270D]",
        // The sliding arrow bubble uses obsidian bg + silk text on rest,
        // flips to silk bg + obsidian text on hover to signal the action
        // Transition
        "group transition-all duration-500 hover:ps-14 hover:pe-6",
        "w-fit overflow-hidden cursor-pointer",
        // Hover state brightens to silk
        "hover:bg-[#F5F7F6]",
        className
      )}
    >
      <span className="relative z-10 transition-all duration-500 tracking-wide">
        {label}
      </span>
      {/* Arrow bubble — obsidian circle with silk arrow, slides left on hover */}
      <div className="absolute right-1 w-10 h-10 bg-[#13270D] text-[#F5F7F6] rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </div>
    </Button>
  )

  if (href) {
    return <Link to={href}>{inner}</Link>
  }

  return inner
}

export { InzuRequestButton }
