
@echo off  
dir /a-d /b >./zzz.txt
(for /f "delims=" %%a in (zzz.txt) do echo basep + "%%a",)>b.txt 
del /s/q zzz.txt 
ren b.txt zzz.txt