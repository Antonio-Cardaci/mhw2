const section = document.getElementById("section");
const preferiti = document.getElementById("preferiti");
preferiti.classList.add("hidden");



function createPadri(){
	
	
	var numeroElementi = contenuti.length;
	
	var padriNecessari = Math.ceil(numeroElementi/3);
	
	
	for(let numeroPadre = 0; numeroPadre < padriNecessari;numeroPadre++){
		
		
		var padre = document.createElement("div");
		
		padre.setAttribute("id","contenitorePadre"+numeroPadre);
		
		padre.classList.add("box");
		
		
		var inizio = 0 + (numeroPadre * 3);
		var fine = inizio + 3;
		
		createChild(padre,inizio,fine,numeroElementi);
		section.appendChild(padre);
	}
}





function createChild(divPadre,inizio,fine,numeroElementi){
	
	
	for(let i = inizio; i < fine; i++){
		
		if(i < numeroElementi){
			
			
			
			const figlio = document.createElement("div");
			figlio.setAttribute("id","divFiglio"+i);
			
			const img = createImg(contenuti[i].immagine,"immagine"+i, 400,400);
			figlio.appendChild(img);
			
			
			const divTitolo = document.createElement("div");
			divTitolo.setAttribute("id","divTitolo"+i);
			const h1 = createTitolo(contenuti[i].titolo,"titolo"+i);
			const button = createButtonPreferiti(i);
			divTitolo.appendChild(h1);
			divTitolo.appendChild(button);
			figlio.appendChild(divTitolo);
			
			
			const p = createDescrizione(contenuti[i].descrizione,i);
			figlio.appendChild(p);
			
			const dettagli = createDettagli(i);
			figlio.appendChild(dettagli);
			
			divPadre.appendChild(figlio);
		}
	}
	console.log(divPadre);
	
}




var elementiPreferiti = 0;

function createButtonPreferiti(i){
	
	
	const button = document.createElement("button");
	
	button.setAttribute("id","preferiti"+i);
	
	button.innerHTML="Preferiti";
	
	
	button.addEventListener("click", event=> {
		
		
		const oggettoPreferito = {
			titolo: contenuti[i].titolo,
			immagine: contenuti[i].immagine,
		}
		
		elementiPreferiti++;
		
		
		const divPadre = document.createElement("div");
		
		divPadre.setAttribute("id","divPadre");
		
		
		const img = createImg(oggettoPreferito.immagine,"immaginePreferiti"+i,400,400);
		
		const titolo = document.createElement("h1");
		titolo.innerHTML = oggettoPreferito.titolo;
		
	
		const buttonRemovePreferiti = document.createElement("button");
		buttonRemovePreferiti.innerHTML = "Rimuovi";
		
		buttonRemovePreferiti.addEventListener("click", event=>{
			
			divPadre.removeChild(img);
			divPadre.removeChild(titolo);
			elementiPreferiti--;
			
			if(elementiPreferiti==0){
				preferiti.classList.add("hidden");
			}
			
			buttonRemovePreferiti.classList.add("hidden");
			
			button.classList.remove("hidden");
		});
		
		
		divPadre.appendChild(img);
		divPadre.appendChild(buttonRemovePreferiti);
		divPadre.appendChild(titolo);
		
		preferiti.appendChild(divPadre);
		
		preferiti.classList.remove("hidden");
		
		button.classList.add("hidden");
	});
	
	return button;
}

function createDettagli(i){
	const p = document.createElement("p");
	p.innerText="Mostra dettagli";
	
	
	p.addEventListener("click",event =>{
		
		var descrizione = document.getElementById("descrizione"+i);
		
		
		if(descrizione.classList.contains("hidden")){ 
			descrizione.classList.remove("hidden");
			p.innerHTML="Nascondi dettagli";
		}
		
		else {
			descrizione.classList.add("hidden");
			p.innerHTML="Mostra dettagli";
		}
		
	});
	return p;
	
}


function createDescrizione(testo,i){
	const p = document.createElement("p");
	p.innerHTML = testo;
	
	
	p.setAttribute("id","descrizione"+i);
	
	p.classList.add("hidden");
	
	return p;
}

function createTitolo(testo,id){
	const h1 = document.createElement("h1");
	h1.innerHTML = testo;

	h1.setAttribute("id", id);
	
	return h1;
	
}

function createImg(src,id,width,height){
	const img = document.createElement("img");
	img.setAttribute("src",src);
	img.setAttribute("height",height);
	img.setAttribute("width",width);
	img.setAttribute("id", id);
	
	return img;
}


const searchBar = document.getElementById("searchBar");


searchBar.addEventListener("keyup", event => {
  
  var filtro = searchBar.value.toUpperCase();
  
  
  for(let i=0; i<contenuti.length; i++){
	  
	  
	  var titolo = document.getElementById("titolo"+i);
	  
	  var divFiglio = document.getElementById("divFiglio"+i);
	  
	  
	  if(filtro == ""){
		divFiglio.classList.remove("hidden");
	  }
	  
	  else if(titolo.innerHTML.toUpperCase().indexOf(filtro) > -1){
		divFiglio.classList.remove("hidden");
	  }
	  
	  else{
		divFiglio.classList.add("hidden");
	  }
	  
  }
});

createPadri();