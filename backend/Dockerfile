# 3.12, not 3.14. psycopg2-binary==2.9.9 publishes no wheel for 3.14, so `pip install` fell back to
# building from source inside a SLIM image with no libpq headers and no compiler — the build has been
# failing with "Failed to build 'psycopg2-binary' when getting requirements to build wheel".
#
# 3.12 is where that pin has wheels, and it is also what the CI runner's tool cache carries, so the
# linted version and the shipped version are the same one. Moving to psycopg3 would also fix it and is
# the better long-term answer, but that is an API migration and not a red-main fix.
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]