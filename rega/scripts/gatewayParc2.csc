atget id id
loop
radio radio1
wait
read a
wait
read b
wait
read c
wait
read d
wait 
read e

rdata $b ID1 Temp 
rdata $c ID Hum 
rdata $a ID Ph 
rdata $d ID Lum 
rdata $e ID Flow

int Temp $Temp
int Hum $Hum
int Lum $Lum
int Flow $Flow
int Ph $Ph

time t
int tempo $t
getpos pos
set y 0

if($Flow!=0)
  if((($Temp>14) && ($Temp<=25)) && (($Hum>0) && ($Hum<=300)))
   if($Lum<60000)  
         led 13 1
	  print "Ideal for watering!" $a $b $c $d $e 
	        set y ($w+1)
		if(($y==1) || ($y==2))
		      set r 1
		     if($y==2)
		      set w 2
		     else
		       set w 1
		     end
		      set q 1
		      set p 0
		end 
	   if(($y==1) || ($y==2))
	     if($Flow<90)
		if($ID1==34)
			send A 0 16
		else
			send A 0 17
		end
	     else
		if($ID1==34)
		   set hu1 $Hum
 	        else
		   if($Hum<$hu1)
		      set hu2 $Hum
		      send A 0 17
		   else
		       send A 0 16   
	           end 
	        end
             end
	   end	
   else
	 led 13 2
	set p ($p+1)
         if(($q==1) || ($p==2))
	    set n 1
	 
	print $q
	 print "Not ideal for watering!" $a $b $c $d $e
		if($ID1==34)
			send B 0 16
		else
			send B 0 17
		end
         end	
   end
 else
         led 13 2
	 set p ($p+1)
         if(($q==1) || ($p==2))
	    set n 1
	 
	 print "Not ideal for watering!" $a $b $c $d $e 
		if($ID1==34)
			send B 0 16
		else
			send B 0 17
		end	
	 end
 end
end

if($tempo==0)
	set z 20
	set h ($z+1)
	int h $h
	set w 0
	set n 0
	set r 0
	set q 0
	set p 0
	set Tmp2 0
	set Hm2 0
	set Lm2 0
	set PH2 0
	set Tmp1 0
	set Hm1 0
	set Lm1 0
	set PH1 0
end


if($ID1!=34)
    	set Tmp $Tmp1 
	set Hm $Hm1
	set Lm $Lm1
	set PH $PH1
else
    	set Tmp $Tmp2 
	set Hm $Hm2
	set Lm $Lm2
	set PH $PH2
end

set tt ($Tmp+10)
set hh ($Hm+100)
set ll ($Lm+1000)
set pp ($PH+3)
set ttm ($Tmp-10)
set hhm ($Hm-100)
set llm ($Lm-1000)
set ppm ($PH-3)

if((($Temp>=$tt) || ($Temp<=$ttm)) || (($Hum>=$hh) || ($Hum<=$hhm)))
  data o $id $park $Temp $Hum $Ph $Lum $Flow $pos
	radio radio2
	send $o 8
end 

if((($Lum>=$ll) || ($Lum<=$llm)) || (($Ph>=$pp) || ($Ph<=$ppm)))
  data o $id $park $Temp $Hum $Ph $Lum $Flow $pos
	radio radio2
	send $o 8
end 

if($ID1==34)
	int Tmp2 $Temp
	int Hm2 $Hum
	int Lm2 $Lum
	int PH2 $Ph
else
	int Tmp1 $Temp
	int Hm1 $Hum
	int Lm1 $Lum
	int PH1 $Ph
end



set park 4
if(($r==1)||($n==1))
	data o $id $park $Temp $Hum $Ph $Lum $Flow $pos
	radio radio2
	send $o 8
	set r 0
	if($n==1)
           set w 0
	   set q 0
	end
	set n 0

end

if(($z==$tempo) || ($tempo==$h))
	data o $id $park $Temp $Hum $Ph $Lum $Flow $pos
	radio radio2
	send $o 8
	 set z ($z+6)
	 int z $z
	 set h ($z+1)
	 int h $h
	
end




