#include <Arduino.h>
#include <WiFiManager.h>
#include <FastLED.h>
#include <WebSocketsServer.h>

#ifndef AmorLamps_h
#define AmorLamps_h

#define FASTLED_ESP8266_NODEMCU_PIN_ORDER
// How many leds in your strip?
#define NUM_LEDS 10
// RGB led
#define DATA_PIN 4 //d2




class AmorLamps
{
private:
    bool isLive;

public:
    // Constructor
    AmorLamps(/* args */);
    // Destructor
    ~AmorLamps();

    //Set the bool value of the isLive variable,and return with the newly set value.
    bool setIsLive(bool isLive);
    //Return the bool value of the isLive variable.
    bool getIsLive();
};

void printHeap();
// In void setup

bool updateto_givenfile_ConfigJSON(String &key, String &value, String &filename ,bool isToDelete);
bool updatetoConfigJSON(String key, String value);
bool removeFromConfigJSON(String key);

String readFrom_given_ConfigJSON(String &key, String &filename);
String readFromConfigJSON(String key);

void setup_config_vars();
void setup_ISRs();
void setupISR1();
void setupISR2();

ICACHE_RAM_ATTR void myIRS1();
ICACHE_RAM_ATTR void myIRS2();

void disable_touch_for_x_ms(uint16_t x);
void setup_RGB_leds();
void calibrate_setup_touch_sensor();

void wifiManagerSetup();
void tickWifiManagerLed();
void configModeCallback(WiFiManager *myWiFiManager);
String gethotspotname();


void setupUNIXTime();

void firmware_update_from_config();
void firmware_update_from_fs(String ota_filename);
void download_file_to_fs();
void delete_file_of_fs(String filename);

void websocket_server_mdns_setup();

void readAwsCerts();
void publish_boot_data();
void subscribeDeviceTopics();

String list_fs_files_sizes();
void listAndReadFiles(); //TODO: not for production
String get_ESP_core(String key) ;


// Other methods
void restart_device();
void forget_saved_wifi_creds();

void myIRS1_method();
void myIRS2_method();

void send_touch_toGroup();
void send_responseToAWS(String responseMsg);
void send_given_msg_to_given_topic(String topic ,String msg );

void reconnect_aws();
void aws_callback(char *topic, byte *payload, unsigned int length);
void rpc_method_handler(byte *payload, unsigned int length);


enum methodCode
{
  MSKIP,
  MSETHSV,     // 1: set_single_RGB_color
  MFADEINOUT,  // 2: fade_in_out_RGB_x_times
  MXMINSON,    // 3: turn_on_RGB_led_for_x_mins
  MUMYRGB,     // 4: update_my_rgb_hsv
  MUTOSENDRGB, // 5: update_tosend_rgb_hsv
  MIRS1,       // 6: myIRS1_method();
  MIRS2,       // 7: myIRS2_method();
  MBLEDX       // 8: blink_led_x_times

};

void method_handler(methodCode mc, int args, bool plus1arg, uint8_t s, uint8_t v);

void tick_set_single_RGB_color();
void tick_turn_on_RGB_led_for_x_mins();
void tick_fade_in_out_RGB_x_times();
void tick_blink_led_x_times();
void tick_turn_on_disco_mode_for_x_mins();
void tickWifiManagerLed();

void turn_off_rgb();
void turn_off_disco_mode();
void turn_on_disco_mode_for_x_mins(int x);
void set_single_RGB_color(uint8_t h, uint8_t s, uint8_t v);
void turn_on_RGB_led_for_x_mins(int x);
void fade_in_out_RGB_x_times(int x, bool isToSend);
void blink_led_x_times(int x, bool toSendHsv);

void update_my_rgb_hsv(uint8_t h, uint8_t s, uint8_t v);
void update_tosend_rgb_hsv(uint8_t h, uint8_t s, uint8_t v);
void update_x_min_on_value(int x);
void update_groupId(String gID);

void hslS2N(String mystr, uint8_t v);
String hslN2S(uint8_t h, uint8_t s, uint8_t l);

void ws_rpc_method_handler(uint8_t num, byte *payload, unsigned int length);
void webSocketEvent(uint8_t num, WStype_t type, uint8_t *payload, size_t length);
void replyOK();
void replyOKWithMsg(String msg);
void replyServerError(String msg);
void handleFileUpload();
void handleFileRead();
void handleNotFound();





// In void loop
void myIRS_check();
void setupUNIXTimeLoop();
void check_AWS_mqtt();
void websocket_server_mdns_loop();
void rgb_led_task_queue_CheckLoop();
void timerUpdateLoop();

#endif
