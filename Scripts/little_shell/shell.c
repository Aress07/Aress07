#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <ctype.h>
#include <fcntl.h>
#include <sys/wait.h>

#define MAX_TOKENS 100
#define MAX_TOKEN_LEN 256
#define MAX_ARGS 10
#define MAX_COMMANDS 5

typedef struct {
    char *argv[MAX_ARGS];
    char *input;
    char *output;
    int append;
} Command;

typedef struct {
    Command commands[MAX_COMMANDS];
    int command_count;
} Pipeline;

int split_command(const char *command, char tokens[MAX_TOKENS][MAX_TOKEN_LEN]) {
    int token_count = 0, i = 0, j = 0;
    int in_single_quote = 0, in_double_quote = 0;
    char c;

    while ((c = command[i]) != '\0') {
        if (!in_single_quote && !in_double_quote) {
            while (isspace(c)) {
                i++;
                c = command[i];
            }
        }
        if (c == '\0') break;

        j = 0;
        while (c != '\0' && (!isspace(c) || in_single_quote || in_double_quote)) {
            if (c == '\'' && !in_double_quote) {
                in_single_quote = !in_single_quote;
                i++;
            } else if (c == '\"' && !in_single_quote) {
                in_double_quote = !in_double_quote;
                i++;
            } else if (c == '\\') {
                i++;
                c = command[i];
                if (c == '\0') break;
                tokens[token_count][j++] = c;
                i++;
            } else {
                tokens[token_count][j++] = c;
                i++;
            }
            c = command[i];
        }
        tokens[token_count][j] = '\0';
        token_count++;

        if (token_count >= MAX_TOKENS) break;
    }
    return token_count;
}

int parse_tokens(char *tokens[], int token_count, Pipeline *pipeline) {
    memset(pipeline, 0, sizeof(Pipeline));
    int cmd_index = 0, arg_index = 0;
    pipeline->command_count = 1;

    for (int i = 0; i < token_count; i++) {
        if (strcmp(tokens[i], "|") == 0) {
            pipeline->commands[cmd_index].argv[arg_index] = NULL;
            cmd_index++;
            if (cmd_index >= MAX_COMMANDS) return -1;
            pipeline->command_count++;
            arg_index = 0;
        } else if (strcmp(tokens[i], ">") == 0) {
            pipeline->commands[cmd_index].output = tokens[++i];
            pipeline->commands[cmd_index].append = 0;
        } else if (strcmp(tokens[i], ">>") == 0) {
            pipeline->commands[cmd_index].output = tokens[++i];
            pipeline->commands[cmd_index].append = 1;
        } else if (strcmp(tokens[i], "<") == 0) {
            pipeline->commands[cmd_index].input = tokens[++i];
        } else {
            if (arg_index >= MAX_ARGS - 1) return -1;
            pipeline->commands[cmd_index].argv[arg_index++] = tokens[i];
        }
    }

    pipeline->commands[cmd_index].argv[arg_index] = NULL;
    return 0;
}

void execute_pipeline(Pipeline *pipeline) {
    int prev_fd = -1;
    int pipefd[2];

    for (int i = 0; i < pipeline->command_count; i++) {
        Command *cmd = &pipeline->commands[i];

        if (i < pipeline->command_count - 1) {
            if (pipe(pipefd) == -1) {
                perror("pipe");
                exit(1);
            }
        }

        pid_t pid = fork();
        if (pid == 0) {
            // Child

            if (cmd->input) {
                int fd = open(cmd->input, O_RDONLY);
                if (fd == -1) {
                    perror("open input");
                    exit(1);
                }
                dup2(fd, STDIN_FILENO);
                close(fd);
            }

            if (cmd->output) {
                int flags = O_WRONLY | O_CREAT | (cmd->append ? O_APPEND : O_TRUNC);
                int fd = open(cmd->output, flags, 0644);
                if (fd == -1) {
                    perror("open output");
                    exit(1);
                }
                dup2(fd, STDOUT_FILENO);
                close(fd);
            }

            if (prev_fd != -1) {
                dup2(prev_fd, STDIN_FILENO);
                close(prev_fd);
            }

            if (i < pipeline->command_count - 1) {
                close(pipefd[0]);
                dup2(pipefd[1], STDOUT_FILENO);
                close(pipefd[1]);
            }

            execvp(cmd->argv[0], cmd->argv);
            perror("execvp");
            exit(1);
        }
        if (prev_fd != -1) close(prev_fd);
        if (i < pipeline->command_count - 1) {
            close(pipefd[1]);
            prev_fd = pipefd[0];
        }
    }

    for (int i = 0; i < pipeline->command_count; i++) {
        wait(NULL);
    }
}

int main() {
    char line[1024];
    char tokens[MAX_TOKENS][MAX_TOKEN_LEN];
    char *token_ptrs[MAX_TOKENS];
    Pipeline pipeline;

    while (1) {
        printf("shell> ");
        fflush(stdout);

        if (!fgets(line, sizeof(line), stdin)) break;
        if (line[strlen(line) - 1] == '\n')
            line[strlen(line) - 1] = '\0';

        if (strcmp(line, "exit") == 0) break;

        int token_count = split_command(line, tokens);

        for (int i = 0; i < token_count; i++) {
            token_ptrs[i] = tokens[i];
        }

        if (parse_tokens(token_ptrs, token_count, &pipeline) == -1) {
            fprintf(stderr, "Error parsing command.\n");
            continue;
        }

        execute_pipeline(&pipeline);
    }

    return 0;
}
