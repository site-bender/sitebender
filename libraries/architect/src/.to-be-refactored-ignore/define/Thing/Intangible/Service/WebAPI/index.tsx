import type BaseProps from "../../../../../../types/index.ts"
import type { WebAPI as WebAPIProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = WebAPIProps & BaseProps

export default function WebAPI({
	_type = "WebAPI",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
