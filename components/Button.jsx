import Link from "next/link";
import clsx from "clsx";

export function Button({ href, className, ...props }) {
  return href ? (
    <Link href={href} className={`inline-flex justify-center rounded-2xl bg-blue-600 p-4 text-base font-semibold text-white ${props.disabled ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-blue-500'} focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70`} {...props} />
  ) : (
    <button className={`inline-flex justify-center rounded-2xl bg-blue-600 p-4 text-base font-semibold text-white ${props.disabled ? 'bg-gray-500 cursor-not-allowed' : 'hover:bg-blue-500'} focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-white/70`} {...props} />
  );
}
