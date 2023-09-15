#Tamaño maximo de los vectores
max = 15

#Creamos los vectores
vector1 = []
vector2 = []

#Solicitamos que se ingrese la cantidad de elementos a leer del vector
N = int(input("Ingrese la cantidad de elementos a leer del vector: "))

#Validamos que el tamaño del vector no sea mayor al tamaño maximo
if N > max:
    print("El tamaño del vector no puede ser mayor a 15")
else:

    #Leemos los datos del vector 1
    print("Ingrese los datos del vector 1")
    cont = 0
    while cont < N:
        valor = int(input(f"Ingrese el valor para la posicion {cont + 1}: "))
        if valor >=1 and valor <= 30:
            vector1.append(valor)
            cont += 1
        else:
            print("El valor ingresado no es valido")
    
    #Leemos los datos del vector 2
    print("Ingrese los datos del vector 2")
    cont = 0
    while cont < N:
        valor = int(input(f"Ingrese el valor para la posicion {cont + 1}: "))
        if valor >=1 and valor <= 30:
            vector2.append(valor)
            cont += 1
        else:
            print("El valor ingresado no es valido")

    #Ordenamos los vectores de forma ascendente
    vector1.sort()
    vector2.sort()

    #Imprimimos los vectores ordenados
    print("Vector 1 ordenado", vector1)
    print("Vector 2 ordenado", vector2)

    #Calculamos y sumamos ambos vectores por posicion
    sumaVectores = []
    for i in range(N):
        suma = vector1[i] + vector2[i]
        sumaVectores.append(suma)

    print("La suma de los vectores es: ", sumaVectores)