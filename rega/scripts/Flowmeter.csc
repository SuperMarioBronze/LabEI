atget id cid
loop
areadsensor k
if($k!=X)
	rdata $k a b c
	int c $c
	println $c
	data d $cid $c
	if($cid==20)
	        send $d 37
	else
	       if($cid==21)
	            send $d 1
	       else
		    if($cid==22)
	      		 send $d 2
		    end
	       end
	end		
end

delay 1000
