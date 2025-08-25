import type BaseProps from "../../../../../../types/index.ts"
import type { FoodEstablishment as FoodEstablishmentProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = FoodEstablishmentProps & BaseProps

export default function FoodEstablishment({
	_type = "FoodEstablishment",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
