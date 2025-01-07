#include <stdio.h>
#include <stdlib.h>

typedef struct noeud{
    int val;
    struct noeud *next;
}noeud;

noeud *createNoeud(int valeur){
    noeud *temp = malloc(sizeof(noeud));
    if ( temp == NULL) {
        printf("Failed to allocate memo\n");
        exit(EXIT_FAILURE);
    }
    temp->val = valeur;
    temp->next = NULL;
    return temp;
}

void printLinkedList(noeud *head){
    if (head == NULL) {
        printf("The given list is empty.\n");
        return;
    }
    noeud *temp = head;

    while(temp!=NULL) {
        printf("(%d) -> ",temp->val);
        temp = temp->next;      
    }
    printf("NULL\n");
}

