import mysql.connector
from dotenv import load_dotenv
import os
import string, random
load_dotenv()
mydb =  mysql.connector.connect(
    host = os.getenv("DB_URL"),         
    user=os.getenv("USER_NAME"),    
    password=os.getenv("DB_PASSWORD"), 
    database=os.getenv("DB_NAME")  
)
cursor = mydb.cursor()
def generate_short_code():
    """Generate a random string of letters and digits for the short URL."""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(10))
def shorten_the_url(longurl):
    try:
        code = generate_short_code()
        sql = "INSERT INTO urlshortcode (original_url, short_code) VALUES (%s, %s)"
        values = (longurl,code)
        cursor.execute(sql,values)
        mydb.commit()
        return code
    except:
        pass
def get_original_url(code):
    try:
        sql = "SELECT original_url from urlshortcode where short_code = %s"
        values = code
        cursor.execute(sql,(values,))
        myresult = cursor.fetchone()
        return myresult[0]
    except:
        pass
   
