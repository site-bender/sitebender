import type BaseProps from "../../../../../../types/index.ts"
import type { OfficeEquipmentStore as OfficeEquipmentStoreProps } from "../../../../../../types/index.ts"

import Store from "../index.tsx"

export type Props = OfficeEquipmentStoreProps & BaseProps

export default function OfficeEquipmentStore({
	_type = "OfficeEquipmentStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
