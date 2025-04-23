

# Manejo de base de datos y graficos

# Ejercicio 1
autos <- mtcars

# Pregunta 1.a
medidas_autos <- summarise(autos, 
                           maximo = max(autos$mpg), 
                           minimo = min(autos$mpg), 
                           primerq = quantile(autos$mpg, 0.25), 
                           segundoq = quantile(autos$mpg, 0.50), 
                           tercerq = quantile(autos$mpg, 0.75), 
                           media=mean(autos$mpg))

# Pregunta 1.b
hist_autos <- hist(x= autos$mpg ,
                   main= "Histograma de autos$mpg",
                   breaks = 10, 
                   freq=TRUE, 
                   xlab= "Millas por galon", 
                   ylab= "Frecuencia", 
                   col= "gray")

abline(v = max(autos$mpg), col = "blue", lwd = 2, lty = 1)
abline(v = min(autos$mpg), col = "blue", lwd = 2, lty = 1)
abline(v = quantile(autos$mpg, 0.25), col = "green", lwd = 2, lty = 1)
abline(v = quantile(autos$mpg, 0.50), col = "green", lwd = 2, lty = 1)
abline(v = quantile(autos$mpg, 0.75), col = "green", lwd = 2, lty = 1)
abline(v = mean(autos$mpg), col = "red", lwd = 2, lty = 2)

box_autos <- boxplot(x= autos$mpg, 
                     main= "Boxplot de autos$mpg", 
                     xlab= "Millas por galon", 
                     ylab= "", 
                     horizontal=TRUE,
                     col="gray")

abline(v = max(autos$mpg), col = "blue", lwd = 2, lty = 2)
abline(v = min(autos$mpg), col = "blue", lwd = 2, lty = 2)
abline(v = quantile(autos$mpg, 0.25), col = "green", lwd = 2, lty = 2)
abline(v = quantile(autos$mpg, 0.50), col = "green", lwd = 2, lty = 2)
abline(v = quantile(autos$mpg, 0.75), col = "green", lwd = 2, lty = 2)
abline(v = mean(autos$mpg), col = "red", lwd = 2, lty = 2)

# Pregunta 1.c
medidas2_autos <- list(asimetria = skewness(autos$mpg), kurto = kurtosis(autos$mpg))

# Pregunta 1.d
autos_filtrado <- filter(autos, mpg>20) %>% group_by(cyl)
medidas_autos_filtrado <- summarise(autos_filtrado, 
                                    media = mean(hp))

# Pregunta 1.e
autos_filtrado2 <- filter(autos, mpg>20 & hp>180) %>% group_by(cyl, am)
info_autos_filtrados2 <- summarise(autos_filtrado2, 
                                   n_filas = nrow(autos_filtrado2),
                                   media = mean(disp),
                                   mediana = median(disp),
                                   ds = sd(disp))

# Ejercicio 2
flores <- iris

# Ejercicio 2.a
medidas_folores <- summarise(flores,
                             minimo = min(flores$Sepal.Length),
                             maximo = max(flores$Sepal.Length),
                             primerq = quantile(flores$Sepal.Length, 0.25),
                             segundoq = quantile(flores$Sepal.Length, 0.50),
                             tercerq = quantile(flores$Sepal.Length, 0.75),
                             media = mean(flores$Sepal.Length),
                             IQR = IQR(flores$Sepal.Length),
                             asimetria = skewness(flores$Sepal.Length),
                             kurto = kurtosis(flores$Sepal.Length))

# Ejercicio 2.b
flores1 <- subset(flores, Species %in% c("setosa", "versicolor"))
medidas_flores1 <- summarise(flores1,
                             minimo = min(flores1$Sepal.Length),
                             maximo = max(flores1$Sepal.Length),
                             primerq = quantile(flores1$Sepal.Length, 0.25),
                             segundoq = quantile(flores1$Sepal.Length, 0.50),
                             tercerq = quantile(flores1$Sepal.Length, 0.75),
                             media = mean(flores1$Sepal.Length),
                             IQR = IQR(flores1$Sepal.Length),
                             asimetria = skewness(flores1$Sepal.Length),
                             kurto = kurtosis(flores1$Sepal.Length))

