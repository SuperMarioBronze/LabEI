loop
wait
read a
wait
read b
wait
read c

rdata $a ID Park Temp Hum Ph Lum Flow Pos
rdata $b ID Park Temp Hum Ph Lum Flow Pos
rdata $c ID Park Temp Hum Ph Lum Flow Pos

print $a $b $c 

printfile $a
printfile $b
printfile $c



