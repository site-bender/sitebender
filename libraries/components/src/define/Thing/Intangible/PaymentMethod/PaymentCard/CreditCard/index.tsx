import type BaseProps from "../../../../../../../types/index.ts"
import type { CreditCard as CreditCardProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = CreditCardProps & BaseProps

export default function CreditCard({
	_type = "CreditCard",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
