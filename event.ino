
#include <SoftwareSerial.h>

SoftwareSerial mySerial(3, 2); // RX, TX

int btn =9;

void setup()
{
  pinMode(btn, INPUT);
  pinMode(12, OUTPUT);
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  mySerial.begin(9600);
 
}

int cnt =1;
boolean check = true;

void loop(){
  int btnState =digitalRead(btn);
  if (btnState ==1){
    if(check){
      check = false;
      cnt+=1;
      Serial.println(cnt);
      if(cnt==1){
        digitalWrite(12,1);
         mySerial.write(cnt);
      }else if(cnt==2){
        digitalWrite(12,0);
          mySerial.write(cnt);
        cnt =0;
      }
    }
  }else if (btnState==0){
    check =true;
  }
}


