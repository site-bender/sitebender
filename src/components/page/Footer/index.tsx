import AuxWrapper from "~components/wrappers/AuxWrapper/index.tsx"

import createElement from "~utilities/createElement/index.ts"

export type Props = JSX.HTMLAttributes<HTMLElement> & {
	route: string
}

export default function Footer({ children, route, ...props }: Props) {
	return (
		<footer class="page-footer" id="page-footer" {...props}>
			<p>
				&copy; 2025 <span class="asl">A Storied Life</span>
			</p>
			{children}
			<AuxWrapper route={route} />
		</footer>
	)
}
