import type BaseProps from "../../../../../types/index.ts"
import type { ExchangeRateSpecification as ExchangeRateSpecificationProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = ExchangeRateSpecificationProps & BaseProps

export default function ExchangeRateSpecification({
	_type = "ExchangeRateSpecification",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
