def topKFrequent(nums, k):
    hashMap = {}
    for i in nums:
        hashMap[i] = 1 + hashMap.get(i, 0)
    hashMap = dict(sorted(hashMap.items(), key=lambda item: item[1], reverse=True))
    return list(hashMap.keys())[:k] 
# My Solution, O(nlogn)

def topKFrequent2(nums, k):
    count = {}
    freq = [[] for i in range(len(nums) + 1)]
    
    for n in nums:
        count[n] = 1 + count.get(n ,0)
    for n, c in count.items():
        freq[c].append(n)

    res = []
    for i in range(len(freq) - 1, 0, -1):
        for n in freq[i]:
            res.append(n)
            if len(res) == k:
                return res
# Solution Learned, O(n), it helps to avoid sorting so that the complexity doesn't get to nlogn