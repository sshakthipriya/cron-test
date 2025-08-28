# This file is part of https://github.com/jainamoswal/Flask-Example.
# Usage covered in <IDC lICENSE>
# Jainam Oswal. <jainam.me> 


# Import Libraries 
from app import app
import os
from dotenv import load_dotenv

# If file is called directly called, then run the app on the PORT provided defined in ENV or use '6969'.
load_dotenv()

@app.route("/health")
def health():
    return {"status": "working"}

if __name__ == "__main__":
    port = int(os.getenv("PORT"))   # get env var or fallback to 8080
    print(f"🚀 Starting Flask app on port {port}")
    app.run("0.0.0.0", port=os.getenv('PORT', 8080))
