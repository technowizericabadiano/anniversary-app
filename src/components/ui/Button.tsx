import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function Button({ className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-white/30 bg-white/88 px-5 py-3 text-sm font-semibold uppercase text-[#3b2430] shadow-[0_18px_46px_rgba(95,54,74,0.16)] backdrop-blur-md transition duration-300 hover:-translate-y-[2px] hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/70 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:scale-100 ${className}`}
      {...props}
    />
  );
}
