import java.util.ArrayList;
import java.util.List;

class HashNode {
    String k;
    int v;
    HashNode n;
    
    HashNode(String key, int val) {
        this.k = key;
        this.v = val;
        this.n = null;
    }
}

public class SimpleHashMap {
    private static final int SIZE = 16;
    private static final double FACTOR = 0.75;
    
    private HashNode[] arr;
    private int cap;
    private int count;
    
    public SimpleHashMap() {
        this.cap = SIZE;
        this.arr = new HashNode[cap];
        this.count = 0;
    }
    
    public SimpleHashMap(int c) {
        this.cap = c;
        this.arr = new HashNode[cap];
        this.count = 0;
    }
    
    private int getHash(String key) {
        if (key == null) return 0;
        int h = 0;
        for (int i = 0; i < key.length(); i++) {
            h = 31 * h + key.charAt(i);
        }
        return Math.abs(h) % cap;
    }
    
    public void put(String key, int value) {
        if (key == null) return;
        
        int idx = getHash(key);
        HashNode node = arr[idx];
        
        HashNode temp = node;
        while (temp != null) {
            if (temp.k.equals(key)) {
                temp.v = value;
                return;
            }
            temp = temp.n;
        }
        
        HashNode newNode = new HashNode(key, value);
        newNode.n = node;
        arr[idx] = newNode;
        count++;
        
        if (count >= cap * FACTOR) {
            makeItBigger();
        }
    }
    
    public Integer get(String key) {
        if (key == null) return null;
        
        int idx = getHash(key);
        HashNode temp = arr[idx];
        
        while (temp != null) {
            if (temp.k.equals(key)) {
                return temp.v;
            }
            temp = temp.n;
        }
        
        return null;
    }
    
    public boolean remove(String key) {
        if (key == null) return false;
        
        int idx = getHash(key);
        HashNode node = arr[idx];
        
        if (node != null && node.k.equals(key)) {
            arr[idx] = node.n;
            count--;
            return true;
        }
        
        HashNode temp = node;
        while (temp != null && temp.n != null) {
            if (temp.n.k.equals(key)) {
                temp.n = temp.n.n;
                count--;
                return true;
            }
            temp = temp.n;
        }
        
        return false;
    }
    
    public boolean hasKey(String key) {
        return get(key) != null;
    }
    
    public boolean hasValue(int value) {
        for (int i = 0; i < cap; i++) {
            HashNode temp = arr[i];
            while (temp != null) {
                if (temp.v == value) {
                    return true;
                }
                temp = temp.n;
            }
        }
        return false;
    }
    
    public List<String> getAllKeys() {
        List<String> keys = new ArrayList<>();
        for (int i = 0; i < cap; i++) {
            HashNode temp = arr[i];
            while (temp != null) {
                keys.add(temp.k);
                temp = temp.n;
            }
        }
        return keys;
    }
    
    public List<Integer> getAllValues() {
        List<Integer> vals = new ArrayList<>();
        for (int i = 0; i < cap; i++) {
            HashNode temp = arr[i];
            while (temp != null) {
                vals.add(temp.v);
                temp = temp.n;
            }
        }
        return vals;
    }
    
    public int getSize() {
        return count;
    }
    
    public boolean checkEmpty() {
        return count == 0;
    }
    
    public void removeAll() {
        arr = new HashNode[cap];
        count = 0;
    }
    
    private void makeItBigger() {
        HashNode[] oldArr = arr;
        int oldCap = cap;
        
        cap = cap * 2;
        arr = new HashNode[cap];
        count = 0;
        
        for (int i = 0; i < oldCap; i++) {
            HashNode temp = oldArr[i];
            while (temp != null) {
                put(temp.k, temp.v);
                temp = temp.n;
            }
        }
    }
    
