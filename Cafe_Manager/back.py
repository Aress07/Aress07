import sqlite3
import datetime

class Barista:
    def __init__(self, id, name, shift, hours_worked):
        self.id = id
        self.name = name
        self.shift = shift  
        self.hours_worked = hours_worked

    def get_barista_name(self):
        return self.name


class Drink:
    def __init__(self, id, name, price, order_time):
        self.id = id
        self.name = name
        self.price = price
        self.order_time = order_time


def create_tables():
    conn = sqlite3.connect('Cafe_Manager/cafe.db')
    cur = conn.cursor()
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS barista (
            id INTEGER PRIMARY KEY,
            name TEXT,
            shift INTEGER,
            hrs_worked INTEGER
        )
    ''')
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS drinks (
            id INTEGER PRIMARY KEY,
            name TEXT,
            price REAL,
            order_time TEXT
        )
    ''')
    
    cur.execute('''
        CREATE TABLE IF NOT EXISTS drinks_made (
            id INTEGER PRIMARY KEY,
            barista_name TEXT,
            drink_name TEXT
        )
    ''')

    conn.commit()
    conn.close()


def populate_tables():
    conn = sqlite3.connect('Cafe_Manager/cafe.db')
    cur = conn.cursor()
    
    cur.execute("SELECT COUNT(*) FROM barista")
    if cur.fetchone()[0] == 0:  #no row means it returs a tuple (0,) so we check if its empty first
        baristas = [
            (1, "Andrew", 0, 40),
            (2, "Summer", 1, 35),
            (3, "Hakim", 0, 30),
            (4, "Lilia", 1, 25)
        ]
        cur.executemany("INSERT INTO barista (id, name, shift, hrs_worked) VALUES (?, ?, ?, ?)", baristas)

    cur.execute("SELECT COUNT(*) FROM drinks")
    if cur.fetchone()[0] == 0:  
        drinks = [
            (1, "Espresso", 2.50, "08:00 AM"),
            (2, "Latte", 3.50, "08:15 AM"),
            (3, "Cappuccino", 3.00, "08:30 AM"),
            (4, "Americano", 2.75, "08:45 AM")
        ]
        cur.executemany("INSERT INTO drinks (id, name, price, order_time) VALUES (?, ?, ?, ?)", drinks)

    conn.commit()
    conn.close()

# Function to get baristas from the database
def get_baristas_from_db():
    conn = sqlite3.connect('Cafe_Manager/cafe.db')
    cur = conn.cursor()
    cur.execute("SELECT id, name, shift, hrs_worked FROM barista")
    barista_data = cur.fetchall()
    conn.close()
    baristas = []  
    for data in barista_data:  
        barista = Barista(*data)  # create an object from a tuple
        baristas.append(barista)  
    return baristas  

def get_drinks_from_db():
    conn = sqlite3.connect('Cafe_Manager/cafe.db')
    cur = conn.cursor()
    cur.execute("SELECT id, name, price, order_time FROM drinks")
    drink_data = cur.fetchall()
    conn.close()
    baristas = []  
    for data in drink_data:  
        barista = Drink(*data)
        baristas.append(barista)  
    return baristas 

def update_barista_shift(barista_name):
    conn = sqlite3.connect('Cafe_Manager/cafe.db')
    cur = conn.cursor()
    cur.execute("UPDATE barista SET shift = 0") 
    cur.execute("UPDATE barista SET shift = 1 WHERE name = ?", (barista_name,))
    conn.commit()
    conn.close()

def record_drink(barista_name, drink_name):
    conn = sqlite3.connect('Cafe_Manager/cafe.db')
    cur = conn.cursor()
    cur.execute("INSERT INTO drinks_made (barista_name, drink_name) VALUES (?, ?)", (barista_name, drink_name))
    conn.commit()
    conn.close()

def generate_receipt(barista_name, drink_name):
    timee = datetime.datetime.now().strftime("%Y-%m-%d - %H:%M:%S")
    with open("Cafe_Manager/receipt.txt", "w") as file:
        file.write(f"Receipt\n")
        file.write(f"Date: {timee}\n")
        file.write(f"Waiter: {barista_name}\n")
        file.write(f"Drink: {drink_name}\n")
        file.write("Caffein Heaven, Visit Us Again!\n")

create_tables()
populate_tables()