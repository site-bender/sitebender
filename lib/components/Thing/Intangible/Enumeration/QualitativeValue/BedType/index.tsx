import type BaseProps from "../../../../../../types/index.ts"
import type { BedType as BedTypeProps } from "../../../../../../types/index.ts"

import QualitativeValue from "../index.tsx"

export type Props = BedTypeProps & BaseProps

export default function BedType({
	_type = "BedType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
