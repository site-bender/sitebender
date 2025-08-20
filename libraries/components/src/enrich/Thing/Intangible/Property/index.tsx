import type BaseProps from "../../../../types/index.ts"
import type { Property as PropertyProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = PropertyProps & BaseProps

export default function Property({
	_type = "Property",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
