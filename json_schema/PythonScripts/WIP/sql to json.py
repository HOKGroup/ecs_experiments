import json
import psycopg2

def db(database_name='pepe'):
    return psycopg2.connect(database=database_name)

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn

def main():
    database = r"S:\Git\ecs_experiments\json_schema\PythonScripts\ecs.db"

    # create a database connection
    conn = create_connection(database)

def query_db(query, args=(), one=False):
    cur = db().cursor()
    cur.execute(query, args)
    r = [dict((cur.description[i][0], value) \
               for i, value in enumerate(row)) for row in cur.fetchall()]
    cur.connection.close()
    return (r[0] if r else None) if one else r

my_query = query_db("select * from majorroadstiger limit %s", (3,))

json_output = json.dumps(my_query)