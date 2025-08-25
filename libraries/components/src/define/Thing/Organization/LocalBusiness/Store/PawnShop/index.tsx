import type BaseProps from "../../../../../../../types/index.ts"
import type { PawnShop as PawnShopProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = PawnShopProps & BaseProps

export default function PawnShop({
	_type = "PawnShop",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
