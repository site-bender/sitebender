import type BaseProps from "../../../../types/index.ts"
import type { VirtualLocation as VirtualLocationProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = VirtualLocationProps & BaseProps

export default function VirtualLocation({
	_type = "VirtualLocation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
