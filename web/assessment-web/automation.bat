@echo off

REM Step 1: Run 'ng build' command
call ng build

REM Step 2: Copy the 'dist' folder to the Nginx 'html' folder
xcopy /E /I /Y /Q /H /R "dist" "C:\nginx-1.24.0\html"