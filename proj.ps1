Clear-Host 
Write-Host "===================================================="
Write-Host "Welcome to the Interactive Administrative Center!"
Write-Host "1. View System Information `n2. Manage Files `n3. Open EventViewer `n4. Exit `nPlease select an option:"
Write-Host "===================================================="
$choice = Read-Host -Prompt "Enter a number"

switch ($choice) {
    1 {
        $cpu_usage = (Get-Counter '\Processor(_Total)\% Processor Time').CounterSamples.CookedValue
        $cpu_usage = [Math]::Round($cpu_usage,2)
        $Total_memory = (Get-CimInstance Win32_OperatingSystem).TotalVisibleMemorySize
        $free_memory = (Get-CimInstance Win32_OperatingSystem).FreePhysicalMemory
        $used_memory = ((($Total_memory - $free_memory) / $Total_memory) * 100)
        $used_memory = [Math]::Round($used_memory,2)
        $drive = Get-PSDrive C
        $usedGB = [math]::Round(($drive.Used / 1GB), 2)
        $Sys_info = $cpu_usage, $used_memory, $usedGB
        Write-Host "The CPU Usage Currently is:" $Sys_info[0]"%`nThe Memory Usage Currently is:" $Sys_info[1]"%`nThe Used Hard Memory is:" $Sys_info[2]"GB"
    }
    2 {
        Get-ChildItem
        Write-Host "What Operation You wanna do? `n1. Create a new file `n2. Delete a file `n3. Delete a directory"
        $operation = Read-Host "Enter a number"
        switch ($operation) {
            1 {
                $new_file_name = Read-Host -Prompt "Enter the file name"
                New-Item $new_file_name -type file
            }
            2 {
                $file_name = Read-Host -Prompt "Enter the file path"
                $confirmation = Read-Host "Are you sure you want to delete this file? (Y/N)"
                if ($confirmation -eq "Y") {
                    Remove-Item -Path $file_name
                }
            }
            3 {
                $directory_name = Read-Host -Prompt "Enter the directory"
                $confirmation = Read-Host "Are you sure you want to delete this directory? (Y/N)"
                if ($confirmation -eq "Y") {
                    Remove-Item -Path $directory_name -Recurse
                }
            }
            default {
                Write-Host "Please Enter a valid number!"
            }
            # Could Add More File Management Operations Such As Creating, Renaming ... 
        }
        Get-ChildItem
    }
    3 {
        Start-Process eventvwr -Verb RunAs
    }
    4{
        Break
    }
    default {
        Write-Host "Please Enter a valid number!"
    }
}