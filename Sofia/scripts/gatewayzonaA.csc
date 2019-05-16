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

rdata $b ID Temp Parc Zona
rdata $c ID1 Hum Parc Zona
rdata $a ID Ph Parc Zona
rdata $d ID Lum Parc Zona
int Temp $Temp
int Hum $Hum
int Lum $Lum

if((($Temp>14) && ($Temp<=25)) && (($Hum>0) && ($Hum<=300)))
   if(($Lum>0) && ($Lum<4000)) 
         led 13 1
         print "Ideal para a rega!" 
   else
	 led 13 2
	 print "Não é bom para regar!"
   end
else
         led 13 2
	 print "Não é bom para regar!" 
	
end

data d $id $Parc $Temp $Hum $Ph $Lum
radio radio2
send $d 8


