import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

export const PAGINATION_BUTTON_STYLES =
	'px-3 py-1 border-2 border-primary-400 disabled:opacity-50 focus:outline focus:outline-2 focus:outline-green-500 shadow-[2px_2px_0_0_theme(colors.primary.300)]';

const PaginationButton = ({
	children,
	disabled,
	...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
	return (
		<button
			type="button"
			disabled={disabled}
			className={twMerge(
				PAGINATION_BUTTON_STYLES,
				disabled && 'opacity-50 focus:outline-none cursor-not-allowed'
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default PaginationButton;
