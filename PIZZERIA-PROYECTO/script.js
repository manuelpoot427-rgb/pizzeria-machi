let carrito = [];
let total = 0;

function ordenar(pizza) {
    let precio = 0;
    // Corregimos las comparaciones para que coincidan con tu HTML
    if (pizza === "Pepperoni") precio = 120;
    if (pizza === "queso") precio = 120;
    if (pizza === "Chorizo") precio = 125;
    if (pizza === "champiñones") precio = 159;
    if (pizza === "pastor") precio = 185;
    if (pizza === "Hawaiana") precio = 159;

    carrito.push({ nombre: pizza, precio: precio });
    total += precio;

    mostrarCarrito();
    mostrarTotal();
}

// === FUNCIÓN ACTUALIZADA CON BOTÓN DE ELIMINAR ===
function mostrarCarrito() {
    let lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";
    
    // Usamos 'index' para identificar cada elemento de la lista
    carrito.forEach(function(item, index) {
        let li = document.createElement("li");
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.marginBottom = "8px";

        // Creamos el contenido con el icono de tacha ❌
        li.innerHTML = `
            <span>🍕 ${item.nombre} - $${item.precio}</span>
            <button onclick="eliminarDelCarrito(${index})" 
                style="background: #ff4444; color: white; border: none; padding: 2px 8px; border-radius: 5px; cursor: pointer; font-weight: bold;">
                ✕
            </button>
        `;
        lista.appendChild(li);
    });
}

// === NUEVA FUNCIÓN PARA ELIMINAR UNA PIZZA ESPECÍFICA ===
function eliminarDelCarrito(index) {
    // Restamos el precio de la pizza que vamos a quitar
    total -= carrito[index].precio;
    
    // Eliminamos la pizza del arreglo usando su posición
    carrito.splice(index, 1);
    
    // Refrescamos el carrito y el total en pantalla
    mostrarCarrito();
    mostrarTotal();
}

function mostrarTotal() {
    document.getElementById("total").textContent = total;
}

function enviarAlDueño() {
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }

    let pedidosExistentes = JSON.parse(localStorage.getItem('pedidosPizzeria')) || [];

    const nuevoPedido = {
        id: Math.floor(Math.random() * 1000),
        items: [...carrito], // Usamos una copia del carrito actual
        total: total,
        hora: new Date().toLocaleTimeString(),
        estado: "pendiente"
    };

    pedidosExistentes.push(nuevoPedido);
    localStorage.setItem('pedidosPizzeria', JSON.stringify(pedidosExistentes));

    alert("¡Pedido enviado con éxito!");
    
    // Limpiamos todo
    carrito = [];
    total = 0;
    mostrarCarrito();
    mostrarTotal();
}