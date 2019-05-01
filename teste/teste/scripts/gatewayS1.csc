loop
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
