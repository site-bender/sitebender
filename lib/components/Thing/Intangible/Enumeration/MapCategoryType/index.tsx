import type BaseProps from "../../../../../types/index.ts"
import type { MapCategoryTypeProps } from "../../../../../types/Thing/Intangible/Enumeration/MapCategoryType/index.ts"

import Enumeration from "../index.tsx"

export type Props = MapCategoryTypeProps & BaseProps

export default function MapCategoryType({
	_type = "MapCategoryType",
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<Enumeration
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		/>
	)
}
