import java.util.*;
import java.lang.constant.PackageDesc;

public class Main {
    public static void main(String[] args) {
        // Singleton usage
        Singleton inst1 = Singleton.getInstance();
        Singleton inst2 = Singleton.getInstance();
        System.out.println(inst1 == inst2);
        // Builder usage
        Phone p1 = new PhoneBuilder()
        .setOs("Android")
        .setProcessor("Snapdragon 888")
        .setScreenSize(6.5)
        .setBattery(4500)
        .setCamera(64)
        .build();
        System.out.println(p1);
        // Decorator usage 
        Coffee basicCoffee = new SimpleCoffee();
        System.out.println("Description: " + basicCoffee.getDescription());
        System.out.println("Cost: " + String.format("%.2f", basicCoffee.getCost()));

        Coffee milkCoffee = new Milk(new SimpleCoffee());
        System.out.println("Description: " + milkCoffee.getDescription());
        System.out.println("Cost: " + String.format("%.2f", milkCoffee.getCost()));

        Coffee latteCoffee = new Sugar(new Milk(new SimpleCoffee()));
        System.out.println("Description: " + latteCoffee.getDescription());
        System.out.println("Cost: " + String.format("%.2f", latteCoffee.getCost()));

        // Strategy usage
        Item item1 = new Item(3);
        Item item2 = new Item(10);
        ShoppingCart shoppingCart = new ShoppingCart();
        shoppingCart.addItem(item1);
        shoppingCart.addItem(item2);
        shoppingCart.pay(new CreditCardStrategy("10"));

        // Factory usage
        Vehicle myCar = VehicleFactory.createVehicle("car");
        myCar.drive();
        myCar.getDescription();
        System.out.println("------------------------");
        Vehicle myTruck = VehicleFactory.createVehicle("truck");
        myTruck.drive();
        myTruck.getDescription();
        System.out.println("------------------------");
        Vehicle myMotorcycle = VehicleFactory.createVehicle("motorcycle");
        myMotorcycle.drive();
        myMotorcycle.getDescription();

        try {
            Vehicle random = VehicleFactory.createVehicle("randomness");
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
        }
        // State usage
        AudioPlayer player = new AudioPlayer();

        System.out.println("\n--- ---");
        player.pressPlay(); 
        player.pressPause(); 
        player.pressPlay();  
        player.pressStop();  

    }
}

// Singleton Design Pattern is a design pattern that ensures a 
// class has only one instance and provides a global point of access to it.
class Singleton {
    static Singleton obj = new Singleton();
    private Singleton() {
    }
    public static Singleton getInstance() {
        return obj;
    }
}

// Builder Design Pattern is a design pattern that separates 
// the construction of a complex object from its representation.
class Phone {
    private String os;
    private String processor;
    private double screenSize;
    private int battery;
    private int camera;

    public Phone(String os, String processor, double screenSize, int battery, int camera) {
        this.os = os;
        this.processor = processor;
        this.screenSize = screenSize;
        this.battery = battery;
        this.camera = camera;
    }
    @Override
    public String toString() {
        return "Phone [os=" + this.os + 
        ", processor=" + this.processor + 
        ", screenSize=" + this.screenSize + 
        ", battery=" + this.battery + 
        ", camera=" + this.camera + "]";
    }
}

class PhoneBuilder {
    private String os;
    private String processor;
    private double screenSize;
    private int battery;
    private int camera;

    public PhoneBuilder setOs(String os) {
        this.os = os;
        return this;
    }
    public PhoneBuilder setProcessor(String processor) {
        this.processor = processor;
        return this;
    }
    public PhoneBuilder setScreenSize(double screenSize) {
        this.screenSize = screenSize;
        return this;
    }
    public PhoneBuilder setBattery(int battery) {
        this.battery = battery;
        return this;
    }
    public PhoneBuilder setCamera(int camera) {
        this.camera = camera;
        return this;
    }
    public Phone build() {
        return new Phone(os, processor, screenSize, battery, camera);
    }
}

// Decoorator Design Pattern is a design pattern that allows
// behavior to be added to an individual object, dynamically,
interface Coffee {
    String getDescription();
    double getCost();
}

class SimpleCoffee implements Coffee { 
    @Override
    public String getDescription() {
        return "Simple Coffee";
    }
    @Override
    public double getCost() {
        return 2.0;
    }
}

abstract class CoffeeDecorator implements Coffee {
    protected Coffee decoratedCoffee;

    public CoffeeDecorator(Coffee decoratedCoffee) {
        this.decoratedCoffee = decoratedCoffee;
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription();
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost();
    }
}

class Milk extends CoffeeDecorator {
    public Milk(Coffee decoratedCoffee) {
        super(decoratedCoffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Milk";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.5;
    }
}

class Sugar extends CoffeeDecorator {
    public Sugar(Coffee decoratedCoffee) {
        super(decoratedCoffee);
    }
    
    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + ", Sugar";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.2;
    }
}

class Whip extends CoffeeDecorator {
    public Whip(Coffee decoratedCoffee) {
        super(decoratedCoffee);
    }

    @Override
    public String getDescription() {
        return decoratedCoffee.getDescription() + " , Whip";
    }

