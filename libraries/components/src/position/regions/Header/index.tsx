import { SKIP_LINKS } from "@sitebender/toolkit/constants/skip-links/index.ts"

import createElement from "../../../helpers/createElement/index.ts"
import Fragment from "../../../helpers/Fragment/index.ts"
import SkipLinksBar from "../../../navigate/SkipLinksBar/index.tsx"
import Logo from "../../Logo/index.tsx"

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
