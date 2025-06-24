import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
const classnames = (...classes: ClassValue[]) => twMerge(clsx(...classes));

export default classnames;
