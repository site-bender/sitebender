import type { MenuItem } from "../../../types/components/navigation/index.ts"

export type Props = JSX.MenuHTMLAttributes<HTMLMenuElement> & {
	options: Array<MenuItem>
	route?: string
}

export default function Menu({ options, route, ...props }: Props) {
	return (
		<nav class="dropdown" id="primary-navigation">
			<header>
				<h1 class="sr-only">Navigation</h1>
				<label
					id="menu-icon"
					for="menu-toggle"
					title="Space bar to toggle menu."
				>
					<span class="menu-icon open">≡</span>
					<span class="menu-icon close">✕</span>
					<input type="checkbox" id="menu-toggle" />
				</label>
			</header>
			<menu class="menu" {...props}>
				{options.map(({ disabled, href, id, label }: MenuItem) => {
					const idAttr = id ? { id } : {}
					return (
						<li>
							{disabled
								? (
									<span data-disabled {...idAttr}>
										{label}
									</span>
								)
								: href === route
								? (
									<span aria-current="page" class="this-page" {...idAttr}>
										{label}
									</span>
								)
								: (
									<a href={href} {...idAttr}>
										{label}
									</a>
								)}
						</li>
					)
				})}
			</menu>
		</nav>
	)
}
