class ListNode {
    int val;
    ListNode next;
    
    ListNode(int x) {
        val = x; 
    }
}

class LinkedList {
    private ListNode head;
    
    public LinkedList() {
        this.head = null;
    }
    
    public void addFirst(int val) {
        ListNode newNode = new ListNode(val);
        newNode.next = head;
        head = newNode;
    }
    
    public void addLast(int val) {
        ListNode newNode = new ListNode(val);
        if (head == null) {
            head = newNode;
            return;
        }
        
        ListNode curr = head;
        while (curr.next != null) {
            curr = curr.next;
        }
        curr.next = newNode;
    }
    
    public void addAt(int index, int val) {
        if (index < 0) return;
        
        if (index == 0) {
            addFirst(val);
            return;
        }
        
        ListNode newNode = new ListNode(val);
        ListNode curr = head;
        
        for (int i = 0; i < index - 1 && curr != null; i++) {
            curr = curr.next;
        }
        
        if (curr == null) return; 
        
        newNode.next = curr.next;
        curr.next = newNode;
    }
    
    public boolean remove(int val) {
        if (head == null) return false;
        
        if (head.val == val) {
            head = head.next;
            return true;
        }
        
        ListNode curr = head;
        while (curr.next != null) {
            if (curr.next.val == val) {
                curr.next = curr.next.next;
                return true;
            }
            curr = curr.next;
        }
        return false;
    }
    
    public boolean removeAt(int index) {
        if (index < 0 || head == null) return false;
        if (index == 0) {
            head = head.next;
            return true;
        }
        ListNode curr = head;
        for (int i = 0; i < index - 1 && curr.next != null; i++) {
            curr = curr.next;
        }
        if (curr.next == null) return false; 
        curr.next = curr.next.next;
        return true;
    }
    
    public boolean removeFirst() {
        if (head == null) return false;
        head = head.next;
        return true;
    }
    
    public boolean removeLast() {
        if (head == null) return false;
        if (head.next == null) {
            head = null;
            return true;
        }
        ListNode curr = head;
        while (curr.next.next != null) {
            curr = curr.next;
        }
        curr.next = null;
        return true;
    }
    
    public int indexOf(int val) {
        ListNode curr = head;
        int index = 0;
        while (curr != null) {
            if (curr.val == val) {
                return index;
            }
            curr = curr.next;
            index++;
        }
        return -1; 
    }
    
    public boolean contains(int val) {
        return indexOf(val) != -1;
    }
    public int get(int index) {
        if (index < 0 || head == null) return -1;
        ListNode curr = head;
        for (int i = 0; i < index && curr != null; i++) {
            curr = curr.next;
        }
        return curr != null ? curr.val : -1;
    }
    public int getFirst() {
        return head != null ? head.val : -1;
    }
    
    public int getLast() {
        if (head == null) return -1;
        
        ListNode curr = head;
        while (curr.next != null) {
            curr = curr.next;
        }
        return curr.val;
    }
    
    public int size() {
        int count = 0;
        ListNode curr = head;
        while (curr != null) {
            count++;
            curr = curr.next;
        }
        return count;
    }
    
    public boolean isEmpty() {
        return head == null;
    }
    
    public void clear() {
        head = null;
    }
    
    public void reverse() {
        ListNode prev = null;
        ListNode curr = head;
        while (curr != null) {
            ListNode next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
    }
    
    public int getMiddle() {
        if (head == null) return -1;
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow.val;
    }
    
    public boolean hasCycle() {
        if (head == null || head.next == null) return false;
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
    
    public void removeDuplicates() {
        ListNode curr = head;
        while (curr != null && curr.next != null) {
            if (curr.val == curr.next.val) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }
    }
    
    public void printList() {
        if (head == null) {
            System.out.println("Empty list");
            return;
        }
        ListNode curr = head;
        while (curr != null) {
            System.out.print(curr.val);
            if (curr.next != null) {
                System.out.print(" -> ");
            }
            curr = curr.next;
        }
        System.out.println();
    }
    
    public int[] toArray() {
        int size = size();
        int[] arr = new int[size];
        ListNode curr = head;
        int index = 0;
        while (curr != null) {
            arr[index++] = curr.val;
            curr = curr.next;
        }
        return arr;
    }
}

public class Main {
    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        
        System.out.println("=== Testing Add Methods ===");
        list.addLast(1);
        list.addLast(2);
        list.addLast(3);
        list.addFirst(0);
        list.addAt(2, 10);
        System.out.print("List after adding elements: ");
        list.printList();
        
        System.out.println("\n======");
        System.out.println(list.size());
        System.out.println(list.getFirst());
        System.out.println(list.getLast());
        System.out.println(list.get(2));
        System.out.println(list.getMiddle());
        
        System.out.println("\n======");
        System.out.println(list.indexOf(10));
        System.out.println(list.contains(5));
        System.out.println(list.contains(2));
        
        System.out.println("\n======");
        System.out.println(list.remove(10));
        System.out.print("After removing 10: ");
        list.printList();
        
        System.out.println(list.removeAt(1));
        System.out.print("After removing 1: ");
        list.printList();
        
        System.out.println("\n======");
        list.reverse();
        System.out.print("After reversing: ");
        list.printList();
        
        list.clear();
        list.addLast(1);
        list.addLast(1);
        list.addLast(2);
        list.addLast(2);
        list.addLast(3);
        System.out.print("List with duplicates: ");
        list.printList();
        
        list.removeDuplicates();
        System.out.print("Without duplicates: ");
        list.printList();
        
        System.out.println("\nTo Array");
        int[] arr = list.toArray();
        System.out.print("[");
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i]);
            if (i < arr.length - 1) System.out.print(", ");
        }
        System.out.println("]");
        
        System.out.println("\nEdge Cases");
        LinkedList emptyList = new LinkedList();
        System.out.println("Empty list size: " + emptyList.size());
        System.out.println("Empty list contains 1: " + emptyList.contains(1));
        System.out.print("Empty list: ");
        emptyList.printList();
        
        System.out.println("\n======");
        LinkedList singleList = new LinkedList();
        singleList.addFirst(42);
        System.out.print("Single element list: ");
        singleList.printList();
        System.out.println("Middle of single element: " + singleList.getMiddle());
        System.out.println("Remove first: " + singleList.removeFirst());
        System.out.print("After removing first: ");
        singleList.printList();
    }
}