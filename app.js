let usuarios=[];

const form = document.getElementById('formUsuario');
const tabla = document.getElementById('tablaUsuarios');
const inputArchivo = document.getElementById('importarJSON');
const btnDescargar = document.getElementById('descargar');

function generarId() {
    return usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1;
}
//generar usuario
//form.addEventListener('submit', (e) => {
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    usuarios.push({
        id: generarId(),
        nombre: nombre,
        correo: correo
    })
    
    
    
    form.reset();
    console.log(usuarios);
    mostrarUsuarios();
});

function mostrarUsuarios() {
    tabla.innerHTML = '';
    usuarios.forEach((user, index) => {
        const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.id}</td>
            <td contenteditable onblur="editarCampo(${index},  'nombre', this.textContent)">${user.nombre}</td>
            <td contenteditable onblur="editarCampo(${index},  'correo', this.textContent)">${user.correo}</td>
            <td><button onclick="eliminarUsuario(${index})">Eliminar</button></td>
          `
        tabla.appendChild(row);
    });
}

function editarCampo(index, campo, valor) {
    usuarios[index][campo] = valor.trim();
}

function eliminarUsuario(index) {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
        usuarios.splice(index, 1);
        mostrarUsuarios();
    }
}

inputArchivo.addEventListener('change', (e) => {
    const archivo = e.target.files[0];
    const lector = new FileReader();
    lector.onload = function (e) {
        try {
            
            const datos = JSON.parse(e.target.result);
            if(Array.isArray(datos)) {
                usuarios = datos;
                mostrarUsuarios();
            } else {
                alert('El archivo JSON no tiene el formato correcto.');
            }
        } catch (error) {
            console.error('Error al parsear el archivo JSON:', error);
        }
    };
    lector.readAsText(archivo);
});