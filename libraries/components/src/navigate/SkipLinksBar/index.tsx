import createElement from "../../helpers/createElement/index.ts"

export type Props = JSX.HTMLAttributes<HTMLUListElement> & {
	classes?: Array<string>
	links: Array<{ href: string; label: string; title?: string }>
}

export default function SkipLinksBar({ classes = [], links, ...props }: Props) {
	const clss = [...classes, "skip-links-bar"].join(" ")

	return (
		<nav class={clss}>
			<span>Skip to:</span>
			<ul {...props}>
				{links.map((
					{ href, label, title }: {
						href: string
						label: string
						title?: string
					},
				) => (
					<li>
						<a href={href} title={title}>
							{label}
						</a>
					</li>
				))}
			</ul>
		</nav>
	)
}
