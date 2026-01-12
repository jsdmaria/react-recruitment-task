import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

const PAGINATION_BUTTON_STYLES =
	'px-3 py-1 border-2 border-primary-400 disabled:opacity-50 focus:outline focus:outline-2 shadow-[2px_2px_0_0_theme(colors.primary.300)]';

const PaginationButton = ({
	children,
	disabled,
	isActive = false,
	...props
}: PropsWithChildren<
	ButtonHTMLAttributes<HTMLButtonElement> & {
		isActive?: boolean;
	}
>) => {
	return (
		<button
			type="button"
			className={twMerge(
				PAGINATION_BUTTON_STYLES,
				disabled && 'opacity-50 focus:outline-none',
				isActive && 'font-bold bg-primary-400 text-white',
				''
			)}
			{...props}
		>
			{children}
		</button>
	);
};

export default PaginationButton;
