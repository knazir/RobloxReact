# Build project
npm run build

# Remove all files in remote directory except App_data
Get-ChildItem -Path \\ra-web214.roblox.local\c$\Roblox\KashifStatic\CI |
Select -ExpandProperty FullName |
Where {$_ -notlike '\\ra-web214.roblox.local\c$\Roblox\KashifStatic\CI\App_Data' -and $_ -notlike '\\ra-web214.roblox.local\c$\Roblox\KashifStatic\CI\web.config'} |
sort length -Descending |
Remove-Item -force -Recurse

# Transfer built project and static files
Copy-Item -Path ..\build\* \\ra-web214.roblox.local\c$\Roblox\KashifStatic\CI -Recurse
Copy-Item -Path ..\static\* \\ra-web214.roblox.local\c$\Roblox\KashifStatic\CI -Recurse
Copy-Item -Path ..\static\images\favicon.ico \\ra-web214.roblox.local\c$\Roblox\KashifStatic\CI