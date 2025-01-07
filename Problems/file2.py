from collections import defaultdict
def twoSum(nums, target):
    # Brute Force O(n^2)
    # nig = {}
    # for i in range(len(nums)):
    #     for j in range(i+1,len(nums)):
    #         if nums[i] + nums[j] == target:
    #             nig.append(i), nig.append(j)
    # One Pass With Hash Map O(n)
    hashMap = {}
    out = []
    for i in range(len(nums)):
        diff = target - nums[i]
        if not diff in hashMap.keys():
            hashMap[nums[i]] = diff
        else:
            out.append(i)
            out.append(nums.index(diff))
    out = sorted(out)
    return out


def groupAnagrams(strs):
    # Sorting Complexity is O(m*n*logn)
    # res = defaultdict(list)
    # for s in strs:
    #     sortedS = "".join(sorted(s))
    #     res[sortedS].append(s)
    # return res.values()
        
    # HashMap Complexity is O(m*n)
    res = defaultdict(list)
    for s in strs:
        count = [0] * 26 
        for c in s:
            count[ord(c) - ord('a')] += 1
        res[tuple(count)].append(s)
    return res.values()
