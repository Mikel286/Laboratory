from motores import servo360
from time import sleep
from machine import PWM, Pin

reloj = servo360(6)
x = 0

while x < 100:

    for y in range (1,101):
        reloj.girar(90)
        sleep(0.2)
        reloj.detener()
        x += 1
        sleep(1)