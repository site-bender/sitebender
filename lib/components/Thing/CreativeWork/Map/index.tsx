import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type CreativeWorkProps from "../../../../types/Thing/CreativeWork/index.ts"
import type MapProps from "../../../../types/Thing/Map/index.ts"

import CreativeWork from "./index.tsx"

export type Props = BaseComponentProps<
	MapProps,
	"Map",
	ExtractLevelProps<MapProps, CreativeWorkProps>
>

export default function Map(
	{
		mapType,
		schemaType = "Map",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<CreativeWork
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				mapType,
				...subtypeProperties,
			}}
		/>
	)
}
