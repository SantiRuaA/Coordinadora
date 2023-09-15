//importamos la libreria readline para poder leer datos desde la consola
const readline = require('readline');

//creamos la interfaz para poder leer datos desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//creamos las clases necesarias para el reto
class productoModel {
  //constructor de la clase
  constructor(codigo, nombre, precio) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.precio = precio;
  }
}

class clienteModel {
  //constructor de la clase
  constructor(nit, nombre, telefono, direccion, email) {
    this.nit = nit;
    this.nombre = nombre;
    this.telefono = telefono;
    this.direccion = direccion;
    this.email = email;
  }
}

class ventaModel {
  //constructor de la clase
  constructor(cliente, productos) {
    this.cliente = cliente;
    this.productos = productos;
  }
  //metodo para calcular el total de la venta, este se enceunta en la clase Venta porque es un metodo que se ejecuta sobre un objeto de la clase Venta
  calcularTotal() {
    //reduce es un metodo de los arreglos que nos permite recorrerlos y realizar una operacion con cada elemento
    return this.productos.reduce((total, producto) => total + producto.precio, 0); //se hace el reduce sobre el arreglo de productos y se va sumando el precio de cada producto al total de la venta (0 es el valor inicial del total)
  }
}

//creamos los arreglos para almacenar los productos, clientes y ventas
const productos = [];
const clientes = [];
const ventas = [];

//Creamos la funcion para registrar un producto
function registrarProducto() {
  rl.question("Nombre del producto ('fin' para finalizar): ", (nombre) => { //preguntamos el nombre del producto con rl.question y el callback se ejecuta cuando el usuario ingresa el nombre
    if (nombre.toLowerCase() === 'fin') {
      mostrarMenu();
      return;
    }
    //si el nombre no es 'fin' entonces preguntamos el precio del producto
    rl.question("Precio del producto: ", (precio) => {
      //creamos el codigo del producto sumando 1 al tamaño del arreglo de productos
      const codigo = productos.length + 1;
      //creamos el objeto producto con los datos ingresados por el usuario
      const producto = new productoModel(codigo, nombre, parseFloat(precio));
      //agregamos el producto al arreglo de productos
      productos.push(producto);

      console.log(`Producto ${codigo} registrado: ${nombre} - Precio: $${precio}`);
      registrarProducto();
    });
  });
}

//creamos la funcion para registrar un cliente
function registrarCliente() {
  rl.question("Ingrese los datos del cliente (nit, nombre, telefono, direccion, email): ", (datosCliente) => {
    const [nit, nombre, telefono, direccion, email] = datosCliente.split(',').map((item) => item.trim()); //separamos los datos ingresados por el usuario y los asignamos a las variables correspondientes, el map es para quitar los
    const cliente = new clienteModel(parseInt(nit), nombre, telefono, direccion, email); // espacios en blanco de cada dato y el item.trim() es una funcion que quita los espacios en blanco al inicio y al final de cada dato
    clientes.push(cliente);
    console.log(`Cliente registrado: ${nombre} (NIT: ${nit})`);
    mostrarMenu();
  });
}

function registrarVenta() {
  rl.question("Ingrese los datos de la venta (clienteIndex, productos): ", (datosVenta) => {
    //separamos los datos ingresados por el usuario y los asignamos a las variables correspondientes
    const [clienteIndex, productosData] = datosVenta.split(',').map((item) => item.trim()); //map es un metodo de los arreglos que nos permite recorrerlos y realizar una operacion con cada elemento, en este caso se recorre el arreglo de datos de la venta y se retorna un nuevo arreglo con los datos de la venta separados y sin espacios en blanco
    const cliente = clientes[parseInt(clienteIndex)]; //buscamos el cliente en el arreglo de clientes y lo asignamos a la variable cliente
    const productosCodes = productosData.split(':').map((item) => item.trim());// separamos los codigos de los productos y los asignamos a un arreglo de codigos de productos (productosCodes)

    const productosVenta = productosCodes.map((code) => { // esta linea lo que hace es recorrer el arreglo de codigos de productos y por cada codigo retorna un nuevo objeto producto con los datos del producto encontrado
      const producto = productos[parseInt(code) - 1]; //buscamos el producto en el arreglo de productos y lo asignamos a la variable producto
      return new productoModel(producto.codigo, producto.nombre, producto.precio); //retornamos un nuevo objeto producto con los datos del producto encontrado
    });

    const venta = new ventaModel(cliente, productosVenta); //creamos el objeto venta con los datos del cliente y los productos de la venta
    ventas.push(venta); //agregamos la venta al arreglo de ventas

    console.log(`Venta registrada para ${cliente.nombre}`);
    mostrarMenu();
  });
}

