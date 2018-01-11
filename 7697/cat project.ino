
#include <Wire.h>
#include <SeeedOLED.h>
#include <Grove_LED_Bar.h>
#include <LWiFi.h>
#include <PubSubClient.h>
// DHT
#include "DHT.h"
#define DHTPIN 2
#define DHTTYPE DHT22 
DHT dht(DHTPIN, DHTTYPE);

int i;

Grove_LED_Bar __bar2(7, 4, 0);

//char ssid[] = "BL530";
//char password[] = "CCTslab530";
char ssid[] = "Li Wen's iPhone";
char password[] = "0923321103";
//char mqtt_server[] = "test.mosquitto.org";
char mqtt_server[] = "140.112.41.157";

char sub_topic[] = "sub_topic";
char pub_topic[] = "pub_topic";
char client_Id[] = "7697client-01";
char pub_msg[] = "hello world!";
char temp_topic[] = "7697-Temp";
char hum_topic[] = "7697-Hum";

int status = WL_IDLE_STATUS;

WiFiClient mtclient;      //從WiFiClient 產生 mtclient的物件
PubSubClient client(mtclient);
long lastMsg = 0;
char msg[50];
int value = 0;


void setup() {
  __bar2.begin();
  
  // put your setup code here, to run once:
  Serial.begin(9600); 
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  dht.begin();
  //pinMode(A0,OUTPUT);

  // OLED
  Wire.begin();
  SeeedOled.init();  
  SeeedOled.clearDisplay();  //清除螢幕
  SeeedOled.setNormalDisplay(); //設定螢幕為正常模式(非反白)
  SeeedOled.setTextXY(0,0); //設定啟始坐標
  SeeedOled.putString("Temp & Humi % Light"); 
}

void loop() {
 if (!client.connected()) {
    reconnect();
  }
  client.loop();
  long now = millis();  
  // put your main code here, to run repeatedly:
  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float l = analogRead(A0);
  char temp[70];
  sprintf(temp, "%3.2f", t);
  char hum[70];
  sprintf(hum, "%3.2f", h);
 if (now - lastMsg > 2000) {
   lastMsg = now;
    ++value;  
  Serial.print("Class_Humidity: "); 
  Serial.print(h);
  Serial.print(" %\t");
  Serial.print("Class_Temperature: "); 
  Serial.print(t);
  Serial.println(" *C\t");
  client.publish(temp_topic, temp);
  client.publish(hum_topic, hum);
  } 
  // OLED

  SeeedOled.setTextXY(1,0); //設定啟始坐標
  SeeedOled.putString("Temp: "); 
  SeeedOled.putNumber(t); 
  SeeedOled.putString(" *C"); 
  SeeedOled.setTextXY(2,0); //設定啟始坐標
  SeeedOled.putString("Humi: "); 
  SeeedOled.putNumber(h); 
  SeeedOled.putString(" %");
  //SeeedOled.setTextXY(3,0); //設定啟始坐標
  //SeeedOled.putString("Light: "); 
  //SeeedOled.putNumber(l); 
  //SeeedOled.putString(" degree");

 /*if (h>80){
     for (i = 0; i <= 10; i++) {
    __bar2.setLevel(i);
    delay(3000);
  }
  }else{
    __bar2.begin() ;
    __bar2.setLevel(0);
    }*/
  delay(500); //每秒回傳一次資料


 
  

  //delay(3000);
}
void setup_wifi() {
  // attempt to connect to Wifi network:
  Serial.print("Attempting to connect to SSID: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("Connected to wifi");
  printWifiStatus();
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Input Message arrived [");
  Serial.print(sub_topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
}

void reconnect() {  //重新連線MQTT
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = client_Id;
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      client.publish(pub_topic, client_Id);
      // ... and resubscribe
      client.subscribe(sub_topic);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void printWifiStatus() {                     //顯示Wifi狀態
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
