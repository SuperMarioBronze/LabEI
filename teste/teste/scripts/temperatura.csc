atget id id
loop
areadsensor v
if($v!=X)
rdata $v a b c
int c $c
println temp enviada: $c
data d $id $c ZonaA
send $d 1
end