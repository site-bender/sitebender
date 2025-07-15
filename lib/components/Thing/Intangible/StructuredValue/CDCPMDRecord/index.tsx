import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type CDCPMDRecordProps from "../../../../../types/Thing/CDCPMDRecord/index.ts"
import type StructuredValueProps from "../../../../../types/Thing/StructuredValue/index.ts"

import StructuredValue from "./index.tsx"

export type Props = BaseComponentProps<
	CDCPMDRecordProps,
	"CDCPMDRecord",
	ExtractLevelProps<CDCPMDRecordProps, StructuredValueProps>
>

export default function CDCPMDRecord(
	{
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
	}: Props,
) {
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
