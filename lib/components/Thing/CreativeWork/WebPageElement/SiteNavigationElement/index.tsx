import type BaseProps from "../../../../../types/index.ts"
import type { SiteNavigationElement as SiteNavigationElementProps } from "../../../../../types/index.ts"

import WebPageElement from "../index.tsx"

export type Props = SiteNavigationElementProps & BaseProps

export default function SiteNavigationElement({
	_type = "SiteNavigationElement",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
