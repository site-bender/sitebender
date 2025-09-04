# Plan: Semantic search pilot

## Goals
- Validate vector search value with a small, measurable pilot.

## Deliverables
- Docker compose profile (disabled by default) for chosen vector DB.
- Embedding pipeline and privacy posture.
- One feature (e.g., docs semantic search) with eval metrics.

## Steps
1. Choose backend (Weaviate/Qdrant/ES) based on ops and fit.
2. Add compose profile with volumes and limits; document enabling.
3. Implement ingestion + search; fuse with BM25 if available.
4. Measure latency, cost, and quality; decide scale-up.
