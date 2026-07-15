# Import APIRouter
from fastapi import APIRouter, Depends, HTTPException
# Import database session
from sqlalchemy.orm import Session
# Import request model
from pydantic import BaseModel
# Import database dependency
from chatbot.database import get_db
# Import User table
from chatbot.models import User

# Import password and JWT functions
from chatbot.security import (
    verify_password,
    hash_password,
    create_access_token,
)

# Create router
router = APIRouter()

# Request Models
# Registration request
class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str

# Login request
class LoginRequest(BaseModel):
    email: str
    password: str

# Register API
@router.post("/register")
def register_user(
    request: RegisterRequest,
    db: Session = Depends(get_db)
):
    # Check whether email already exists
    existing_user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )
    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )
    # Create new user
    new_user = User(
        name=request.name,
        email=request.email,
        password=hash_password(request.password),
        role=request.role
    )

    # Save user
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {
        "message": "User registered successfully."
    }

# Login API
@router.post("/login")
def login_user(
    request: LoginRequest,
    db: Session = Depends(get_db)
):
    # Find user using email
    user = (
        db.query(User)
        .filter(User.email == request.email)
        .first()
    )
    # User not found
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )
    # Verify password
    if not verify_password(
        request.password,
        user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )
    # Generate JWT
    access_token = create_access_token(
        {
            "email": user.email,
            "role": user.role
        }
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }