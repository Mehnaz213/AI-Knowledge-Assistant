# Import SQLAlchemy engine
from sqlalchemy import create_engine
# Import Base class and Session creator
from sqlalchemy.orm import declarative_base, sessionmaker
import os
# SQLite Database URL
# Create the database file in the current folder
DATABASE_URL = "sqlite:///./ragent_ai.db"
print("Database Path:", os.path.abspath("ragent_ai.db"))

# Create Database Engine
# Engine is responsible for connecting Python with the SQLite database.
engine = create_engine(
    DATABASE_URL,
    connect_args={
        # allows multiple requests to access the database simultaneously,
        "check_same_thread": False
    }
)

# Create Session Factory
# SessionLocal is used whenever we want to communicate with the database.
SessionLocal = sessionmaker(
    # We will manually commit changes.
    autocommit=False,
    # We will manually flush changes.
    autoflush=False,
    # Connect using the engine created above.
    bind=engine
)

# Base Class
# Every database table we create later will inherit from this Base class.
Base = declarative_base()

# Database Dependency
# FastAPI uses Dependency Injection.
# Whenever an API endpoint needs database access,
# this function automatically opens the database,
# provides it to the endpoint,
# and closes it safely afterwards.

def get_db():
    # Open database connection
    db = SessionLocal()
    try:
        # Give database session to API
        yield db
    finally:
        # Always close database connection
        db.close()