# Setup

```bash
python -m venv .virtualenv
source .virtualenv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
```

# Run

```bash
uvicorn main:app --reload
```
