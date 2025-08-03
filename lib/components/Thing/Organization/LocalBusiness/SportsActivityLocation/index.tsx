import type BaseProps from "../../../../../types/index.ts"
import type { SportsActivityLocation as SportsActivityLocationProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = SportsActivityLocationProps & BaseProps

export default function SportsActivityLocation({
	_type = "SportsActivityLocation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
