loop
wait
read a
rdata $a ID Temp Zona

print $ID $Temp
if($Temp < 26 && $Temp>14)
	led 13 2
	print "Temperatura normal"
else
	mark 1
	print "Fora dos valores seguros!"
end