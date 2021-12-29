import time
import paho.mqtt.client as paho
from paho import mqtt
import pexpect, re, sys
import datetime
import json
from io import StringIO
from threading import Thread
from bluetooth import *
from gtts import gTTS


time.sleep(5)

# setting callbacks for different events to see if it works, print the message etc.
# mqtt 연결
def on_connect(client, userdata, flags, rc, properties=None):
    print("CONNACK received with code %s." % rc)

# with this callback you can see if your publish was successful
# mqtt 데이터 발행
def on_publish(client, userdata, mid, properties=None):
    print("mid: " + str(mid))

# print which topic was subscribed to
# 토픽
def on_subscribe(client, userdata, mid, granted_qos, properties=None):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

# print message, useful for checking if it was successful
def on_message(client, userdata, msg):
    recvData =str(msg.payload.decode("utf-8"))
    print("Received message=", recvData)
    
def measureDistance(txPower, rssi): # 비콘 거리
    if rssi ==0:
        return -1.0 # 정확성을 결정 못할 경우 -1
    
    ratio =rssi * 1.0 / txPower
    
    if ratio < 1.0:
        return pow(ratio, 10)
    else:
        return (0.089976) * pow(ratio, 7.7095) + 0.111
    
# using MQTT version 5 here, for 3.1.1: MQTTv311, 3.1: MQTTv31
# userdata is user defined data of any type, updated by user_data_set()
# client_id is the given name of the client
client = paho.Client(client_id="", userdata=None, protocol=paho.MQTTv5)
client.on_connect = on_connect

# enable TLS for secure connection
client.tls_set(tls_version=mqtt.client.ssl.PROTOCOL_TLS)
# set username and password
client.username_pw_set("kimbumjong", "Qjawn9679")
# connect to HiveMQ Cloud on port 8883 (default for MQTT)
client.connect("850e1de2597e4f2d9496cfe35ffb2019.s1.eu.hivemq.cloud", 8883)



def scan(): #비콘 
    scan = pexpect.spawn("sudo hcitool lescan --duplicates 1>/dev/null")
    p=pexpect.spawn("sudo hcidump --raw")
    capturing =0
    packet =""
    

    while True:
        
        line = p.readline()
        if not line: break
        if capturing ==0:
            if line[0] =='>' or line[0] ==62:
                packet = line[2:].strip()
                capturing =1
        else:
            if re.match("^[0-9a-fA-F]{2}\ [0-9a-fA-F]", line.strip().decode('utf-8')):
                packet += b' '+line.strip()
            elif re.match("^04\ 3E\ 2A\ 02\ 01\ .{26}\ 02\ 01\ .{14}\ 02\ 15",
                          packet.decode('utf-8')):
               #print("packet = "+packet)
                #UUID=packet[69:116].replace(b' ',b'')
                #UUID=UUID[0:8]+b'-'+UUID[8:12]+b'-'+UUID[12:16]+b'-'+UUID[16:20]+b'-'+UUID[20:]
                MACADRESS=int(packet[13:24].replace(b' ',b''),16) # mac주소
                POWER=int(packet[129:131].replace(b' ',b''),16)-256 
                RSSI=int(packet[132:134].replace(b' ',b''),16)-256
                now = datetime.datetime.now() #현재 시간 
               
                #if len(sys.argv) != 1 and sys.argv[1] == "-b" :
                 #   print(UUID, MAJOR, MINOR, POWER, RSSI)
                #else:
                 #   print("MACADRESS: %s POWER: %d RSSI: %d" %(MACADRESS,POWER, RSSI), now)
                  
                distance=pow(10,(POWER-RSSI)/(10*2))  
                #distance=measureDistance(POWER, RSSI)
               # print('distance=', distance)
                
                
                data = {"MacAddress": MACADRESS,"Rssi": RSSI,"Distance": distance}
                print(data)
                
                io = StringIO()
                json.dump(data, io) # data json 으로 변경
             
                bdata=io.getvalue()
                #print(bdata)
                
                # setting callbacks, use separate functions like above for better visibility
                #client.on_subscribe = on_subscribe
                client.on_message = on_message
                client.on_publish = on_publish
                

                # subscribe to all topics of encyclopedia by using the wildcard "#"
                #client.subscribe("encyclopedia/#", qos=1)

                # a single publish, this can also be done in loops, etc.
                mqtt=client.publish("abc", payload=bdata, qos=0) # 토픽 설정후 hive mq로 발행
                            
                capturing =0
                packet=''
            elif len(packet) > 90:
                capturing =0
                packet=''
    
            
    
if __name__=='__main__':
    thread = Thread(target=scan(), args=(1,0,1000, result_list))
    thread.start()
    thread.join()

# loop_forever for simplicity, here you need to stop the loop manually
# you can also use loop_start and loop_stop
client.loop_forever()


        

