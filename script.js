
let rotacion = 0; 
const imagen = document.querySelector('.descripcion-img img');

imagen.addEventListener('click', () => {
    rotacion += 360;  
    imagen.style.transition = 'transform 0.5s';
    imagen.style.transform = `rotate(${rotacion}deg)`;  
});

const texto = "Estudiante de Ingeniería Informática apasionado por la programación y desarrollo de software.";
let index = 0;
const parrafo1 = document.getElementById('parrafo1');

function mostrarTexto() {
    if (index < texto.length) {
        parrafo1.innerHTML += texto.charAt(index);
        index++;
        setTimeout(mostrarTexto, 50); // ajusta la velocidad de aparición
    }
}

// Llama a la función cuando la ventana haya terminado de cargar
window.onload = mostrarTexto;





// Mueve elementos de la sección de habilidades al pasar el ratón
const elementosMoviblesHabilidades = document.querySelectorAll('.habilidades li');

elementosMoviblesHabilidades.forEach(elemento => {
    elemento.addEventListener('mouseover', () => {
        elemento.style.transform = 'translate(5px, 5px)';
    });

    elemento.addEventListener('mouseout', () => {
        elemento.style.transform = 'translate(0, 0)';
    });
});


// Mueve elementos de la sección de GitHub al pasar el ratón
const elementosMoviblesGitHub = document.querySelectorAll('.github-activity .repo');

elementosMoviblesGitHub.forEach(elemento => {
    elemento.addEventListener('mouseover', () => {
        elemento.style.transform = 'translate(5px, 5px)';
    });

    elemento.addEventListener('mouseout', () => {
        elemento.style.transform = 'translate(0, 0)';
    });
});


