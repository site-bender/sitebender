import type BaseProps from "../../../../../types/index.ts"
import type { Pharmacy as PharmacyProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PharmacyProps & BaseProps

export default function Pharmacy({
	_type = "Pharmacy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
