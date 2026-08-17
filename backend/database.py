from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    # No fallback DSN, for two reasons. A placeholder localhost DSN used to sit here as the
    # os.getenv default (deliberately not repeated, so this comment does not re-trip the rule); it
    # matched semgrep's python-sqlalchemy-hardcoded-secret on every scan, and in a PUBLIC repo that
    # noise sits in the finding set forever. More importantly a default DSN is a silent failure
    # mode: a deployment that forgets DATABASE_URL connects to a localhost database that does not
    # exist and surfaces as a connection error at first query, far from the misconfiguration that
    # caused it. Fail here, where the cause is named.
    raise RuntimeError(
        "DATABASE_URL is not set. Set it in the environment (or .env for local development); "
        "there is deliberately no default so a missing value fails here rather than at first query."
    )

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def init_db():
    Base.metadata.create_all(bind=engine)