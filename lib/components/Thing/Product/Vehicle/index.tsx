import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../types/index.ts"
import type ProductProps from "../../../../types/Thing/Product/index.ts"
import type VehicleProps from "../../../../types/Thing/Vehicle/index.ts"

import Product from "../index.tsx"

export type Props = BaseComponentProps<
	VehicleProps,
	"Vehicle",
	ExtractLevelProps<VehicleProps, ProductProps>
>

export default function Vehicle(
	{
		accelerationTime,
		bodyType,
		callSign,
		cargoVolume,
		dateVehicleFirstRegistered,
		driveWheelConfiguration,
		emissionsCO2,
		fuelCapacity,
		fuelConsumption,
		fuelEfficiency,
		fuelType,
		knownVehicleDamages,
		meetsEmissionStandard,
		mileageFromOdometer,
		modelDate,
		numberOfAirbags,
		numberOfAxles,
		numberOfDoors,
		numberOfForwardGears,
		numberOfPreviousOwners,
		payload,
		productionDate,
		purchaseDate,
		seatingCapacity,
		speed,
		steeringPosition,
		tongueWeight,
		trailerWeight,
		vehicleConfiguration,
		vehicleEngine,
		vehicleIdentificationNumber,
		vehicleInteriorColor,
		vehicleInteriorType,
		vehicleModelDate,
		vehicleSeatingCapacity,
		vehicleSpecialUsage,
		vehicleTransmission,
		weightTotal,
		wheelbase,
		schemaType = "Vehicle",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<Product
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				accelerationTime,
				bodyType,
				callSign,
				cargoVolume,
				dateVehicleFirstRegistered,
				driveWheelConfiguration,
				emissionsCO2,
				fuelCapacity,
				fuelConsumption,
				fuelEfficiency,
				fuelType,
				knownVehicleDamages,
				meetsEmissionStandard,
				mileageFromOdometer,
				modelDate,
				numberOfAirbags,
				numberOfAxles,
				numberOfDoors,
				numberOfForwardGears,
				numberOfPreviousOwners,
				payload,
				productionDate,
				purchaseDate,
				seatingCapacity,
				speed,
				steeringPosition,
				tongueWeight,
				trailerWeight,
				vehicleConfiguration,
				vehicleEngine,
				vehicleIdentificationNumber,
				vehicleInteriorColor,
				vehicleInteriorType,
				vehicleModelDate,
				vehicleSeatingCapacity,
				vehicleSpecialUsage,
				vehicleTransmission,
				weightTotal,
				wheelbase,
				...subtypeProperties,
			}}
		/>
	)
}
