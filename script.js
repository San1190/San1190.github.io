let rotacion = 0;
let contador = 0;

const imagen = document.querySelector('.descripcion-img img');
const contadorElemento = document.getElementById('contador');

imagen.addEventListener('click', () => {
    rotacion += 360;
    contador++;


    const colorAleatorio = '#' + Math.floor(Math.random() * 16777215).toString(16);

    contadorElemento.textContent = `Miau Flips: `;
    contadorElemento.innerHTML += `<span style="color: ${colorAleatorio};">${contador}</span>`;

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
        setTimeout(mostrarTexto, 50); 
    }
}


window.onload = mostrarTexto;



const botImages = document.querySelectorAll('.bot-image');


function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


function handleScroll() {
    botImages.forEach(image => {
        if (isElementInViewport(image)) {
            image.classList.add('animate'); 
        }
    });
}


window.addEventListener('scroll', handleScroll);


handleScroll();




const elementosMoviblesHabilidades = document.querySelectorAll('.habilidades li');

elementosMoviblesHabilidades.forEach(elemento => {
    elemento.addEventListener('mouseover', () => {
        elemento.style.transform = 'translate(5px, 5px)';
    });

    elemento.addEventListener('mouseout', () => {
        elemento.style.transform = 'translate(0, 0)';
    });
});



const elementosMoviblesGitHub = document.querySelectorAll('.github-activity .repo');

elementosMoviblesGitHub.forEach(elemento => {
    elemento.addEventListener('mouseover', () => {
        elemento.style.transform = 'translate(5px, 5px)';
    });

    elemento.addEventListener('mouseout', () => {
        elemento.style.transform = 'translate(0, 0)';
    });
});


