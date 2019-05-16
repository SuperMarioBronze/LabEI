atget id cid
loop
areadsensor k
if($k!=X)
	rdata $k a b c
	int c $c
	println temp enviada: $c
	data d $cid $c JardimStBarbara ZonaA
	send $d 1
			
end
delay 1000
