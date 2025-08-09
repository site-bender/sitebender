import { SKIP_LINKS } from "../../../constants/skip-links/index.ts"
import createElement from "../../../utilities/createElement/index.ts"
import { Fragment } from "../../../utilities/createElement/index.ts"
import SkipLinksBar from "../../navigation/SkipLinksBar/index.tsx"
import Logo from "../Logo/index.tsx"

export type Props = JSX.HTMLAttributes<HTMLElement> & {
	route: string
}

export default function Header({ children, route, ...props }: Props) {
	return (
		<>
			<SkipLinksBar links={SKIP_LINKS} />
			<header class="page-header" {...props}>
				<Logo route={route} />
				{children}
			</header>
		</>
	)
}
