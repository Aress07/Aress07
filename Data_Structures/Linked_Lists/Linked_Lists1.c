#include <stdio.h>
#include <stdlib.h>

typedef struct cel {
    float vl;
    struct cel *suiv;
}cellule;

void rotation(cellule **root) {
    cellule *temp = NULL, *curr = NULL;
    temp = *root;   
    if(*root==NULL || (*root)->suiv == NULL){
        return;
    }
    while (temp->suiv) {
        curr = temp;
        temp = temp->suiv;
    }
    temp->suiv = *root;
    curr->suiv = NULL;
    *root = temp;
}

void concat(cellule *L, cellule *M) {
    if(L==NULL || M==NULL) {
        printf("Rien a faire! \n");
        exit(1);
    }
    
    cellule *aux = L;
    while(aux->suiv) {
        aux = aux->suiv;
    }
    aux->suiv = M;
}

void clone (cellule *L, cellule **CL) {
    if (L == NULL || *CL != NULL) {
        printf("Rien a faire\n");
        exit(1);
    }

    *CL = malloc(sizeof(cellule));
    (*CL)->vl = L->vl;
    (*CL)->suiv = NULL;
    cellule *aux = L->suiv;
    cellule *curr = *CL;
    while(aux) {
        cellule *new_node = malloc(sizeof(cellule));
        
        new_node->vl = aux->vl;
        new_node->suiv = NULL;

        curr->suiv = new_node;
        curr = new_node;
        aux = aux->suiv;
    }
}