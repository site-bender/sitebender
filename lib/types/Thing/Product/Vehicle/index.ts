import type { Date, Number, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type { ProductProps } from "../index.ts"
import type CarUsageType from "../../Intangible/Enumeration/CarUsageType/index.ts"
import type DriveWheelConfigurationValue from "../../Intangible/Enumeration/QualitativeValue/DriveWheelConfigurationValue/index.ts"
import type EngineSpecification from "../../Intangible/StructuredValue/EngineSpecification/index.ts"
import type QualitativeValue from "../../Intangible/Enumeration/QualitativeValue/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type SteeringPositionValue from "../../Intangible/Enumeration/QualitativeValue/SteeringPositionValue/index.ts"

import VehicleComponent from "../../../../../components/Thing/Product/Vehicle/index.tsx"

export interface VehicleProps {
	accelerationTime?: QuantitativeValue
	bodyType?: QualitativeValue | Text | URL
	callSign?: Text
	cargoVolume?: QuantitativeValue
	dateVehicleFirstRegistered?: Date
	driveWheelConfiguration?: DriveWheelConfigurationValue | Text
	emissionsCO2?: Number
	fuelCapacity?: QuantitativeValue
	fuelConsumption?: QuantitativeValue
	fuelEfficiency?: QuantitativeValue
	fuelType?: QualitativeValue | Text | URL
	knownVehicleDamages?: Text
	meetsEmissionStandard?: QualitativeValue | Text | URL
	mileageFromOdometer?: QuantitativeValue
	modelDate?: Date
	numberOfAirbags?: Number | Text
	numberOfAxles?: Number | QuantitativeValue
	numberOfDoors?: Number | QuantitativeValue
	numberOfForwardGears?: Number | QuantitativeValue
	numberOfPreviousOwners?: Number | QuantitativeValue
	payload?: QuantitativeValue
	productionDate?: Date
	purchaseDate?: Date
	seatingCapacity?: Number | QuantitativeValue
	speed?: QuantitativeValue
	steeringPosition?: SteeringPositionValue
	stupidProperty?: QuantitativeValue
	tongueWeight?: QuantitativeValue
	trailerWeight?: QuantitativeValue
	vehicleConfiguration?: Text
	vehicleEngine?: EngineSpecification
	vehicleIdentificationNumber?: Text
	vehicleInteriorColor?: Text
	vehicleInteriorType?: Text
	vehicleModelDate?: Date
	vehicleSeatingCapacity?: Number | QuantitativeValue
	vehicleSpecialUsage?: CarUsageType | Text
	vehicleTransmission?: QualitativeValue | Text | URL
	weightTotal?: QuantitativeValue
	wheelbase?: QuantitativeValue
}

type Vehicle =
	& Thing
	& ProductProps
	& VehicleProps

export default Vehicle