    @Override
    public double getCost() {
        return decoratedCoffee.getCost() + 0.7;
    }
}

// Strategy Design Pattern defines a set of algorithms and encapsulates them 
// in independant classes so they can be used interchangeably
class Item {
    int price;

    public Item (int price) {
        this.price = price;
    }

    public int getPrice() {
        return this.price;
    }

    public void setPrice(int price) {
        this.price = price;
    }
}

interface PaymentStrategy {
    void pay(int amount);
}

class CreditCardStrategy implements PaymentStrategy {
    private String cardNumber;

    public CreditCardStrategy(String cardNumber) {
        this.cardNumber = cardNumber;
    }
    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount +
        " using Credit Card.");
    }
}

class PaypalStrategy implements PaymentStrategy {
    private String email;

    public PaypalStrategy(String email) {
        this.email = email;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + 
        " using Paypal.");
    }
}

class BitcoinStrategy implements PaymentStrategy {
    private String walletAddress;
    
    public BitcoinStrategy(String walletAddress) {
        this.walletAddress = walletAddress;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paid " + amount + 
        " using Bitcoin.");
    }
} 

class ShoppingCart { 
    private List<Item> items;

    public ShoppingCart() {
        this.items = new ArrayList<>();
    }

    public void addItem(Item item) {
        items.add(item);
    }

    public void removeItem(Item item) {
        items.remove(item);
    }

    public int calculateTotal() {
        int sum = 0;
        for (Item item : items) {
            sum += item.getPrice();
        }
        return sum;
    }

    public void pay(PaymentStrategy paymentStrategy) {
        int amount = calculateTotal();
        paymentStrategy.pay(amount);
    }
}

// Factory Design Pattern is a creational pattern
// that provides an interface for creating objects 
// in a superclass but allows subclasses to alter the type of objects that will be created. 
// it's about delegating object creation to specialized factory methods.
interface Vehicle {
    void drive();
    void getDescription();
}

class Car implements Vehicle {
    @Override
    public void drive() {
        System.out.println("Driving a car on the road.");
    }

    @Override
    public void getDescription() {
        System.out.println("A four-wheeled passenger vehicle.");
    }
}

class Truck implements Vehicle {
    @Override
    public void drive() {
        System.out.println("Driving a truck, hauling cargo.");
    }

    @Override
    public void getDescription() {
        System.out.println("A large vehicle for transporting goods.");
    }
}

class Motorcycle implements Vehicle {
    @Override
    public void drive() {
        System.out.println("Riding a motorcycle, feeling the wind.");
    }
    @Override
    public void getDescription() {
        System.out.println("A two-wheeled motor vehicle.");
    }
}

class VehicleFactory {
    public static Vehicle createVehicle(String type) {
        switch (type.toLowerCase()) {
            case "car":
                return new Car();
            case "truck":
                return new Truck();
            case "motorcycle":
                return new Motorcycle();
            default:
                throw new IllegalArgumentException("Unknown vehicle type: " + type);
        }
    }
}

// State Design Pattern 
class AudioPlayer {
    private PlayerState currentState;
    public AudioPlayer() {
        this.currentState = new StoppedState(); // Player starts in stopped mode
        System.err.println("Audio Player intialized.\n Current state: " + currentState.getClass().getSimpleName());
    }

    public void setState(PlayerState state) {
        this.currentState = state;
        System.out.println("State changed to: " + currentState.getClass().getSimpleName());
    }

    public void pressPlay() {
        currentState.pressPlay(this);
    }
    public void pressPause() {
        currentState.pressPause(this);
    }
    public void pressStop() {
        currentState.pressStop(this);
    }

    public void displayStatus() {
        System.out.println("Player status: " + currentState.getClass().getSimpleName());
    }
}

interface PlayerState {
    void pressPlay(AudioPlayer player);
    void pressPause(AudioPlayer player);
    void pressStop(AudioPlayer player);
}

class StoppedState implements PlayerState { 
    @Override
    public void pressPlay(AudioPlayer player) {
        System.out.println("Player: Starting playback.");
        player.setState(new playingState());
    }
    @Override
    public void pressPause(AudioPlayer player) {
        System.out.println("Player: Cannot pause when stopped.");
        player.setState(new pauseState());
    }
    @Override
    public void pressStop(AudioPlayer player) {
        System.out.println("Player: Already stopped.");
    }
}

class playingState implements PlayerState {
    @Override
    public void pressPlay(AudioPlayer player) {
        System.out.println("Player: Already playing.");
    }
    @Override
    public void pressPause(AudioPlayer player) {
        System.out.println("Player: Pausing playback.");
        player.setState(new pauseState());
    }
    @Override
    public void pressStop(AudioPlayer player) {
        System.out.println("Player: Stopping playback.");
        player.setState(new StoppedState());
    }
}

class pauseState implements PlayerState {
    @Override
    public void pressPlay(AudioPlayer player) {
        System.out.println("Player: Pausing playing.");
        player.setState(new playingState());
    }
    @Override
    public void pressPause(AudioPlayer player) {
        System.out.println("Player: Already paused.");
    }
    @Override
    public void pressStop(AudioPlayer player) {
        System.out.println("Player: Pausing playback.");
        player.setState(new StoppedState());
    }
}
