import type BaseProps from "../../../../../types/index.ts"
import type { HomeAndConstructionBusiness as HomeAndConstructionBusinessProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = HomeAndConstructionBusinessProps & BaseProps

export default function HomeAndConstructionBusiness({
	_type = "HomeAndConstructionBusiness",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
