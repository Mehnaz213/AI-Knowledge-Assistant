import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    `
  inline-flex
  shrink-0
  items-center
  justify-center
  whitespace-nowrap
  rounded-xl
  text-sm
  font-medium
  transition-all
  duration-300
  ease-out
  outline-none
  select-none

  hover:scale-[1.02]
  active:scale-[0.98]

  focus-visible:border-ring
  focus-visible:ring-2
  focus-visible:ring-cyan-400/40

  disabled:pointer-events-none
  disabled:opacity-50

  [&_svg]:pointer-events-none
  [&_svg]:shrink-0
  [&_svg:not([class*='size-'])]:size-4
`,
    {
        variants: {
            variant: {
                default: `
          bg-gradient-to-r
          from-blue-500
          to-cyan-500
          text-white
          shadow-lg
          shadow-cyan-500/20
          hover:from-blue-600
          hover:to-cyan-600
        `,

                outline: `
          border
          border-border
          bg-background/50
          backdrop-blur-xl
          hover:bg-white/5
          hover:border-cyan-400/40
        `,

                secondary: `
          bg-secondary
          text-secondary-foreground
          hover:bg-secondary/90
        `,

                ghost: `
          hover:bg-white/5
          hover:text-foreground
        `,

                destructive: `
          bg-red-500/10
          text-red-400
          hover:bg-red-500/20
        `,

                link: `
          text-primary
          underline-offset-4
          hover:underline
        `,
            },

            size: {
                default: 'h-10 px-4 gap-2',

                xs: 'h-7 px-2 text-xs',

                sm: 'h-8 px-3 text-sm',

                lg: 'h-12 px-6 text-base',

                icon: 'h-10 w-10',

                'icon-xs': 'h-7 w-7',

                'icon-sm': 'h-8 w-8',

                'icon-lg': 'h-12 w-12',
            },
        },

        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

function Button({
    className,
    variant,
    size,
    ...props
}: ButtonPrimitive.Props &
    VariantProps<typeof buttonVariants>) {
    return (
        <ButtonPrimitive
            data-slot="button"
            className={cn(
                buttonVariants({
                    variant,
                    size,
                    className,
                })
            )}
            {...props}
        />
    );
}

export { Button, buttonVariants };