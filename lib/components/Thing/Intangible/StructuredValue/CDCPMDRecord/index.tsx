import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { IntangibleProps } from "../../../../../types/Thing/Intangible/index.ts"
import type { StructuredValueProps } from "../../../../../types/Thing/Intangible/StructuredValue/index.ts"
import type { CDCPMDRecordProps } from "../../../../../types/Thing/Intangible/StructuredValue/CDCPMDRecord/index.ts"

import StructuredValue from "../index.tsx"

export type Props = BaseComponentProps<
	CDCPMDRecordProps,
	"CDCPMDRecord",
	ExtractLevelProps<ThingProps, IntangibleProps, StructuredValueProps>
>

export default function CDCPMDRecord({
	cvdCollectionDate,
	cvdFacilityCounty,
	cvdFacilityId,
	cvdNumBeds,
	cvdNumBedsOcc,
	cvdNumC19Died,
	cvdNumC19HOPats,
	cvdNumC19HospPats,
	cvdNumC19MechVentPats,
	cvdNumC19OFMechVentPats,
	cvdNumC19OverflowPats,
	cvdNumICUBeds,
	cvdNumICUBedsOcc,
	cvdNumTotBeds,
	cvdNumVent,
	cvdNumVentUse,
	datePosted,
	schemaType = "CDCPMDRecord",
	subtypeProperties = {},
	...props
}): Props {
	return (
		<StructuredValue
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				cvdCollectionDate,
				cvdFacilityCounty,
				cvdFacilityId,
				cvdNumBeds,
				cvdNumBedsOcc,
				cvdNumC19Died,
				cvdNumC19HOPats,
				cvdNumC19HospPats,
				cvdNumC19MechVentPats,
				cvdNumC19OFMechVentPats,
				cvdNumC19OverflowPats,
				cvdNumICUBeds,
				cvdNumICUBedsOcc,
				cvdNumTotBeds,
				cvdNumVent,
				cvdNumVentUse,
				datePosted,
				...subtypeProperties,
			}}
		/>
	)
}
