export type Props = JSX.HTMLAttributes<HTMLDivElement> & {
	route: string
}

export default function Logo({ route, ...props }: Props) {
	return (
		<div class="logo" {...props}>
			{route === "/"
				? <span>A Storied Life</span>
				: (
					<a href="/" title="To the home page">
						A Storied Life
					</a>
				)}
		</div>
	)
}
