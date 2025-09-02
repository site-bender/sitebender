import type BaseProps from "../../../../../../types/index.ts"
import type { FoodService as FoodServiceProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = FoodServiceProps & BaseProps

export default function FoodService({
	_type = "FoodService",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
