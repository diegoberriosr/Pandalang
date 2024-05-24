import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// eslint-disable-next-line no-multi-str
const BASELINE_STYLE = 'inline-flex items-center justify-center whitespace-nowrap \
text-sm font-bold ring-offset-background transition-colors focus-visilbe:outline-none focus-visible:ring-2 \
focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide \
border-b-[4px] hover:border-b-[3.75px] active:border-b-0 transition-all duration-500' // 3D effect and clicking animation

const button = cva(BASELINE_STYLE, {
  variants: {
    variant: {
      default : 'border-2 border-slate-200 hover:bg-slate-100 text-slate-500',
      transparent : 'border border-slate-300 hover:bg-slate-100 text-sky-400',
      course : 'border slate-300 hover:bg-slate-100 text-slate-800',
      correct : 'border bg-green-400 border-green-600 hover:bg-green-400/90 text-slate-100',
      unavailable : 'border bg-gray-500 border-gray-700 text-slate-400',
      incorrect : 'border bg-red-400 border-red-600 hover:bg-red-400/90 text-slate-100',
      loginTransparent : 'border border-slate-600 hover:bg-slate-950/90 text-sky-400',
      noOutline : 'border-none hover:bg-slate-100 text-sky-400',
      primary : 'border bg-sky-400 border-sky-600 hover:bg-sky-400/90 text-slate-100', // Blue
      loginPrimary : 'border bg-sky-400 border-sky-600 hover:bg-sky-400/90 text-slate-800',
      secondary : 'border bg-green-500 border-green-700 hover:bg-green-500/90 text-slate-100', // Green
      tertiary : 'border bg-fuchsia-500 border-fuchsia-700 hover:bg-fuchsia-500/90 text-slate-100', // Purple
      yellow : 'border bg-yellow-400 border-yellow-600 hover:bg-yellow-400/90 text-slate-100', // Yellow
      red : 'border bg-red-600 border-red-800 hover:bg-red-600/90 text-slate-100',
      indigo : 'border bg-indigo-600 border-indigo-800 hover:bg-indigo-600/90 text-slate-100'
    },
    size: {
      default : "h-11 px-4 py-2 rounded-xl",
      sm: "h-9 px-3 rounded-xl",
      lg : "h-12 px-8 rounded-xl",
      icon : "h-10 w-10 rounded-xl" ,
      info: 'pb-4 pt-2 h-12 rounded-xl',
      rounded : "rounded-full"
    }
  },
  defaultVariants : {
    variant : "default",
    size : "default"
  }
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  ...props
}) => <button className={button({ variant, size, className })} {...props} />;