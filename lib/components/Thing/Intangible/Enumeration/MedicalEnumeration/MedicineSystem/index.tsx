import type BaseProps from "../../../../../../types/index.ts"
import type { MedicineSystem as MedicineSystemProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MedicineSystemProps & BaseProps

export default function MedicineSystem({
	_type = "MedicineSystem",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
