Function Register-Watcher {
    param ($folder)
    $filter = "*.*" # all files
    $watcher = New-Object IO.FileSystemWatcher $folder, $filter -Property @{
        IncludeSubdirectories = $true
        EnableRaisingEvents = $true
    }

    $changeAction = [scriptblock]::Create('
        $path = $Event.SourceEventArgs.FullPath
        $name = $Event.SourceEventArgs.Name
        $changeType = $Event.SourceEventArgs.ChangeType
        $timeStamp = $Event.TimeGenerated
        If ($name -notlike "build*" -and $name -notlike "*.ps1" -and $name -notlike ".*" -and $name -notlike "*_tmp_*" -and $name -notlike "node_modules*")
        {
            Write-Host "The file $name was $changeType at $timeStamp"
            Invoke-Expression ".\deploy.ps1"
        }
    ')

    Register-ObjectEvent $Watcher "Changed" -Action $changeAction
}

Register-Watcher "C:\Users\knazir\Desktop\RobloxReact"