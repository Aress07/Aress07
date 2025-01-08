#!/bin/bash

clear 

echo "==========================="
echo "Server Performance Stats"
echo "==========================="
# CPU Load

CPU_IDLE=$(mpstat | tail -n +4 | awk '{print $NF}')
CPU_USAGE=$(echo "100 - $CPU_IDLE" | bc)
echo "Current CPU Usage: $CPU_USAGE%"

# Memory Load
TOTAL_MEMORY=$(cat /proc/meminfo | grep 'MemTotal' | awk '{print $2}')
FREE_MEMORY=$(cat /proc/meminfo | grep 'MemFree' | awk '{print $2}')
USED_MEMORY=$(echo "($TOTAL_MEMORY - $FREE_MEMORY) *100 / $TOTAL_MEMORY" | bc)
echo "Current Memory Usage: $USED_MEMORY%"

# Disk Usage
AVAIL=$(df -h --total | grep "total" | awk '{print $4}')
USED=$(df -h --total | grep "total" | awk '{print $5}')
echo "Current Used Disk space: $USED"
echo "Current Available Disk space: $AVAIL"

# Top 5 processes by CPU,RAM usage

Top_CPU=$(ps aux --sort=-%cpu | head -n 6 | awk '{print $1, $2, $3, $4}' |column -t)

Top_RAM=$(ps aux --sort=-%mem | head -n 6 | awk '{print $1, $2, $3, $4}'| column -t)

echo "===================================="
echo "Top 5 Processes by CPU usage: "
echo "$Top_CPU" 
echo "===================================="
echo "Top 5 Processes by RAM usage: "
echo "$Top_RAM" 
