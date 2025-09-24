import type { Date, Number, Text, URL } from "../../../DataType/index.ts"
import type Thing from "../../index.ts"
import type CarUsageType from "../../Intangible/Enumeration/CarUsageType/index.ts"
import type DriveWheelConfigurationValue from "../../Intangible/Enumeration/QualitativeValue/DriveWheelConfigurationValue/index.ts"
import type QualitativeValue from "../../Intangible/Enumeration/QualitativeValue/index.ts"
import type SteeringPositionValue from "../../Intangible/Enumeration/QualitativeValue/SteeringPositionValue/index.ts"
import type EngineSpecification from "../../Intangible/StructuredValue/EngineSpecification/index.ts"
import type QuantitativeValue from "../../Intangible/StructuredValue/QuantitativeValue/index.ts"
import type { ProductProps } from "../index.ts"
import type { BusOrCoachType } from "./BusOrCoach/index.ts"
import type { CarType } from "./Car/index.ts"
import type { MotorcycleType } from "./Motorcycle/index.ts"
import type { MotorizedBicycleType } from "./MotorizedBicycle/index.ts"

import CarUsageTypeComponent from "../../../../../src/define/Thing/Intangible/Enumeration/CarUsageType/index.tsx"
import DriveWheelConfigurationValueComponent from "../../../../../src/define/Thing/Intangible/Enumeration/QualitativeValue/DriveWheelConfigurationValue/index.tsx"
import QualitativeValueComponent from "../../../../../src/define/Thing/Intangible/Enumeration/QualitativeValue/index.tsx"
import SteeringPositionValueComponent from "../../../../../src/define/Thing/Intangible/Enumeration/QualitativeValue/SteeringPositionValue/index.tsx"
import EngineSpecificationComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/EngineSpecification/index.tsx"
import QuantitativeValueComponent from "../../../../../src/define/Thing/Intangible/StructuredValue/QuantitativeValue/index.tsx"

export type VehicleType =
	| "Vehicle"
	| BusOrCoachType
	| CarType
	| MotorcycleType
	| MotorizedBicycleType

export interface VehicleProps {
	"@type"?: VehicleType
	accelerationTime?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	bodyType?:
		| QualitativeValue
		| Text
		| URL
		| ReturnType<typeof QualitativeValueComponent>
	callSign?: Text
	cargoVolume?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	dateVehicleFirstRegistered?: Date
	driveWheelConfiguration?:
		| DriveWheelConfigurationValue
		| Text
		| ReturnType<typeof DriveWheelConfigurationValueComponent>
	emissionsCO2?: Number
	fuelCapacity?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	fuelConsumption?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	fuelEfficiency?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	fuelType?:
		| QualitativeValue
		| Text
		| URL
		| ReturnType<typeof QualitativeValueComponent>
	knownVehicleDamages?: Text
	meetsEmissionStandard?:
		| QualitativeValue
		| Text
		| URL
		| ReturnType<typeof QualitativeValueComponent>
	mileageFromOdometer?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	modelDate?: Date
	numberOfAirbags?: Number | Text
	numberOfAxles?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	numberOfDoors?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	numberOfForwardGears?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	numberOfPreviousOwners?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	payload?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
	productionDate?: Date
	purchaseDate?: Date
	seatingCapacity?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	speed?: QuantitativeValue | ReturnType<typeof QuantitativeValueComponent>
	steeringPosition?:
		| SteeringPositionValue
		| ReturnType<typeof SteeringPositionValueComponent>
	stupidProperty?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	tongueWeight?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	trailerWeight?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	vehicleConfiguration?: Text
	vehicleArchitect?:
		| EngineSpecification
		| ReturnType<typeof EngineSpecificationComponent>
	vehicleIdentificationNumber?: Text
	vehicleInteriorColor?: Text
	vehicleInteriorType?: Text
	vehicleModelDate?: Date
	vehicleSeatingCapacity?:
		| Number
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	vehicleSpecialUsage?:
		| CarUsageType
		| Text
		| ReturnType<typeof CarUsageTypeComponent>
	vehicleTransmission?:
		| QualitativeValue
		| Text
		| URL
		| ReturnType<typeof QualitativeValueComponent>
	weightTotal?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
	wheelbase?:
		| QuantitativeValue
		| ReturnType<typeof QuantitativeValueComponent>
}

type Vehicle = Thing & ProductProps & VehicleProps

export default Vehicle
