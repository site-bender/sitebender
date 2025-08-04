import type BaseProps from "../../../../../types/index.ts"
import type { WebApplication as WebApplicationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = WebApplicationProps & BaseProps

export default function WebApplication({
	_type = "WebApplication",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
