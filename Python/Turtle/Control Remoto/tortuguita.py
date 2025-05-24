import turtle
import serial

try:
    puerto = serial.Serial('COM28', 9600, timeout=1)
    print("Conexión al puerto serial exitosa.")
except Exception as e:
    print(f"No se pudo conectar al puerto serial: {e}")
    exit()

t = turtle.Turtle()
pantalla = turtle.Screen() 

def leer_serial():
    if puerto.in_waiting:
        linea = puerto.readline().decode().strip()
        print(f"Dato recibido: {linea}")
        if linea == "AVANZAR":
            t.forward(50)
        elif linea == "GIRA":
            t.right(10)
        elif linea == "MENSAJE":
            print("Hola, soy tortuga...")
            
    pantalla.ontimer(leer_serial, 100)

pantalla.ontimer(leer_serial, 100)
pantalla.mainloop()
