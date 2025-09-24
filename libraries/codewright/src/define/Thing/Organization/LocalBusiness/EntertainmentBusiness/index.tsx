import type BaseProps from "../../../../../../types/index.ts"
import type { EntertainmentBusiness as EntertainmentBusinessProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = EntertainmentBusinessProps & BaseProps

export default function EntertainmentBusiness({
	_type = "EntertainmentBusiness",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
