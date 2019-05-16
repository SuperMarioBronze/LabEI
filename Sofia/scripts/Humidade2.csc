atget id cid
loop
areadsensor k
if($k!=X)
rdata $k a b c
int c $c
println Humidade enviada: $c
data l $cid $c Parque2 ZonaA
send $l 2	
end
delay 1000
