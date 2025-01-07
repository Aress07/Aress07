def Merge(a,lo,mid,hi):
    # Variables i, j, k, N, aux[] : Entier
    i ,j = lo, mid
    N = hi - lo
    aux = [0] * N
    for k in range(N):
        if i == mid:
            aux[k] = a[j]
            j += 1
        elif j == hi:
            aux[k] = a[i]
            i += 1
        elif a[i] > a[j]:
            aux[k] = a[j]
            j += 1
        else:
            aux[k] = a[i]
            i += 1
    for k in range(N):
        a[lo + k] = aux[k]

def Merge_Sort(a,lo,hi):
    #Variables N, mid: Entier
    N = hi - lo
    if N <= 1: return  #Tableau de taille 1 est considere trie
    mid = lo + N//2
    Merge_Sort(a,lo,mid)
    Merge_Sort(a,mid,hi)
    Merge(a,lo,mid,hi)

b=[5,2,4,7,1,3,2,6]
Merge_Sort(b,0,8)
print(b)