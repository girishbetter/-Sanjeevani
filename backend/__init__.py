"""Backend package bootstrap.

This keeps the existing top-level imports inside the backend modules working
when the app is started from the repo root as `backend.main:app`.
"""

from __future__ import annotations

import sys
from pathlib import Path

backend_root = Path(__file__).resolve().parent
backend_root_str = str(backend_root)
if backend_root_str not in sys.path:
    sys.path.insert(0, backend_root_str)
