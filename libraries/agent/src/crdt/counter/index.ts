import type { Counter, CRDT } from "../../types/index.ts"

export default function createCounter(
	nodeId: string,
	counts: Map<string, number> = new Map(),
	version: number = 0,
): Counter {
	return {
		value: counts,
		nodeId,
		version,

		increment(amount: number = 1): Counter {
			const newCounts = new Map(counts)
			const current = newCounts.get(nodeId) || 0
			newCounts.set(nodeId, current + amount)
			return createCounter(
				nodeId,
				newCounts,
				version + 1,
			)
		},

		decrement(amount: number = 1): Counter {
			return this.increment(-amount)
		},

		merge(other: CRDT<Map<string, number>>): Counter {
			const merged = new Map(counts)

			// For each node in the other counter, take the maximum count
			for (const [otherNodeId, otherCount] of other.value) {
				const existingCount = merged.get(otherNodeId) || 0
				merged.set(otherNodeId, Math.max(existingCount, otherCount))
			}

			return createCounter(
				nodeId,
				merged,
				Math.max(version, other.version) + 1,
			)
		},

		getValue(): number {
			return Array.from(counts.values()).reduce(
				(sum, count) => sum + count,
				0,
			)
		},

		serialize(): string {
			const countsArray = Array.from(counts.entries())
			return JSON.stringify({
				counts: countsArray,
				nodeId: nodeId,
				version: version,
			})
		},
	}
}
