loop
wait
read a
wait
read b
wait
read c

rdata $a ID Parc Temp Hum Ph Lum
rdata $b ID Parc Temp Hum Ph Lum
rdata $c ID Parc Temp Hum Ph Lum

print $a $b $c

printfile $a $b $c

