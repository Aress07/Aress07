def encode(strs: list[str]) -> str:
    L = ""
    for word in strs:
        L += str(len(word)) + "#" + word
    return L

x = encode(["we","say",":","yes","!@#$%^&*()"]) 
print(x)
def decode(s: str) -> list[str]:
    L, i = [], 0
    while i < len(s):
        j = i
        while s[j] != '#':
            j += 1
            length = int(s[i:j])
            L.append(s[j+1: j+1+length])
        i = j + 1 + length
    return L
k = decode(x)
print(k)