#include <XBee.h>
#include <LiquidCrystal.h>

XBee xbee = XBee();
Rx64Response rx = Rx64Response() ;
Tx64Request tx;
XBeeAddress64 addr;
uint8_t sdata[30] ;
uint8_t* rdata;

LiquidCrystal lcd(8, 9, 4, 5, 6, 7);

void setup() {
	pinMode(1, OUTPUT);
	pinMode(13, OUTPUT);

	delay(100);
	Serial.begin(38400);
	xbee.setSerial(Serial);
	delay(100);
	lcd.begin(16, 2);
	lcd.setCursor(0,0);

// ----
}
void loop() {
// ----
	if((-48 +  (v.charAt(0)))!=X) {
// ----
// ----
	lcd.clear();
	lcd.print("temp");
	lcd.print("enviada:");
	lcd.print(c);

// ----
	for(int i=0; i<30; i++) {
		sdata[i] = d.charAt(i);
	}
	addr = XBeeAddress64(0X13A200, 0X40B5EF9E);
	tx = Tx64Request(addr, sdata, sizeof(sdata));
	xbee.send(tx);
}
	delay(1000);

}
