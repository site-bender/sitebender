import AuxWrapper from "../../../navigate/AuxWrapper/index.tsx"

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
