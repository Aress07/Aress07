
import java.util.HashMap;
import java.util.Map;

public class HashMap1 {
    public static void main(String[] args) {
        HashMap<String, Integer> map = new HashMap<>();

        map.put("apple", 3);
        map.put("banana", 5);
        map.put("orange", 2);

        System.out.println("apple: " + map.get("apple"));
        System.out.println("grape: " + map.get("grape"));

        System.out.println("Contains banana? " + map.containsKey("banana"));
        System.out.println("Contains grape? " + map.containsKey("grape"));

        map.remove("banana");
        System.out.println("After removing banana: " + map);
        for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println(entry.getKey() + " => " + entry.getValue());
        }
    }
} 