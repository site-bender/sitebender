import type { RGA, RGANode } from "../../types/index.ts"

function sortTopologically<T>(nodes: Array<RGANode<T>>): Array<RGANode<T>> {
	// Build adjacency map
	const nodeMap = new Map<string | null, RGANode<T>>()
	const children = new Map<string | null, Array<RGANode<T>>>()

	for (const node of nodes) {
		nodeMap.set(node.id, node)
		const prevChildren = children.get(node.prev) || []
		prevChildren.push(node)
		children.set(node.prev, prevChildren)
	}

	// Topological sort starting from nodes with prev = null
	const sorted: Array<RGANode<T>> = []
	const visited = new Set<string>()

	function visit(nodeId: string | null) {
		if (nodeId && visited.has(nodeId)) return
		if (nodeId) visited.add(nodeId)

		const nodeChildren = children.get(nodeId) || []
		// Sort children by id for deterministic ordering
		nodeChildren.sort((a, b) => a.id.localeCompare(b.id))

		for (const child of nodeChildren) {
			if (!visited.has(child.id)) {
				sorted.push(child)
				visit(child.id)
			}
		}
	}

	// Start from root (null)
	visit(null)

	return sorted
}

export default function createRGA<T>(
	nodes: Array<RGANode<T>> = [],
	nodeId: string,
	version: number = 0,
): RGA<T> {
	function findNext(afterId: string | null): string | null {
		// Find the first node that has afterId as its prev
		const nextNode = nodes.find((n) => n.prev === afterId && !n.tombstone)
		return nextNode ? nextNode.id : null
	}

	return {
		value: nodes,
		nodeId,
		version,

		insertAfter(afterId: string | null, value: T): RGA<T> {
			const id = `${nodeId}-${Date.now()}-${
				Math.random().toString(36).substr(2, 9)
			}`
			const newNode: RGANode<T> = {
				value,
				id,
				prev: afterId,
				next: findNext(afterId),
				tombstone: false,
			}

			// Update the previous node's next pointer if it exists
			const updatedNodes = nodes.map((node) =>
				node.id === afterId ? { ...node, next: id } : node
			)

			return createRGA(
				[...updatedNodes, newNode],
				nodeId,
				version + 1,
			)
		},

		delete(id: string): RGA<T> {
			const updatedNodes = nodes.map((node) =>
				node.id === id ? { ...node, tombstone: true } : node
			)
			return createRGA(
				updatedNodes,
				nodeId,
				version + 1,
			)
		},

		merge(other: RGA<T>): RGA<T> {
			// Union all nodes from both RGAs
			const allNodes = [...nodes, ...other.value]

			// Deduplicate by id, keeping tombstoned versions
			const uniqueNodes = new Map<string, RGANode<T>>()
			for (const node of allNodes) {
				const existing = uniqueNodes.get(node.id)
				if (!existing || (node.tombstone && !existing.tombstone)) {
					uniqueNodes.set(node.id, node)
				}
			}

			const mergedNodes = Array.from(uniqueNodes.values())
			const sorted = sortTopologically(mergedNodes)

			return createRGA(
				sorted,
				nodeId,
				Math.max(version, other.version) + 1,
			)
		},

		toArray(): Array<T> {
			const sorted = sortTopologically(nodes)
			return sorted
				.filter((node) => !node.tombstone)
				.map((node) => node.value)
		},

		serialize(): string {
			return JSON.stringify({
				nodes: nodes,
				nodeId: nodeId,
				version: version,
			})
		},
	}
}
