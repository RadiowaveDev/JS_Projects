const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");

let url="https://pokeapi.co/api/v2/pokemon/";

for(let i=252;i<=386;i++){
    fetch(url+i)
    .then((response)=> response.json())
    .then(data => mostrarPokemon(data)) 
}

function mostrarPokemon(mon){
    let tipos = mon.types.map((type) =>`<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos=tipos.join('');

    let habilidades =mon.abilities
    .filter(ability =>!ability.is_hidden)
    .map(ability =>`<p class="habilidad">${ability.ability.name}</p>`);
    habilidades=habilidades.join('');

    let pokeId = mon.id.toString();
    if (pokeId.length === 1){
        pokeId='00'+pokeId;
    }else if (pokeId.length===2){
        pokeId='0'+pokeId;
    }
 

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML=`<p class="pokemon-id-back">#${mon.id}</p>
                    <div class="pokemon-imagen">
                        <img src="${mon.sprites.other["official-artwork"].front_default}" alt="${mon.name}">
                    </div>
                    <div class="pokemon-info">
                        <div class="nombre-contenedor">
                            <p class="pokemon-id">#${mon.id}</p>
                            <h2 class="pokemon-nombre">${mon.name}</h2>
                        </div>
                        <div class="pokemon-tipos">
                            ${tipos}
                        </div>
                        <div class="pokemon-habilidades">
                            ${habilidades}
                        </div>
                    </div>`;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => boton.addEventListener("click",(event)=>{
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML="";

    for(let i=252;i<=386;i++){
        fetch(url+i)
        .then((response) => response.json())
        .then(data =>{
            
            if(botonId=="ver-todos"){
                mostrarPokemon(data);
            }else{
                const tipos = data.types.map(type => type.type.name);
                if(tipos.some(tipo=>tipo.includes(botonId))){
                    mostrarPokemon(data);
                }
            }
            
        }) 
    }
}))

