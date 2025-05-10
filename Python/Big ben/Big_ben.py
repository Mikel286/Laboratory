from motores import servo360
from time import sleep
from machine import PWM, Pin

reloj = servo360(6)

reloj.girar(50)
sleep(0.5)
reloj.detener()