atget id cid
loop
areadsensor k
if($k!=X)
	rdata $k a b c
	int c $c
	println Humidade enviada: $c
	data l $cid $c JardimStBarbara ZonaB
	send $l 37
	
end
delay 1000