import type BaseProps from "../../../../../../types/index.ts"
import type { Resort as ResortProps } from "../../../../../../types/index.ts"

import LodgingBusiness from "../index.tsx"

export type Props = ResortProps & BaseProps

export default function Resort({
	_type = "Resort",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
