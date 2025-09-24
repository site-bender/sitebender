import type BaseProps from "../../../../../types/index.ts"
import type { WebSite as WebSiteProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = WebSiteProps & BaseProps

export default function WebSite({
	_type = "WebSite",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
