atget id cid
loop
areadsensor k
if($k!=X)
rdata $k a b c
int c $c
println temp enviada: $c
data d $cid $c Parque2 ZonaA
send $d 2
			
end
delay 1000
