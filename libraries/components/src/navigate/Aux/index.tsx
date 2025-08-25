import type { MenuItem } from "../../../../types/components/navigation/index.ts"

import createElement from "../../../utilities/createElement/index.ts"

export type Props = JSX.MenuHTMLAttributes<HTMLMenuElement> & {
	options?: Array<MenuItem>
	route?: string
}

export default function Aux({
	options = [],
	route,
	...props
}: Props): JSX.Element {
	return (
		<nav aria-labelledby="aux-nav-heading" class="aux">
			<h2 class="sr-only" id="aux-nav-heading">
				Auxiliary navigation
			</h2>
			<menu {...props}>
				{options.map(({ disabled, href, label }) => {
					return (
						<li>
							{disabled
								? <span data-disabled>{label}</span>
								: href === route
								? (
									<span class="this-page" aria-current="page">
										{label}
									</span>
								)
								: <a href={href}>{label}</a>}
						</li>
					)
				})}
			</menu>
		</nav>
	)
}
