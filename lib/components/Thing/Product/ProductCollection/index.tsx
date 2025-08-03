import type BaseProps from "../../../../types/index.ts"
import type { ProductCollection as ProductCollectionProps } from "../../../../types/index.ts"

import Product from "../index.tsx"

export type Props = ProductCollectionProps & BaseProps

export default function ProductCollection({
	_type = "ProductCollection",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
