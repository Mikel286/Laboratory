# Ejercicio 1

# Pregunta 1.1
val_1 <- 0
for (i in 1:10) {
      val_1 <- val_1 + i}

# Pregunta 1.2
val_2 <- 0
for (i in 10:73) {
  val_2 <- val_2 + i**4}

# Pregunta 1.3
val_3 <- 0
for (i in 3:7) {
  val_3 <- val_3 + (6 * sqrt(3 * i))}

# Pregunta 1.4
val_4 <- 0
for (i in 1:21) {
  val_4 <- val_4 + log(i/10)}

# Pregunta 1.5
val_5 <- 0
for (i in 1:100) {
  val_5 <- val_5 + (1/i)}

# Pregunta 1.6
val_6 <- 0
for (i in 1:20) {
  val_6 <- val_6 + sin((i*pi)/5)**2}

# Pregunta 1.7
val_7 <- 0
for (i in 3:20) {
  val_7 <- val_7 + ((-0.6)**i)/i}

# Ejercicio 2

# 🔴 🔴 Importamos el dataset abalon.xlsx

# Pregunta 2.1
n_locos_caldera <- Abalon %>% filter(Abalon$centro == "Caldera") %>% nrow()

# Pregunta 2.2
mean_largo <- Abalon$largo %>% mean()

# Pregunta 2.3
ds_pesot <- Abalon$pesot %>% sd()

# Pregunta 2.4
mean_pesot_coquimbo <- Abalon %>% filter(centro == "Coquimbo") %>% pull(pesot) %>% mean()

# Pregunta 2.5
mean_largo_10 <- Abalon %>% filter(largo > 10) %>% pull(largo) %>% mean()

# Pregunta 2.6
mean_alto_PC <- Abalon %>% filter(centro == " Puerto Montt" | centro == "Chiloé") %>% pull(alto) %>% mean()

# Pregunta 2.7
n_locos_12anillos <- Abalon %>% filter(anillos >= 12) %>% nrow()

# Pregunta 2.8
n_locos_anillos_Caldera <- Abalon %>% filter(anillos >= 12 & centro == "Caldera") %>% nrow()

# Pregunta 2.9
n_locos <- nrow(Abalon)
n_locos_200_600 <- Abalon %>% filter(pesot >= 200 & pesot <= 600) %>% nrow()/400

# Pregunta 2.10
n_locos_Chiloe <- Abalon %>% filter(centro == "Chiloé") %>% nrow()/n_locos

# Ejercicio 3

# 🔴 🔴 Importamos el dataset BandaAncha.xlsx

# Ejercicio 3.1
mean_velocidad <- mean(BandaAncha$Velocidad)

# Ejercicio 3.2
n_ciudades <- BandaAncha %>% distinct(Ciudad) %>% nrow()

# Ejercicio 3.3
velocidad_CIquieque <- BandaAncha %>% filter(Operador == "C" & Ciudad == "Iquique") %>% pull(Velocidad)

# Ejercicio 3.4
mean_velocidad_Illapel <- BandaAncha %>% filter(Ciudad == "Illapel") %>% pull(Velocidad) %>% mean()

# Ejercicio 3.6
max_operador_Arauco <- BandaAncha %>% filter(Ciudad == "Arauco" & Velocidad == max(Velocidad[Ciudad == "Arauco"])) %>% pull(Operador)

# Ejercicio 3.7
ciudad_max_W <- BandaAncha %>% filter(Operador == "W" & Velocidad == max(Velocidad[Operador == "W"])) %>% pull(Ciudad)