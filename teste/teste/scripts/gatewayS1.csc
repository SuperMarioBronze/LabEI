atget id id
loop
radio radio1
wait
read a
rdata $a ID Temp Zona
int Temp $Temp
print $ID $Temp
if(($Temp>14) &&($Temp<26))
	led 1 1
	print "Temperatura normal"
else
	led 1 2
	print "Fora dos valores seguros!"
end
data d $id $Temp
radio radio2
send $d 4