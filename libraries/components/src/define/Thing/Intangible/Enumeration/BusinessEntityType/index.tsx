import type BaseProps from "../../../../../types/index.ts"
import type { BusinessEntityType as BusinessEntityTypeProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = BusinessEntityTypeProps & BaseProps

export default function BusinessEntityType({
	_type = "BusinessEntityType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
