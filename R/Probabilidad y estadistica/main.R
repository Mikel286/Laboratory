autos <- mtcars

# Manejo de base de datos y graficos

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

