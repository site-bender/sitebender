import type BaseProps from "../../../../../../../types/index.ts"
import type { DepartmentStore as DepartmentStoreProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DepartmentStoreProps & BaseProps

export default function DepartmentStore({
	_type = "DepartmentStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
