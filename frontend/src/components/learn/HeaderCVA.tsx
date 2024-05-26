import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

// eslint-disable-next-line no-multi-str
const BASELINE_STYLE = 'flex items-center justify-between'

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
      default : "w-full h-20 p-5 rounded-xl"
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

export const Header: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  ...props
}) => <button className={button({ variant, size, className })} {...props} />;