import type BaseProps from "../../../../../types/index.ts"
import type { WarrantyPromise as WarrantyPromiseProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = WarrantyPromiseProps & BaseProps

export default function WarrantyPromise({
	_type = "WarrantyPromise",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
