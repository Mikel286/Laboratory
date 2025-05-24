from machine import Pin
from time import sleep
import sys

boton = Pin(0, Pin.IN, Pin.PULL_UP)

while True:
    if boton.value() == 0:
        print("PRESIONADO")  # Esto se manda por el puerto serial
    sleep(0.1)
