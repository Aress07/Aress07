from tkinter import *
from tkinter import messagebox
import back  #database/poo

def populate_barista_listbox(): 
    barista_info = back.get_baristas_from_db()  
    barista_listbox.delete(0, END)  #vider la liste
    for barista in barista_info:
        status = "On Shift" if barista.shift else "Off Shift"  
        barista_listbox.insert(END, f"{barista.get_barista_name()} - {status}")  # remplir


# same as the previous function
def populate_drinks_listbox():
    drinks_info = back.get_drinks_from_db()  
    drinks_listbox.delete(0, END)  
    for drink in drinks_info:
        drinks_listbox.insert(END, f"{drink.name} - {drink.price:.2f} $")  

#       Login                               
def login_waiter():
    waiter_name = barista_text.get().strip()  
    if waiter_name:  
        back.update_barista_shift(waiter_name)  
        populate_barista_listbox()   

def make_drink():
    drink_name = drink_name_text.get().strip()  
    if drink_name:  
        selected_barista = barista_text.get().strip()  
        back.record_drink(selected_barista, drink_name)  
        messagebox.showinfo("Success", f"{drink_name} made by {selected_barista}")  
def create_receipt():
    drink_name = drink_name_text.get().strip()  
    waiter_name = barista_text.get().strip()  
    if drink_name:
        if waiter_name: 
            back.generate_receipt(waiter_name, drink_name)  
            messagebox.showinfo("Success", f"Receipt created for {drink_name} by {waiter_name}")  
    drink_name_text.delete(0, END)  
#Creation du GUI
root = Tk()
root.title("Caffein Heaven")  
root.geometry('700x600')  #
root.resizable(True, True)
main_frame = Frame(root)
main_frame.pack()
Title1 = Label(main_frame, text="Current Waiter:", font=14)
Title1.grid(column=0, row=0, columnspan=2, pady=10)
barista_text = Entry(main_frame, width=30)
barista_text.grid(column=0, row=2, pady=5)
login_button = Button(main_frame, text="Log In", command=login_waiter)
login_button.grid(column=1, row=2, pady=5)
Label(main_frame, text="Drinks:", font=14).grid(column=2, row=0, columnspan=2, pady=20, padx=15)
barista_listbox = Listbox(main_frame, width=40, height=15)
barista_listbox.grid(column=0, row=3, columnspan=2, pady=10)
drinks_listbox = Listbox(main_frame, width=40, height=15)
drinks_listbox.grid(column=2, row=3, columnspan=2, pady=5, padx=15)
Label(main_frame, text="Enter Drink Name:").grid(column=0, row=4, pady=5)
drink_name_text = Entry(main_frame, width=30)
drink_name_text.grid(column=0, row=5, pady=5)
make_drink_button = Button(main_frame, text="Make Drink", command=make_drink)
make_drink_button.grid(column=1, row=5, pady=5)
create_receipt_button = Button(main_frame, text="Create Receipt", command=create_receipt)
create_receipt_button.grid(column=1, row=6, pady=5)

populate_barista_listbox()
populate_drinks_listbox()
root.mainloop()