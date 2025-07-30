import type BaseProps from "../../../../../types/index.ts"
import type CDCPMDRecordProps from "../../../../../types/Thing/Intangible/StructuredValue/CDCPMDRecord/index.ts"

import StructuredValue from "../index.tsx"

export type Props = CDCPMDRecordProps & BaseProps

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
	_type = "CDCPMDRecord",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<StructuredValue
			{...props}
			_type={_type}
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
		>{children}</StructuredValue>
	)
}