    public void showMap() {
        System.out.println("HashMap stuff:");
        for (int i = 0; i < cap; i++) {
            System.out.print("Bucket " + i + ": ");
            HashNode temp = arr[i];
            if (temp == null) {
                System.out.println("empty");
            } else {
                while (temp != null) {
                    System.out.print("[" + temp.k + "=" + temp.v + "]");
                    if (temp.n != null) {
                        System.out.print(" -> ");
                    }
                    temp = temp.n;
                }
                System.out.println();
            }
        }
        System.out.println("Size: " + count + ", Capacity: " + cap);
        System.out.println();
    }
    
    public double getLoadFactor() {
        return (double) count / cap;
    }
    
    public int getCollisions() {
        int collisions = 0;
        for (int i = 0; i < cap; i++) {
            HashNode temp = arr[i];
            int chainLen = 0;
            while (temp != null) {
                chainLen++;
                temp = temp.n;
            }
            if (chainLen > 1) {
                collisions += chainLen - 1;
            }
        }
        return collisions;
    }
    
    public static void main(String[] args) {
        SimpleHashMap map = new SimpleHashMap(8);
        
        System.out.println("Testing Basic Operations");
        map.put("apple", 100);
        map.put("banana", 200);
        map.put("orange", 300);
        map.put("grape", 400);
        map.showMap();
        
        System.out.println("Testing Get Operations");
        System.out.println("Get 'apple': " + map.get("apple"));
        System.out.println("Get 'banana': " + map.get("banana"));
        System.out.println("Get 'mango' (not exists): " + map.get("mango"));
        
        System.out.println("\nTesting Contains Operations");
        System.out.println("Contains key 'apple': " + map.hasKey("apple"));
        System.out.println("Contains key 'mango': " + map.hasKey("mango"));
        System.out.println("Contains value 200: " + map.hasValue(200));
        System.out.println("Contains value 999: " + map.hasValue(999));
        
        System.out.println("\nTesting Update Operations");
        System.out.println("Updating 'apple' to 150");
        map.put("apple", 150);
        System.out.println("Get 'apple' after update: " + map.get("apple"));
        
        System.out.println("\nTesting Collections");
        System.out.println("All keys: " + map.getAllKeys());
        System.out.println("All values: " + map.getAllValues());
        System.out.println("Size: " + map.getSize());
        System.out.println("Is empty: " + map.checkEmpty());
        
        System.out.println("\nTesting Remove Operations");
        System.out.println("Remove 'banana': " + map.remove("banana"));
        System.out.println("Remove 'mango' (not exists): " + map.remove("mango"));
        map.showMap();
        
        System.out.println("Testing Collision Handling");
        map.put("cat", 500);
        map.put("dog", 600);
        map.put("bird", 700);
        map.put("fish", 800);
        map.showMap();
        
        System.out.println("Load factor: " + String.format("%.2f", map.getLoadFactor()));
        System.out.println("Number of collisions: " + map.getCollisions());
        
        System.out.println("\nTesting Resize");
        map.put("elephant", 900);
        map.put("lion", 1000);
        map.put("tiger", 1100);
        map.showMap();
        
        System.out.println("Testing Clear");
        map.removeAll();
        System.out.println("After clear - Size: " + map.getSize());
        System.out.println("Is empty: " + map.checkEmpty());
        map.showMap();
        
        System.out.println("Testing Edge Cases");
        SimpleHashMap edgeMap = new SimpleHashMap(4);
        
        edgeMap.put(null, 999);
        System.out.println("Put null key - Size: " + edgeMap.getSize());
        
        edgeMap.put("", 0);
        System.out.println("Put empty string key - Size: " + edgeMap.getSize());
        System.out.println("Get empty string key: " + edgeMap.get(""));
        
        edgeMap.put("key1", 100);
        edgeMap.put("key2", 100);
        System.out.println("Contains value 100: " + edgeMap.hasValue(100));
        System.out.println("All keys with value 100: " + edgeMap.getAllKeys());
        
        edgeMap.showMap();
    }
}