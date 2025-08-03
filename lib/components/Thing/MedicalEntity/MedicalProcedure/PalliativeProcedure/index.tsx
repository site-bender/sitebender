import type BaseProps from "../../../../../types/index.ts"
import type { PalliativeProcedure as PalliativeProcedureProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = PalliativeProcedureProps & BaseProps

export default function PalliativeProcedure({
	_type = "PalliativeProcedure",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
