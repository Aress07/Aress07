class Queue {
    private int[] data;
    private int front, rear, size, cap;
    public Queue(int k) {
        data = new int[k];
        cap = k;
        front = 0;
        rear = -1;
        size = 0;
    }
    public boolean enQueue(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % cap;
        data[rear] = value;
        size++;
        return true;
    }
    public boolean deQueue() {
        if (isEmpty()) return false;
        front = (front + 1) % cap;
        size--;
        return true;
    }
    public int Front() {
        return isEmpty() ? -1 : data[front];
    }
    public int Rear() {
        return isEmpty() ? -1 : data[rear];
    }
    public boolean isEmpty() {
        return size == 0;
    }
    public boolean isFull() {
        return size == cap;
    }
    public static void main(String[] args) {
        Queue q = new Queue(3);
        System.out.println(q.enQueue(1)); 
        System.out.println(q.enQueue(2)); 
        System.out.println(q.enQueue(3)); 
        System.out.println(q.enQueue(4));
        
        System.out.println(q.Rear());     
        System.out.println(q.isFull());   
        System.out.println(q.deQueue());  
        System.out.println(q.enQueue(4)); 
        System.out.println(q.Rear());     
    }
} 