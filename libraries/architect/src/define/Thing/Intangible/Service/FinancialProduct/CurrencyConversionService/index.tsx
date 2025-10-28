import type BaseProps from "../../../../../../../types/index.ts"
import type { CurrencyConversionService as CurrencyConversionServiceProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CurrencyConversionServiceProps & BaseProps

export default function CurrencyConversionService({
	_type = "CurrencyConversionService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