//creamos la funcion para calcular las estadisticas
function calcularEstadisticas() {
  const ventasMayores550 = ventas.filter((venta) => venta.calcularTotal() > 550000); //filter es un metodo de los arreglos que nos permite filtrar los elementos de un arreglo, el callback se ejecuta por cada elemento del arreglo y si retorna true el elemento se agrega al arreglo resultante
  const ventasEntre200y550 = ventas.filter((venta) => venta.calcularTotal() > 200000 && venta.calcularTotal() <= 550000);

  console.log(`Total de ventas: $${ventas.reduce((total, venta) => total + venta.calcularTotal(), 0).toFixed(2)}`); //reduce es un metodo de los arreglos que nos permite recorrerlos y realizar una operacion con cada elemento, el 0 es el valor inicial del total, toFixed es un metodo de los numeros que nos permite redondear el numero a la cantidad de decimales que le indiquemos
  console.log(`Ventas mayores a $550,000: ${ventasMayores550.length}`); //length es una propiedad de los arreglos que nos permite obtener la cantidad de elementos del arreglo
  console.log(`Ventas entre $200,000 y $550,000: ${ventasEntre200y550.length}`);
  console.log(`Promedio de ventas mayores a $550,000: $${ventasMayores550.length > 0 ? (ventasMayores550.reduce((total, venta) => total + venta.calcularTotal(), 0) / ventasMayores550.length).toFixed(2) : 0.00}`);
  console.log(`Promedio de ventas entre $200,000 y $550,000: $${ventasEntre200y550.length > 0 ? (ventasEntre200y550.reduce((total, venta) => total + venta.calcularTotal(), 0) / ventasEntre200y550.length).toFixed(2) : 0.00}`);

  console.log("\nVentas mayores a $550,000:");
  //se hace un forEach sobre el arreglo de ventas mayores a 550000 para mostrar los datos de cada venta
  ventasMayores550.forEach((venta, index) => {
    console.log(`Venta ${index + 1}:`); //index es la posicion del elemento en el arreglo (empieza en 0) y se le suma 1 para mostrar el numero de la venta
    console.log(`Cliente:`);
    console.log(`- NIT: ${venta.cliente.nit}`);
    console.log(`- Nombre: ${venta.cliente.nombre}`);
    console.log(`- Teléfono: ${venta.cliente.telefono}`);
    console.log(`- Dirección: ${venta.cliente.direccion}`);
    console.log(`- Email: ${venta.cliente.email}`);
    console.log(`Productos:`);
    venta.productos.forEach((producto) => {
      console.log(`- Producto ${producto.codigo}: ${producto.nombre} - Precio: $${producto.precio.toFixed(2)}`);
    });
  });

  mostrarMenu();
}

//creamos la funcion para mostrar el menu
function mostrarMenu() {
  console.log("\nMenú:");
  console.log("1. Registrar producto");
  console.log("2. Registrar cliente");
  console.log("3. Registrar venta");
  console.log("4. Calcular estadísticas");
  console.log("5. Salir");

  //preguntamos la opcion al usuario
  rl.question("Seleccione una opción: ", (opcion) => { //el callback se ejecuta cuando el usuario ingresa la opcion
    switch (opcion) {
      case '1':
        registrarProducto();
        break;
      case '2':
        registrarCliente();
        break;
      case '3':
        registrarVenta();
        break;
      case '4':
        calcularEstadisticas();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log("Opción no válida. Por favor, seleccione una opción válida.");
        mostrarMenu();
        break;
    }
  });
}

//iniciamos el programa
mostrarMenu();