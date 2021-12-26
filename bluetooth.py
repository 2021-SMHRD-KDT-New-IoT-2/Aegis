from bluetooth import *
import paho.mqtt.client as paho
from paho import mqtt
import json
from io import StringIO
from threading import Thread
import time

time.sleep(5)
# setting callbacks for different events to see if it works, print the message etc.
def on_connect(client, userdata, flags, rc, properties=None):
    print("CONNACK received with code %s." % rc)

# with this callback you can see if your publish was successful
def on_publish(client, userdata, mid, properties=None):
    print("mid: " + str(mid))

# print which topic was subscribed to
def on_subscribe(client, userdata, mid, granted_qos, properties=None):
    print("Subscribed: " + str(mid) + " " + str(granted_qos))

# print message, useful for checking if it was successful
def on_message(client, userdata, msg):
    recvData =str(msg.payload.decode("utf-8"))
    print("Received message=", recvData)
    
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

def event():
    client_socket = BluetoothSocket(RFCOMM)

    client_socket.connect(("98:D3:91:FD:D1:C7",1))

    while True:
        msg = client_socket.recv(1024)
        if(msg == b'\x01'):
            msg ={"MacAddress":16777680,"on":1}
        else:
            msg={"MacAddress":16777680,"off":0}
        print("recived message : {}".format(msg))
        
        # setting callbacks, use separate functions like above for better visibility
                #client.on_subscribe = on_subscribe
        io=StringIO()
                
        json.dump(msg, io)
        data=io.getvalue()
        
        client.on_message = on_message
        client.on_publish = on_publish
                

        # subscribe to all topics of encyclopedia by using the wildcard "#"
        #client.subscribe("encyclopedia/#", qos=1)

        # a single publish, this can also be done in loops, etc.
        mqtt=client.publish("bc", payload=data, qos=0)
        
        
    print("Finished")
    client_socket.close()

if __name__=='__main__':
    thread = Thread(target=event(), args=(1,0,1000, result_list))
    thread.start()
    thread.join()

# loop_forever for simplicity, here you need to stop the loop manually
# you can also use loop_start and loop_stop
client.loop_forever()


