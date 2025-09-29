#!/usr/bin/env python3
"""
Simple Qdrant backup using REST API - no qdrant-client needed
"""

import json
import urllib.request
import urllib.parse
from datetime import datetime
from pathlib import Path

QDRANT_URL = "http://localhost:6333"

def backup_all():
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_dir = Path(f"qdrant_backup_{timestamp}")
    backup_dir.mkdir(exist_ok=True)

    print(f"Creating backup in: {backup_dir}")
    print("=" * 50)

    # Get collections
    with urllib.request.urlopen(f"{QDRANT_URL}/collections") as response:
        data = json.loads(response.read())
        collections = data["result"]["collections"]

    all_backups = {}

    for collection in collections:
        collection_name = collection["name"]
        print(f"\nBacking up: {collection_name}")

        # Get collection info
        with urllib.request.urlopen(f"{QDRANT_URL}/collections/{collection_name}") as response:
            collection_info = json.loads(response.read())

        # Scroll through points
        points = []
        offset = None

        while True:
            payload = {
                "limit": 100,
                "with_payload": True,
                "with_vector": True
            }

            if offset:
                payload["offset"] = offset

            req = urllib.request.Request(
                f"{QDRANT_URL}/collections/{collection_name}/points/scroll",
                data=json.dumps(payload).encode('utf-8'),
                headers={'Content-Type': 'application/json'}
            )

            with urllib.request.urlopen(req) as response:
                result = json.loads(response.read())["result"]

            if result["points"]:
                points.extend(result["points"])

            offset = result.get("next_page_offset")
            if not offset:
                break

        # Save backup
        backup_data = {
            "collection_name": collection_name,
            "timestamp": timestamp,
            "info": collection_info["result"],
            "point_count": len(points),
            "points": points
        }

        backup_file = backup_dir / f"{collection_name}.json"
        with open(backup_file, "w") as f:
            json.dump(backup_data, f, indent=2)

        print(f"  ✓ Backed up {len(points)} points")
        all_backups[collection_name] = len(points)

    # Create manifest
    manifest = {
        "timestamp": timestamp,
        "collections": all_backups,
        "total_points": sum(all_backups.values())
    }

    with open(backup_dir / "manifest.json", "w") as f:
        json.dump(manifest, f, indent=2)

    print("\n" + "=" * 50)
    print(f"✅ Backup complete!")
    print(f"Location: {backup_dir}")
    print(f"Total points backed up: {manifest['total_points']}")

    return backup_dir

if __name__ == "__main__":
    backup_all()