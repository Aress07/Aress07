#include <stdio.h>
#include <stdlib.h>

typedef struct Node{
    int x;
    struct Node* next;
}Node;

// Exercice 1
int max(Node* root) {
    int max = root->x;
    for(Node* curr = root; curr!=NULL; curr = curr->next) {
        if (curr->x > max) {
            max = curr->x;
        }
    }
    return max;
}

int maxRec(Node* node) {
    if (node->next==NULL) {
        return node->x;
    }
    int maxOfRest = maxRec(node->next);
    return node->x > maxOfRest ? node->x : maxOfRest;
}

// Exercice 2
void concatLists(Node** List1, Node** List2) {
    Node* curr = NULL;
    if(*List1 == NULL) {
        *List1 = *List2;
        return;
    }
    for(curr = *List1; curr->next != NULL; curr = curr->next) {
        // Did This Just to reach the end of the list.
        // Then Point to the head of the List2
    }
    curr->next = *List2;
}


