import type BaseProps from "../../../../types/index.ts"
import type { Offer as OfferProps } from "../../../../types/index.ts"

import Intangible from "../index.tsx"

export type Props = OfferProps & BaseProps

export default function Offer({
	_type = "Offer",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
