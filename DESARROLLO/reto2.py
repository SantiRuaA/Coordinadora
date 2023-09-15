#Tamaño maximo de la matriz
maxFilas = 7
maxColumnas = 50

#Solicitar la cantidad de vacas por consola
while True:
    cantVacas = int(input("Ingrese la cantidad de vacas (entre 3 y 50):"))
    if cantVacas >= 3 and cantVacas <= 50:
        break
    else:
        print("El valor ingresado no es valido")

#Creamos la matriz de produccion de leche de las vacas, iniciamos con 0.0 en todas las posiciones de la matriz
produccionLeche = [[0.0] * cantVacas for _ in range(maxFilas)] #iniciamos los valores en 0.0 y esto lo multiplicamos por la cantidad de vacas, luego de esto lo multiplicamos por la cantidad de filas para que todos los valores de la matriz sean 0.0

#matriz de dias de la semana
diasSemana = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]

#Produccion total de leche por cada dia inicializada en 0.0
produccionTotalDias = [0.0] * maxFilas

#Variables para el seguimiento de la produccion maxima y minimas
diaProduccionMaxima = ""
diaProduccionMinima = ""
produccionMaxima = -1.0
produccionMinima = float("inf") #esto significa que tenemos un flotante con un valor infinito

#Encontrar la vaca que mas leche produjo en cada dia
vacaMasLeche = [0] * maxFilas

#Sacamos la produccion de leche de cada vaca por dia
for dia in range(maxFilas):
    print(f"Ingrese la produccion de leche de las vacas para el dia {diasSemana[dia]}:")
    for vaca in range(cantVacas):
        while True:
            produccion = float(input(f"Ingrese la produccion de leche de la vaca {vaca + 1}: "))
            if 0.0 <= produccion <= 11.9: #validamos que la produccion este entre 0.0 y 11.9
                produccionLeche[dia][vaca] = produccion
                produccionTotalDias[dia] += produccion
                if produccion > produccionMaxima:
                    produccionMaxima = produccion
                    diaProduccionMaxima = dia
                if produccion < produccionMinima:
                    produccionMinima = produccion
                    diaProduccionMinima = dia
                    vacaMasLeche[dia] = vaca + 1 #guardamos la vaca que mas leche produjo en el dia
                break
            else:
                print("Produccion no valida, ingresa un valor entre 0.0 y 11.9")

#Mostramos el resultado de la produccion de leche por dia
print("\nProducción total del hato en cada uno de los siete días:")
for dia in range(maxFilas):
    print(f"Día {dia + 1}: {produccionTotalDias[dia]}")

#Mostramos el dia que mas leche se produjo y el dia que menos leche se produjo
print("\nDía de la semana con mayor y menor producción:")
print(f"Mayor producción: Día {diaProduccionMaxima + 1}")
print(f"Menor producción: Día {diaProduccionMinima + 1}")

#Mostramos la vaca que mas leche produjo por dia
print("\nEl número de la vaca que dio más leche en cada día:")
for dia in range(maxFilas):
    print(f"Día {dia + 1}: Vaca(s) ", end="") #el end es para que no se haga un salto de linea
    #en esta linea estamos usando una comprension de listas, esto es una forma de crear una lista a partir de otra lista, en este caso estamos creando una lista de vacas que produjeron la cantidad maxima de leche en el dia
    vacasMaximas = [vaca + 1 for vaca, produccion in enumerate(produccionLeche[dia]) if produccion == produccionMaxima] 
    if vacasMaximas:
        print(" – ".join(map(str, vacasMaximas)))
    else:
        print("Empate entre todas las vacas :0")




