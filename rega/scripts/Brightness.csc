atget id cid
loop
areadsensor k
if($k!=X)
	rdata $k a b c
	int c $c
	println $c
	data l $cid $c
	if($cid ==15)
	   send $l 37
	   delay 1000
	else
	       if($cid==6)
	            send $l 1
		    delay 1000
	       else
		    if($cid==37)
	      		 send $l 2
			 delay 1000
		    else
			 if($cid==18)
   			    delay 1000
	      		    send $l 37
			 else
			    if($cid==24)
				delay 1000
	                 	send $l 1
			    else
			      if($cid==33)
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

