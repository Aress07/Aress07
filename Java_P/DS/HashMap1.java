// Practice: Using Java's built-in HashMap
import java.util.HashMap;
import java.util.Map;

public class HashMap1 {
    public static void main(String[] args) {
        // Create a HashMap
        HashMap<String, Integer> map = new HashMap<>();

        // Put some key-value pairs
        map.put("apple", 3);
        map.put("banana", 5);
        map.put("orange", 2);

        // Get a value
        System.out.println("apple: " + map.get("apple"));
        System.out.println("grape: " + map.get("grape")); // null if not present

        // Check if a key exists
        System.out.println("Contains banana? " + map.containsKey("banana"));
        System.out.println("Contains grape? " + map.containsKey("grape"));

        // Remove a key
        map.remove("banana");
        System.out.println("After removing banana: " + map);

        // Iterate over keys and values
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " => " + entry.getValue());
        }
    }
} 