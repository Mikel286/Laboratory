from motores import servo360
from time import sleep
from machine import PWM, Pin

reloj = servo360(6)
while True:
    reloj.girar(70)
    sleep(0.01)
    reloj.detener()
    sleep(1)