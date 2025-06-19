
class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
         val = x; 
    }
}

public class LinkedListPr {
    public static ListNode removeElem(ListNode head, int val) {
        ListNode d = new ListNode(0);
        d.next = head;
        ListNode curr = d;
        while (curr.next != null) {
            if (curr.next.val == val) {
                curr.next = curr.next.next;
            } else {
                curr = curr.next;
            }
        }
        return d.next;
    }
    public static void main(String[] args) {
        ListNode n1 = new ListNode(1);
        ListNode n2 = new ListNode(2);
        ListNode n3 = new ListNode(6);
        ListNode n4 = new ListNode(3);
        n1.next = n2; 
        n2.next = n3; 
        n3.next = n4;
        ListNode res = removeElem(n1, 6);
        while (res != null) {
            System.out.print(res.val + " ");
            res = res.next;
        }
    }
} 