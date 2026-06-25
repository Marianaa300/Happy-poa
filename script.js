console.log("Happy carregado ✔");

/* ==========================
   ACESSIBILIDADE
========================== */

function aumentarFonte() {

    let tamanhoAtual =
        parseFloat(
            window.getComputedStyle(document.body).fontSize
        );

    document.body.style.fontSize =
        (tamanhoAtual + 2) + "px";
}

function diminuirFonte() {

    let tamanhoAtual =
        parseFloat(
            window.getComputedStyle(document.body).fontSize
        );

    document.body.style.fontSize =
        Math.max(12, tamanhoAtual - 2) + "px";
}

function toggleModoCalmo() {
    document.body.classList.toggle("modo-calmo");
}

/* ==========================
   MENU MOBILE
========================== */

function toggleMenu() {

    const menu =
        document.getElementById("menu");

    menu.classList.toggle("ativo");
}

/* ==========================
   FECHAR MENU AO CLICAR
========================== */

document.querySelectorAll("#menu a")
.forEach(link => {

    link.addEventListener("click", () => {

        const menu =
            document.getElementById("menu");

        menu.classList.remove("ativo");
    });

});

/* ==========================
   ANIMAÇÃO AO SCROLL
========================== */

const observer =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:0.15
});

document
.querySelectorAll(".fade-up")
.forEach(element=>{

    observer.observe(element);

});

/* ==========================
   CONTADORES
========================== */

let contadorExecutado = false;

function animarContador(id, valorFinal) {
    let valorAtual = 0;
    
    // Incremento decimal para animação suave
    const incremento = valorFinal / 100; 
    const elemento = document.getElementById(id);

    const timer = setInterval(() => {
        valorAtual += incremento;

        if (valorAtual >= valorFinal) {
            valorAtual = valorFinal;
            clearInterval(timer);
        }

        // Arredondamos apenas na hora de exibir na tela
        elemento.innerText = Math.floor(valorAtual).toLocaleString("pt-BR");

    }, 20); 
}

// 👇 ESTA PARTE ESTAVA FALTANDO 👇
const numerosSection = document.querySelector("#numeros");

const observerContador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Se a seção apareceu na tela e o contador ainda não rodou
        if (entry.isIntersecting && !contadorExecutado) {
            contadorExecutado = true;
            
            // Chama a função para cada número
            animarContador("alunos", 80000);
            animarContador("cursos-num", 5);
            animarContador("anos", 11);
        }
    });
}, {
    threshold: 0.4 // Dispara quando 40% da seção estiver visível
});

if (numerosSection) {
    observerContador.observe(numerosSection);
}
/* ==========================
   HOVER 3D NOS CARDS
========================== */

document
.querySelectorAll(".card")
.forEach(card=>{

    card.addEventListener(
        "mousemove",
        (e)=>{

            const rect =
            card.getBoundingClientRect();

            const x =
            e.clientX - rect.left;

            const y =
            e.clientY - rect.top;

            const rotateY =
            ((x / rect.width) - 0.5) * 12;

            const rotateX =
            ((y / rect.height) - 0.5) * -12;

            card.style.transform =
            `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-10px)
            `;
        }
    );

    card.addEventListener(
        "mouseleave",
        ()=>{

            card.style.transform =
            "translateY(0)";
        }
    );

});

/* ==========================
   GALERIA LIGHTBOX
========================== */

const imagens =
document.querySelectorAll(
    ".grid-galeria img"
);

imagens.forEach(img=>{

    img.addEventListener(
        "click",
        ()=>{

            const lightbox =
            document.createElement("div");

            lightbox.classList.add(
                "lightbox"
            );

            lightbox.innerHTML = `
                <span class="fechar">&times;</span>
                <img src="${img.src}">
            `;

            document.body.appendChild(
                lightbox
            );

            lightbox.addEventListener(
                "click",
                ()=>{
                    lightbox.remove();
                }
            );
        }
    );

});

/* ==========================
   SCROLL SUAVE EXTRA
========================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor=>{

    anchor.addEventListener(
        "click",
        function(e){

            e.preventDefault();

            const destino =
            document.querySelector(
                this.getAttribute("href")
            );

            if(destino){

                destino.scrollIntoView({

                    behavior:"smooth",
                    block:"start"

                });

            }

        }
    );

});

/* ==========================
   BOTÃO VOLTAR AO TOPO
========================== */

const botaoTopo =
document.createElement("div");

botaoTopo.classList.add(
    "voltar-topo"
);

botaoTopo.innerHTML =
'<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(
    botaoTopo
);

window.addEventListener(
    "scroll",
    ()=>{

        if(window.scrollY > 500){

            botaoTopo.classList.add(
                "mostrar"
            );

        }else{

            botaoTopo.classList.remove(
                "mostrar"
            );
        }

    }
);

botaoTopo.addEventListener(
    "click",
    ()=>{

        window.scrollTo({

            top:0,
            behavior:"smooth"

        });

    }
);

function scrollGaleria(direction){

    const wrapper =
    document.getElementById("galeriaWrapper");

    wrapper.scrollLeft += direction * 300;

}

function toggleCurso(card){

    // fecha outros abertos (opcional mas melhora UX)
    document.querySelectorAll(".card")
    .forEach(c => c.classList.remove("ativo"));

    // abre o clicado
    card.classList.add("ativo");
}
