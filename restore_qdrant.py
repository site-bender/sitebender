#!/usr/bin/env python3
"""
Restore Qdrant collections from backup
"""

import json
import sys
from pathlib import Path
from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct, VectorParams, Distance

client = QdrantClient(host="localhost", port=6333)

def restore_from_backup(backup_dir):
    """Restore all collections from a backup directory"""

    backup_path = Path(backup_dir)
    if not backup_path.exists():
        print(f"❌ Backup directory not found: {backup_dir}")
        sys.exit(1)

    manifest_file = backup_path / "manifest.json"
    if not manifest_file.exists():
        print(f"❌ Manifest file not found in {backup_dir}")
        sys.exit(1)

    with open(manifest_file, 'r') as f:
        manifest = json.load(f)

    print(f"Restoring backup from: {manifest['timestamp']}")
    print(f"Collections to restore: {manifest['collections']}")
    print("=" * 50)

    response = input("\n⚠️  This will DELETE existing collections and restore from backup. Continue? (yes/no): ")
    if response.lower() != 'yes':
        print("Restore cancelled.")
        sys.exit(0)

    for collection_name in manifest['collections']:
        backup_file = backup_path / f"{collection_name}.json"

        if not backup_file.exists():
            print(f"⚠️  Skipping {collection_name} - backup file not found")
            continue

        print(f"\nRestoring collection: {collection_name}")

        with open(backup_file, 'r') as f:
            data = json.load(f)

        # Delete existing collection if it exists
        try:
            client.delete_collection(collection_name)
            print(f"  - Deleted existing collection")
        except:
            pass

        # Recreate collection
        if data['points'] and len(data['points']) > 0:
            vector_size = len(data['points'][0]['vector'])
        else:
            vector_size = 1536  # default

        client.create_collection(
            collection_name=collection_name,
            vectors_config=VectorParams(
                size=vector_size,
                distance=Distance.COSINE
            )
        )
        print(f"  - Created new collection (vector size: {vector_size})")

        # Restore points
        if data['points']:
            points = [
                PointStruct(
                    id=point['id'],
                    vector=point['vector'],
                    payload=point['payload']
                ) for point in data['points']
            ]

            # Batch upload in chunks
            batch_size = 100
            for i in range(0, len(points), batch_size):
                batch = points[i:i+batch_size]
                client.upsert(
                    collection_name=collection_name,
                    points=batch
                )

            print(f"  ✓ Restored {len(points)} points")

    print("\n" + "=" * 50)
    print("✅ Restore complete!")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python restore_qdrant.py <backup_directory>")
        sys.exit(1)

    restore_from_backup(sys.argv[1])