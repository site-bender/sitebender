import type BaseProps from "../../../../../types/index.ts"
import type { WebPageElement as WebPageElementProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = WebPageElementProps & BaseProps

export default function WebPageElement({
	_type = "WebPageElement",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
