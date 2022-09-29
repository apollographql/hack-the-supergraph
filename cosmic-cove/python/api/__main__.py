from os import environ

import uvicorn

port = environ.get("PORT", "5000")
uvicorn.run("main:app", host="0.0.0.0", port=int(port), log_level="info")
