#!/bin/bash
# Setup proper Python environment for Qdrant

echo "Setting up Qdrant Python environment..."
echo "======================================="

# Create virtual environment
python3 -m venv qdrant_venv

# Activate and install
source qdrant_venv/bin/activate

pip install --upgrade pip
pip install qdrant-client
pip install sentence-transformers

echo ""
echo "✅ Environment ready!"
echo ""
echo "To use the migration script:"
echo "  source qdrant_venv/bin/activate"
echo "  python migrate_to_real_embeddings.py"
echo ""
echo "To run any Qdrant script:"
echo "  source qdrant_venv/bin/activate"
echo "  python <script.py>"