import java.util.*;
// import java.util.stream.*;
// import java.util.function.*;

public class Java8Practice {
    public static void main(String[] args) {
        Runnable r = () -> System.out.println("Hello from lambda!");
        r.run();

        MyAdder adder = (a, b) -> a + b;
        System.out.println("Adder: " + adder.add(5, 3));
        List<String> names = Arrays.asList("bob", "alice", "john");
        names.stream()
            .filter(s -> s.length() > 3)
            .map(s -> s.toUpperCase())
            .forEach(System.out::println);


        names.forEach(System.out::println);

        Optional<String> maybeName = names.stream().filter(s -> s.startsWith("a")).findFirst();
        System.out.println("Optional: " + maybeName.orElse("not found"));
    }
}
interface MyAdder {
    int add(int x, int y);
} 