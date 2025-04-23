
# Ejercicio 1

# Ejercicio 1.1  (X ≤ 7) para X ∼ Normal(μ = 5.6, σ = 1.4)
valor_1 <- pnorm(7, mean = 5.6, sd = 1.4)

# Ejercicio 1.2  (3 < Z < 6) para Z ∼ Exp(ν = 0.4)
rate <- 1 / 0.4  # = 2.5
a <- pexp(3, rate = rate)
b <- pexp(6, rate = rate)
valor_2 <- b - a

# Ejercicio 1.3 P(4 ≤ Y ≤ 8) para Y ∼ Poisson(λ = 7)
a <- ppois(3, lambda = 7)
b <- ppois(8, lambda = 7)
valor_3 <- b - a 

# Ejercicio 1.4 P(X = 6) para X ∼ Binomial(p = 0.3, n = 10)
valor_4 <- dbinom(6, size = 10,  prob = 0.3)

# Ejercicio 1.5 P(x = 10) para X ∼ Geometrica(p = 0.3)
valor_5 <- 1 - pgeom(10, prob = 0.3)

# Ejercicio 1.6 P(X > 88) para X ∼ Uniforme(a = 12, b = 120)
valor_6 <- 1 - punif(88, min = 12, max = 120)

# Ejercicio 1.7 P(R < 40 ó R ≥ 66) para R ∼ Normal(µ = 46, σ = 17)
valor_7 <- pnorm(40, mean = 46, sd = 17) + ( 1 - pnorm(66, mean = 46, sd = 17))

# Ejercicio 1.8 P(2.1 < W < 5.8) W ∼ Exponencial(ν = 0.13)
a <- pexp(2.1, rate = 0.13)
b <- pexp(5.8, rate = 0.13)
valor_8 <- b - a

# Ejercicio 1.9 
primos <- c(2, 3, 5, 7, 11, 13, 17, 19, 23, 29)
valor_9 <- sum(dbinom(primos, size = 30, prob = 0.4))