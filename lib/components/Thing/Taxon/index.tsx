import type BaseProps from "../../../types/index.ts"
import type { Taxon as TaxonProps } from "../../../types/index.ts"

import Thing from "../index.tsx"

export type Props = TaxonProps & BaseProps

export default function Taxon({
	_type = "Taxon",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
