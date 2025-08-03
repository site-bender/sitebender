import type BaseProps from "../../../../../types/index.ts"
import type { PriceSpecification as PriceSpecificationProps } from "../../../../../types/index.ts"

import StructuredValue from "../index.tsx"

export type Props = PriceSpecificationProps & BaseProps

export default function PriceSpecification({
	_type = "PriceSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
