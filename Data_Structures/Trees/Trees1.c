#include <stdio.h>
#include <stdlib.h>

typedef struct Arb{
    int val;
    struct Arb* FD;
    struct Arb* FG;
}noeud;

noeud *InsererArb(noeud *Ar, int valeur)
{
    if(Ar==NULL)
    {
        noeud *nouv=NULL;
        nouv = malloc(sizeof(noeud));
        nouv->val = valeur;
        nouv->FG = nouv-> FD = NULL;
        return nouv;
    }
    else
    {
        if(valeur > Ar->val)
        {
            Ar->FD = InsererArb(Ar->FD, valeur);
        }
        else
        {
            Ar->FG = InsererArb(Ar->FG, valeur);
        }
    }
    return Ar;
}

void afficherArb(noeud *Ar,int d){
    if (d==1){ //prefixe
        if (Ar != NULL)
        {
            printf("(%d) -> ",Ar->val);
            afficherArb(Ar->FG,d);
            afficherArb(Ar->FD,d);
        }
    } 
    if (d==2){ //infixe
        if(Ar!=NULL){
            afficherArb(Ar->FG,d);
            printf("(%d) -> ",Ar->val);
            afficherArb(Ar->FD,d);
        }
    }
    if (d==3){ //postfixe
        if(Ar!=NULL){
            afficherArb(Ar->FG,d);
            afficherArb(Ar->FD,d);
            printf("(%d) -> ",Ar->val);
        }
    }
}

int max(int x, int y){
    return (x>y)?x:y;
}

int hauteurAr(noeud *Ar){
    if (Ar == NULL){
        return 0;
    }else{
        return 1 + max(hauteurAr(Ar->FG),hauteurAr(Ar->FD));
    }
}

int tailleAr(noeud *Ar){
    if (Ar == NULL){
        return 0;
    }else{
        return 1 + tailleAr(Ar->FD) + tailleAr(Ar->FG);
    }
}

noeud *rechercheAr(noeud *Ar, int valeur)
{
    if (Ar == NULL || Ar->val == valeur) {
        return Ar;
    }
    if (Ar->val > valeur){
        Ar = rechercheAr(Ar->FG,valeur);
    }else{
        Ar = rechercheAr(Ar->FD,valeur);
    }
}

// Fonction pour trouver le min dans le sous arbre droit
noeud *FindMin(noeud *Ar){
    while(Ar->FG != NULL){
        Ar = Ar->FG;
    }
    return Ar;
}

void deleteNode(noeud **Ar,int valeur){
    if(*Ar==NULL) return;
    if (valeur < (*Ar)->val){
        deleteNode(&((*Ar)->FG),valeur);
    }else if (valeur > (*Ar)->val ){
        deleteNode(&((*Ar)->FD),valeur);
    }else{
        if ((*Ar)->FD == NULL && (*Ar)->FG == NULL){
            free(*Ar);
            *Ar = NULL;
        }else if((*Ar)->FG == NULL){
            noeud *temp = (*Ar)->FD;
            free(*Ar);
            *Ar = temp; 
        }else if((*Ar)->FD == NULL){
            noeud *temp = (*Ar)->FG;
            free(*Ar);
            *Ar = temp;
        }else {
            noeud* temp = FindMin((*Ar)->FD);
            (*Ar)->val = temp->val;
            deleteNode(&((*Ar)->FD),temp->val);
        }
    }
}

int sommeAr(noeud *Ar){
    int total = 0;
    if(Ar!=NULL){
        total = Ar->val + sommeAr(Ar->FG) + sommeAr(Ar->FD);
    }
    return total;
}


int main(){
    noeud *Ar=NULL;
    int n,choix;
    do{
        printf("Entrer une valeur: ");
        scanf("%d",&n);
        Ar = InsererArb(Ar,n);
        printf("Voulez Vous continuer? (1/0) ");
        scanf("%d",&choix);
    }while(choix==1);
    printf("\n=====prefixe=====\n");
    afficherArb(Ar,1);
    printf("\n=====infixe======\n");
    afficherArb(Ar,2);
    printf("\n=====postfixe=====\n");
    afficherArb(Ar,3);
    printf("\nhateur et taille\n");
    printf("%d \n",hauteurAr(Ar));
    printf("%d \n",tailleAr(Ar));
    return 0;
}