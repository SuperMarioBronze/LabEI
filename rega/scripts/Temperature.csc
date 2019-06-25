atget id cid
loop
areadsensor k
if($k!=X)
	rdata $k a b c
	int c $c
	println $c
	data d $cid $c
	if($cid ==12)
	        send $d 37
                delay 1000
	else
	      if($cid==3)
	             send $d 1
		     delay 1000
	      else
		    if($cid==34)
	               send $d 2
		       delay 1000
		    else
			 if($cid==16)
			    delay 1000
	      		    send $d 37
			 else
			     if($cid==23)
				delay 1000
	            		send $d 1
			     else
			        if($cid==30)
				   delay 1000
	            		   send $d 2
			        end
			     end
			 end
		     end
	       end
	end		
end

delay 1000
