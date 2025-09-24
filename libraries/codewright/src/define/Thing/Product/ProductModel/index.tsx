import type BaseProps from "../../../../../types/index.ts"
import type { ProductModel as ProductModelProps } from "../../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = ProductModelProps & BaseProps

export default function ProductModel({
	_type = "ProductModel",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
