import type BaseProps from "../../../../../types/index.ts"
import type { AboutPage as AboutPageProps } from "../../../../../types/index.ts"

import WebPage from "../index.tsx"

export type Props = AboutPageProps & BaseProps

export default function AboutPage({
	_type = "AboutPage",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
