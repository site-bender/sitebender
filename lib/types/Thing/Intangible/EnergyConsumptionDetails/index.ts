import EUEnergyEfficiencyEnumeration from "../Enumeration/EnergyEfficiencyEnumeration/EUEnergyEfficiencyEnumeration/index.ts"
import EnergyEfficiencyEnumeration from "../Enumeration/EnergyEfficiencyEnumeration/index.ts"
import Intangible from "../index.ts"

export default interface EnergyConsumptionDetails extends Intangible {
	/** Specifies the most energy efficient class on the regulated EU energy consumption scale for the product category a product belongs to. For example, energy consumption for televisions placed on the market after January 1, 2020 is scaled from D to A+++. */
	energyEfficiencyScaleMax?: EUEnergyEfficiencyEnumeration
	/** Specifies the least energy efficient class on the regulated EU energy consumption scale for the product category a product belongs to. For example, energy consumption for televisions placed on the market after January 1, 2020 is scaled from D to A+++. */
	energyEfficiencyScaleMin?: EUEnergyEfficiencyEnumeration
	/** Defines the energy efficiency Category (which could be either a rating out of range of values or a yes/no certification) for a product according to an international energy efficiency standard. */
	hasEnergyEfficiencyCategory?: EnergyEfficiencyEnumeration
}
