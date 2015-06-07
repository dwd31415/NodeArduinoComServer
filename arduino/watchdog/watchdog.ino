const byte inputPin = 9;
const byte ledPin = 13;
const String serialMessage = "DOOR_STATE_CHANGE";

byte lastDoorState = HIGH;

void setup() {
  pinMode(inputPin,INPUT_PULLUP);
  pinMode(inputPin,OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(ledPin,digitalRead(inputPin));
  if(digitalRead(inputPin) != lastDoorState)
  {
    Serial.println(serialMessage);
  }
  lastDoorState = digitalRead(inputPin);
}
