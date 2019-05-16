atget id cid
loop
areadsensor k
if($k!=X)
	rdata $k a b c
	int c $c
	println ph enviado: $c
	data d $cid $c JardimStBarbara ZonaB
	send $d 37
		
end
delay 1000