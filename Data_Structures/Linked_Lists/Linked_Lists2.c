#include <stdio.h>
#include <stdlib.h>
 
typedef struct Node {
    int x;    
    struct Node *next;
} Node;

void insert_end(Node **root, int value) {
    Node *new_node = malloc(sizeof(Node));
    new_node->next = NULL;
    new_node->x = value;

    if (*root == NULL) {
        *root = new_node;
        return;
    }

    Node *curr = *root;
    while (curr->next != NULL) {
        curr = curr->next;
    }
    curr->next = new_node;
}

void deallocate(Node **root) {
    Node *curr = *root;
    while (curr != NULL) {
        Node *aux = curr;
        curr = curr->next;
        free(aux);
    }
    *root = NULL;
}

void deallocateRec(Node **root) {
    if (*root == NULL) {
        return;
    }
    Node *curr = *root;
    deallocateRec(&(curr->next));
    free(curr);
    *root = NULL;
}

void insert_beginning(Node **root, int value) {
    Node *new = malloc(sizeof(Node));
    new->x = value;
    new->next = *root;
    *root = new;
}

void insert_after(Node* node, int value) {
    Node* new_node = malloc(sizeof(Node));
    new_node->x = value;
    new_node->next = node->next;
    node->next = new_node;
}

void insert_sorted(Node** root, int value) {
    if (*root == NULL || (*root)->x >= value) {
        insert_beginning(root, value);
        return;
    }

    Node* curr = *root;
    while (curr->next != NULL) {
        if (curr->next->x >= value) {
            break;
        }
        curr = curr->next;
    }
    insert_after(curr, value);
}

void insert_dynamically_beginning(Node **root) {
    int n,choix;
    do {
        Node *aux = malloc(sizeof(Node));
        printf("Enter a value: ");
        scanf("%d",&n);
        aux->x = n;
        aux->next = *root;
        *root = aux;
        printf("want to add another value? ");
        scanf("%d",&choix);
    }while(choix == 1);
    
}

void remove_element(Node** root, int value) {
    if (*root == NULL) {
        return;
    }

    if((*root)->x == value) {
        Node* to_remove = *root;
        *root = (*root)->next;
        free(to_remove);
    }
    for (Node* curr = *root; curr->next != NULL; curr = curr->next) {
        if (curr->next->x == value) {
            Node * to_remove = curr->next;
            curr->next = curr->next->next;
            free(to_remove);
            return;
        }
    }
}

void reverse(Node** root) {
    Node* prev = NULL;
    Node* curr = *root;
    
    while (curr != NULL) {
        Node* next = curr->next;

        curr->next = prev;

        prev = curr;
        curr = next;
    }
    *root =  prev;
}

int has_loops(Node* root) {
    Node* slow = root;
    Node* fast = root;
    while(slow != NULL && fast->next != NULL) {
        slow = slow->next;
        fast = fast->next->next;

        if (slow == fast) {
            return 1;
        }
    }

    return 0;
}

int count(Node* root) {
    int c = 0;
    for (Node* curr = root; curr != NULL; curr = curr->next) {
        c++;
    }
    return c;
}

int countRec(Node* node) {
    if (node == NULL) {
        return 0;
    }
    return 1 + countRec(node->next);
}

int main() {
    Node *root = NULL;

    insert_end(&root, 1);
    insert_end(&root, 1);
    insert_end(&root, 3);
    insert_end(&root, 6);
    insert_end(&root, 7);

    Node *curr = root;
    while (curr != NULL) {
        printf("%d -> ", curr->x);
        curr = curr->next;
    }
    printf("NULL\n");

    printf("Linked list has %d elements",countRec(root));
    deallocate(&root);
    return 0;
}