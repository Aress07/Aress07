#include <stdio.h>
#include <stdlib.h>
#include <math.h>
typedef struct cell {
    int x;
    struct cell *next;
} cell;

int rechMax(cell *root) {
    if (root == NULL) {
        printf("List is empty.\n");
        exit(1);
    }
    int max=root->x;
    while(root->next) {
        if (root->x > max) {
            max = root->x;
        }
        root = root->next;
    }
    return max;
}

void concatLists(cell **L1,cell *L2) {
    if (*L1 == NULL ) {
        printf("L1 is empty.\n");
        *L1 = L2;
        return;
    }
    cell *current = *L1;
    while(current->next) {
        (current) = (current)->next;
    }
    current->next = L2;
}

void sortParite(cell *root,cell **P,cell **I) {
    if (root == NULL) {
        printf("?\n");
        return;
    }
    *P = NULL;
    *I = NULL;
    cell *curr = root, *paire = NULL, *impaire = NULL;
    while(curr) {
        cell *newNode = malloc(sizeof(cell));
        newNode->x = curr->x;
        newNode->next = NULL;
        if((newNode->x % 2) == 0) {
            if(*P==NULL) {
                *P = newNode;
                paire = *P;
            }else {
                paire->next = newNode;
                paire = paire->next;
            }
        }else {
            if(*I==NULL) {
                *I = newNode;
                impaire = *I;
            }else {
                impaire->next = newNode;
                impaire = impaire->next;
            }
        }
        curr = curr->next;
    }
}

void echanger(cell **head,cell *v,cell *t) {
    if(*head == NULL || v == NULL || t == NULL) {
        printf("Invalid input or empty list.\n");
        return;
    }
    if(v==t){
        return; 
    }
    cell *curr = *head, *prev1=NULL, *prev2=NULL;

    while(curr) {
        if(curr->next==v) {
            prev1 = curr;
        }else if(curr->next==t) {
            prev2 = curr;
        }
        curr = curr->next;
    }
    if(prev1) {
        prev1->next = t;
    }
    if(prev2) {
        prev2 ->next = v;
    }
    cell *temp = v->next;
    v->next = t->next;
    t->next = temp;

    if(*head==v) {
        head = t;
    } else if (*head==t) {
        *head = v;
    }
}

void supprOcc(cell **root,int val,int k) {
    cell *curr=*root, *aux=NULL;
    if(curr->x == val && k==0) {
        *root = curr->next;
        free(curr);
        return; 
    }


    while(curr->next) {
        if(curr->next->x == val){
            k--;
        }
        if(curr->next->x == val && k==0){
            aux = curr->next->next;
            free(curr->next);
            curr->next = aux;
        }
        curr = curr->next;

    }
}

int polynome(cell *root) {
    int d=0,i=0,n;
    do {
        printf("Entrer a%d\n",i);
        scanf("%d",&n);
        cell *aux = malloc(sizeof(cell));
        aux->x = n;
        aux->next = root;
        root = aux;
        printf("Another coefficient? \n");
        scanf("%d",&d);
        i++;
    } while(d==1);
    cell *curr = root;
    printf("Enter a value to evaluate it's image by the polynome: \n");
    scanf("%d",&n);
    d = 0,i=0;
    while (curr) {
        d += curr->x*pow(n,i);
        i++;
        curr = curr->next;
    }
    curr = root;
    while(curr) {
        cell *tmp = curr;
        curr = curr->next;
        free(tmp);
    }
    return d;
}

void insertList(cell **root) {
    int d,n;
    cell *curr = NULL;
    do {
        printf("insert a value:\n");
        scanf("%d",&n);
        curr = malloc(sizeof(cell));
        if(curr==NULL) {
            printf("allocation failed");
            exit(1);
        }
        curr->x = n;
        curr->next = *root;
        *root = curr;
        printf("add another value?\n");
        scanf("%d",&d);
    } while (d==1);
}

void fermerList(cell **root) {
    if(*root==NULL) {
        printf("It's not possible\n");
        return;
    }

    cell *slow = *root, *fast = *root;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            printf("The list is already circular.\n");
            return;
        }
    }
    
    cell *curr = *root;
    while(curr->next) {
        curr = curr->next;
    }
    curr->next = *root;
}


