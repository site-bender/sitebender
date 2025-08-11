import type BaseProps from "../../../../../types/index.ts"
import type { OfferCatalog as OfferCatalogProps } from "../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = OfferCatalogProps & BaseProps

export default function OfferCatalog({
	_type = "OfferCatalog",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
