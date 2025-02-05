# Counting Sort O(n+k) 
def countingSort(arr):
    c = max(arr) + 1
    counting = [ 0 for _ in range(c)]
    sorted_arr = []
    for i in arr:
        counting[i] += 1
    for i in range(c):
        if counting[i] != 0:
            sorted_arr += counting[i] * [i]
    return sorted_arr

#When to Use Counting Sort?
# Counting Sort is better when:
# The range of numbers (k) is not too large compared to n.
# You need linear time sorting (faster than O(n log n) for small k).
# The data consists of small integers or limited-range values.
# Counting Sort is NOT good when:
# The range of numbers (k) is too big (e.g., sorting numbers from 1 to 10⁹ would require a massive array).
# You need an in-place sorting algorithm (Counting Sort uses extra memory).
# You are sorting floating-point numbers, strings, or complex objects (Counting Sort only works with integers).
