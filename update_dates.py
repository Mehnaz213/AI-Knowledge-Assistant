import sqlite3

conn = sqlite3.connect("ragent_ai.db")
cursor = conn.cursor()

cursor.execute("""
UPDATE conversations
SET created_at = CURRENT_TIMESTAMP
WHERE created_at IS NULL
""")

conn.commit()

print("Rows updated:", cursor.rowcount)

conn.close()