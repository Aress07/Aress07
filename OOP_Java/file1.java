import java.util.*;
public class Main {
    public static void main(String[] args) {
        int[] arr = {3, -1, 5, 6, -5, 10};
        int[] positives = new int[arr.length];
        int[] negatives = new int[arr.length];
//        sort(arr);
//        System.out.println(Arrays.toString(arr));
//        System.out.println("==========================");
//        separateSign(arr, positives, negatives);
//        System.out.println(Arrays.toString(positives));
//        System.out.println(Arrays.toString(negatives));
//        System.out.println("===========================");
//        int[] array = remplirTableau(10);
//        System.out.println(Arrays.toString(array));
        affiche(arr);
        List<String> com = genererCombinaisons("taha");
        System.out.println(com);
    }

    public static void sort(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = i; j < arr.length; j++) {
                if (arr[i] > arr[j]) {
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }
    }

    public static void separateSign(int[] arr, int[] positives, int[] negatives) {
        int j = 0, k = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] >= 0) {
                positives[k++] = arr[i];
            } else {
                negatives[j++] = arr[i];
            }
        }
    }

    public static int[] remplirTableau(int n) {
        int[] arr = new int[n];
        int i = 0, j = 5;
        while (i < n) {
            arr[i++] = j++;
        }
        return arr;
    }

    public static void affiche(int[] arr) {
        System.out.println(arr[arr.length - 2]);
    }

    public static List<String> genererCombinaisons(String mot) {
        char[] motChar = mot.toCharArray();
        int i = 0;
        String current = "";
        List<String> result = new ArrayList<>();
        Combinations(motChar, i, current, result);
        return result;
    }

    public static void Combinations(char[] arr, int index, String current, List<String> result) {
        if (index == arr.length) {
            result.add(current);
            return;
        }
        Combinations(arr, index + 1, current, result);
        Combinations(arr, index + 1, current + arr[index], result);
    }

}