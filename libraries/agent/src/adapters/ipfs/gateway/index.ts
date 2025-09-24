import type { IPFSGateway } from "../../../types/index.ts"
import type { CacheEntry, GatewayResult } from "./types/index.ts"

import { CACHE_TTL, DEFAULT_GATEWAYS } from "./constants/index.ts"

async function fetchWithTimeout(
	url: string,
	timeout: number = 5000,
): Promise<Response> {
	const controller = new AbortController()
	const timeoutId = setTimeout(() => controller.abort(), timeout)

	try {
		const response = await fetch(url, { signal: controller.signal })
		clearTimeout(timeoutId)
		return response
	} catch (error) {
		clearTimeout(timeoutId)
		throw error
	}
}

async function raceGateways(
	cid: string,
	gateways: Array<string>,
): Promise<GatewayResult> {
	const startTime = Date.now()
	const promises = gateways.map(async (gateway) => {
		try {
			const url = `${gateway}${cid}`
			const response = await fetchWithTimeout(url)

			if (!response.ok) {
				throw new Error(
					`Gateway ${gateway} returned ${response.status}`,
				)
			}

			const data = new Uint8Array(await response.arrayBuffer())
			const latency = Date.now() - startTime

			return { data, gateway, latency }
		} catch (_error) {
			// Return null for failed gateways
			return null
		}
	})

	// Race all gateways and filter out failures
	const results = await Promise.all(promises)
	const successful = results.filter((r) => r !== null) as Array<GatewayResult>

	if (successful.length === 0) {
		throw new Error(`Failed to fetch CID ${cid} from any gateway`)
	}

	// Return the fastest successful result
	successful.sort((a, b) => a.latency - b.latency)
	return successful[0]
}

// Simple in-memory cache with TTL
const cache = new Map<string, CacheEntry>()

function getCached(cid: string): Uint8Array | null {
	const entry = cache.get(cid)
	if (!entry) return null

	if (Date.now() - entry.timestamp > CACHE_TTL) {
		cache.delete(cid)
		return null
	}

	return entry.data
}

function setCached(cid: string, data: Uint8Array): void {
	cache.set(cid, {
		data,
		timestamp: Date.now(),
	})

	// Clean up old entries periodically
	if (cache.size > 100) {
		const now = Date.now()
		for (const [key, entry] of cache.entries()) {
			if (now - entry.timestamp > CACHE_TTL) {
				cache.delete(key)
			}
		}
	}
}

export default function createIPFSGateway(
	gateways: Array<string> = DEFAULT_GATEWAYS,
): IPFSGateway {
	return {
		async fetch(cid: string): Promise<Uint8Array> {
			// Check cache first
			const cached = getCached(cid)
			if (cached) {
				return cached
			}

			// Fetch from gateways
			const result = await raceGateways(cid, gateways)

			// Cache the result
			setCached(cid, result.data)

			return result.data
		},

		pin(content: Uint8Array): Promise<string> {
			// For pinning, we need a pinning service API
			// This is a simplified implementation
			// In production, you'd use Pinata, Web3.Storage, or similar

			// Create a simple hash of the content as a mock CID
			// In production, use proper IPFS hashing
			const hash = Array.from(content).reduce(
				(h, byte) => (((h << 5) - h) + byte) & 0xFFFFFFFF,
				0,
			)

			const cid = `Qm${Math.abs(hash).toString(36).padStart(46, "0")}`

			// Store in cache as if it was pinned
			setCached(cid, content)

			// In production, you would:
			// 1. Upload to IPFS node or pinning service
			// 2. Get the real CID back
			// 3. Ensure it's pinned

			return Promise.resolve(cid)
		},

		unpin(cid: string): Promise<void> {
			// Remove from cache
			cache.delete(cid)

			// In production, you would:
			// 1. Call pinning service API to unpin
			// 2. Handle errors appropriately

			return Promise.resolve()
		},
	}
}
