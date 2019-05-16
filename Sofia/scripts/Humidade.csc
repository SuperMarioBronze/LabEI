atget id cid
loop
areadsensor k
if($k!=X)
	rdata $k a b c
	int c $c
	println Humidade enviada: $c
	data l $cid $c JardimStBarbara ZonaA
	send $l 1
	
end
delay 1000