# Ejercicio 2.d
ggplot(flores1, aes(x = Sepal.Length, fill = Species)) +
  geom_histogram(position = "identity", alpha = 0.6, bins = 20, col = "black") +
  labs(title = "Distribución de Sepal.Length por Especie",
       x = "Longitud del Sépalo",
       y = "Frecuencia") +
  theme_minimal()

# Ejercicio 2.e
flores1_agrupada <- flores1 %>% group_by(Species)
medidas_flores1_agrupada <- summarise(flores1_agrupada,
                             minimo = min(Sepal.Length),
                             maximo = max(Sepal.Length),
                             primerq = quantile(Sepal.Length, 0.25),
                             segundoq = quantile(Sepal.Length, 0.50),
                             tercerq = quantile(Sepal.Length, 0.75),
                             media = mean(Sepal.Length),
                             IQR = IQR(Sepal.Length),
                             asimetria = skewness(Sepal.Length),
                             kurto = kurtosis(Sepal.Length))

# Ejercicio 2.f
ggplot(flores, aes(x = Sepal.Length, y = Sepal.Width, color = Species)) +
  geom_point(size = 2) +
  labs(title = "Diagrama de dispersión: Sepal.Length vs Sepal.Width",
       x = "Largo del Sépalo (cm)",
       y = "Ancho del Sépalo (cm)") +
  theme_minimal()

medidas2_flores <- list(covarianza = cov(flores$Sepal.Length,flores$Sepal.Width),
                        correlacion = cor(flores$Sepal.Length,flores$Sepal.Width))

# Ejericio 2.g
flores2 <- subset(flores, Species %in% c("virginica", "versicolor"))
ggplot(flores2, aes(x = Sepal.Length, y = Sepal.Width, color = Species)) +
  geom_point(size = 2) +
  labs(title = "Diagrama de dispersión: Sepal.Length vs Sepal.Width",
       x = "Largo del Sépalo (cm)",
       y = "Ancho del Sépalo (cm)") +
  theme_minimal()

medidas_flores2 <- list(covarianza = cov(flores2$Sepal.Length,flores2$Sepal.Width),
                        correlacion = cor(flores2$Sepal.Length,flores2$Sepal.Width))

# Ejercicio 3
hist_normal <- hist(x= flores$Sepal.Width ,
               main= "Histograma de autos$mpg",
               breaks = 10, 
               probability = TRUE, 
               xlab= "Millas por galon", 
               ylab= "Frecuencia", 
               col= "gray")

curve(dnorm(x, 
            mean = mean(flores$Sepal.Width),
            sd = sd(flores$Sepal.Width)), 
      from = -4, 
      to = 4, 
      col = "blue", 
      lwd = 2,
      add = TRUE)

# Ejercicio 4  Normal X ∼ N (µ, σ2)

# Pregunta 4.a P(X ≤ 3,5)
prob_a <- pnorm(3.5, 
                mean = mean(flores$Sepal.Width), 
                sd = sd(flores$Sepal.Width))

# Pregunta 4.b P(X > 3,5)
prob_b <- 1 - pnorm(3.5, 
                mean = mean(flores$Sepal.Width), 
                sd = sd(flores$Sepal.Width))

# Pregunta 4.c P(2,5 ≤ X ≤ 3,5)
a <- 1 - pnorm(2.5, 
           mean = mean(flores$Sepal.Width), 
           sd = sd(flores$Sepal.Width))

b <- pnorm(3.5, 
           mean = mean(flores$Sepal.Width), 
           sd = sd(flores$Sepal.Width))
prob_c <- b - a

# Pregunta 4.d P(X ≤ k) = 0,8
val_x <- qnorm(0.8, 
               mean = mean(flores$Sepal.Width), 
               sd = sd(flores$Sepal.Width))

# Pregunta 4.e El cuantil correspondiente al 0,75.


