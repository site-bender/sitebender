import type BaseProps from "../../../../types/index.ts"
import type { BedDetails as BedDetailsProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = BedDetailsProps & BaseProps

export default function BedDetails({
	_type = "BedDetails",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
