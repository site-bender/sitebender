import type AllocateAction from "../index.ts"

// RejectAction extends AllocateAction but adds no additional properties

export default interface RejectAction extends AllocateAction {
}
