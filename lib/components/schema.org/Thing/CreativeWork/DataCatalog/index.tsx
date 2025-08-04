import type BaseProps from "../../../../types/index.ts"
import type { DataCatalog as DataCatalogProps } from "../../../../types/index.ts"

import Base from "../../../Base/index.tsx"

export type Props = DataCatalogProps & BaseProps

export default function DataCatalog({
	_type = "DataCatalog",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
