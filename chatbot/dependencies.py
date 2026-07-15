# Import OAuth2 password bearer
from fastapi.security import OAuth2PasswordBearer
# Import FastAPI dependencies
from fastapi import Depends, HTTPException, status
# Import JWT verification function
from chatbot.security import verify_access_token
print("dependencies.py loaded")

# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="login"
)

# Verify current user
def get_current_user(

    token: str = Depends(oauth2_scheme)

):

    print("Received Token:", token)

    payload = verify_access_token(token)

    print("Decoded Payload:", payload)

    if payload is None:

        raise HTTPException(

            status_code=status.HTTP_401_UNAUTHORIZED,

            detail="Invalid or expired token."

        )

    return payload