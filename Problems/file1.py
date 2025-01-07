def hasDuplicate(nums) -> bool:
    HashSet = []
    for i in nums:
        if not (i in HashSet):
            HashSet.append(i)
        else:
            return True
    return False

def isAnagram(s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        countS, countT = {}, {}
        for i in range(len(s)):
            countS[s[i]] = 1 + countS.get(s[i],0)
            countT[t[i]] = 1 + countT.get(t[i],0)
        return countS == countT 
        # Another easier method but its complexity is high due to the sorting complexity
        # s = sorted(s)
        # t = sorted(t)
        # return s==t
