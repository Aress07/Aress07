def Permuter(t, a, b):
    t[a], t[b] = t[b], t[a]

def aj_Elm_Tas(t, size, v):
    t.append(v)
    indfils = size
    indpere = (indfils - 1) // 2
    while indfils >= 0 and indpere >= 0 and t[indfils] > t[indpere] :
        Permuter(t, indfils, indpere)
        indfils = indpere
        indpere = (indfils - 1) // 2

def Const_Tas(t, n):
    tas = []
    for i in range(n):
        aj_Elm_Tas(tas, i, t[i])
        print(tas)
    return tas

def Desc_Elm(T, i, taille):
    indFG = 2*i + 1
    indFD = 2*i + 2
    pasTrouve = 0
    while indFG < taille and pasTrouve == 0 :
        if indFD < taille:
            if T[i] >= T[indFG] and T[i] >= T[indFD]:
                pasTrouve = 1
            elif T[indFG] < T[indFD]:
                Permuter(T,i,indFD) #Permuter avec le plus grand des fils
                i = indFD
            else:
                Permuter(T,i,indFG)
                i = indFG
        else:
            if T[i] >= T[indFG]:
                pasTrouve = 1
            else:
                Permuter(T,i,indFG)
                i = indFG
        indFG = 2 * i + 1
        indFD = 2 * i + 2

def Tri_Tas(tab, n):
    tas = Const_Tas(tab, n)
    taille = n
    for i in range(n-1):
        taille -= 1
        Permuter(tas, 0, taille)
        Desc_Elm(tas, 0, taille)
    return tas

T = [75, 50, 80, 90, 70, 20, 45, 60, 30, 111]
B = [73 , 44 , 59 , 51 , 63 , 32 , 80 , 74 , 53 , 85]

tas = Tri_Tas(B,len(B))
print(tas)