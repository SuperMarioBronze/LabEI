atget id cid
loop
areadsensor k
if($k!=X)
	rdata $k a b c
	int c $c
	println $c
	data l $cid $c 
	if($cid ==13)
	     send $l 37
	      delay 1000
	else
	       if($cid==4)
	            send $l 1
		    delay 1000
	       else
		    if($cid==35)
	      		 send $l 2
			 delay 1000
		    else
			 if($cid==17)
			    delay 1000
	      		    send $l 37
			 else
			      if($cid==25)
				delay 1000
	            		send $l 1 
			      else
			         if($cid==31)
				   delay 1000
	            		   send $l 2
			         end
			      end
			 end
		     end
	       end
	end		
end

delay 1000

