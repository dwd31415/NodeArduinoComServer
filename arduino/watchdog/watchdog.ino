const byte inputPin = 9;
const byte ledPin = 13;
const String serialMessage = "DOOR_STATE_CHANGE";

byte lastDoorState = HIGH;
bool ledIsOn = false;

void setup() {
  pinMode(inputPin,INPUT_PULLUP);
  pinMode(inputPin,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if(digitalRead(inputPin) != lastDoorState)
  {
    Serial.println(serialMessage);
    if(ledIsOn)
    {
      digitalWrite(ledPin,LOW);
      ledIsOn = false;
    }
    if(!ledIsOn)
    {
      digitalWrite(ledPin,HIGH);
      ledIsOn = true;
    }
  }
  lastDoorState = digitalRead(inputPin);
}
