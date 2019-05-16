atget id cid
loop
areadsensor k
if($k!=X)
	rdata $k a b c
	int c $c
	println ph enviado: $c
	data d $cid $c
	send $d 1
		
end
delay 1000