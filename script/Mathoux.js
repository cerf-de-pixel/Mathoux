// CODE GOOGLE ANALYTICS
//(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
//(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
//m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
//})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
//ga('create', 'UA-57903562-1', 'auto');
//ga('send', 'pageview');

/**
** Constructeur d'un objet Mathoux
** @param Name : 	Nom de l'app (ex: "Calcul mental")
** @param ID : 		Nom de l'objet instencier  (ex: "calculMental")
** @param Rangs : 	tableaux de rang
**/
function Mathoux(Name, ID, Rangs) {
	// variables définie à la construction d'un obj mathoux
	this.rangs = Rangs;
	this.ID = ID;
	this.name = Name;
	this.nbNiveaux = 0;
	this.GlobalSave = new GlobalSave(this);
	this.UI = new UI(this);

	// this.etat peut prendre 4 états :
	//	- "none"  : aucun états n'est défini
	//	- "menu"  : Menu afficher
	//	- "game"  : Jeu en cours
	// 	- "score" : Score afficher
	this.etat = "none";

	// Variables régénérées à chaques niveaux de jeux
	this.numNiveauActuel =0;
	this.rangActuel = 0;
	this.indiceNiveauActuel = 0;
	this.scorePourFinir = function() { return 15; };
	 
	// Variables régénérées à chaques questions
	this.nbReponsesFausses = 0;
	this.nbReponsesJustes = 0;
	this.reponseJuste = "";
	this.reponseFausse = "";
	this.question = "";
	this.correction = "Cliquez sur le résultat juste.";

	/**
	** met à jour de nbNiveaux, nbRangs et GlobalSave
	**/
	this.mathouxInitialize = function() {
		// Renseignement de nbNiveaux
		this.nbNiveaux = 0;
		for (var i = 0; i < this.rangs.length; i++) // parcours des rangs
		{
		    for (var j = 0; j < this.rangs[i].niveaux.length; j++) // parcours des niveaux
		    {
		        this.nbNiveaux++;
		    }
		}
		// Renseignement de this.GlobalSave.toString
		//this.GlobalSave.load();
	}; // fin de this.mathouxInitialize

	/**
	* Met à jours :
	*	- this.Correction
	* 	- this.reponseJuste 
	* 	- this.reponseFausse 
	* 	- this.question 
	**/
	this.genererExercice = function() {
		if (this.etat == "menu") { this.correction = "Cliquez sur le résultat juste.";  } 
		else { this.correction = "Correction"; }
		this.reponseJuste = "Réponse juste";
		this.reponseFausse = "Réponse fausse";
		this.question = "Question";
	};

	/**
	** colore la div de correction en rouge ou vert
	** met à jour :
	** 		- this.nbReponsesFausses
	**		- this.nbReponsesJustes
	**		- this.rangActuel
	**	    - this.indiceNiveauActuel
	** puis lance :
	**	  	- this.genererExercice();
	**		- this.UI.gameDisplay();
	**/
	this.gameInitialize = function() {
		this.nbReponsesFausses = 0;
		this.nbReponsesJustes = 0;
		var compteur_niveaux = 1;
	    for (var i = 0; i < this.rangs.length; i++) // parcours des rangs
	    {
	    	for (var j = 0; j < this.rangs[i].niveaux.length; j++) // parcours des niveaux
	    	{
	    	    if (compteur_niveaux == this.numNiveauActuel)
	    	    {
	    	      this.rangActuel = i;
	    	      this.indiceNiveauActuel= j;
	    	    }
	    	    compteur_niveaux ++;
	    	}
	    }
	    this.genererExercice();
	}; //fin de this.gameInitialize


	/**
	**@return : true si le niveau est fini, false sinon. 
	**/
	this.niveauEstFini = function() {
		return ((this.nbReponsesJustes - this.nbReponsesFausses) >= this.scorePourFinir());
	};

	/**
	** Met à jours :
	**	- this.nbReponsesJustes
	**	- this.nbReponsesFausses
	**
	**	puis lance :
	**		- this.genererExercice();
	**    	- this.UI.gameDisplay();
	**/
	this.corriger = function(id_button) {
		//this.Correction = this.question + " = " + this.reponseJuste;
		// si la réponse est bonne
        if (document.getElementById('boutonResultat' + id_button).innerHTML == this.reponseJuste) { 
        	this.nbReponsesJustes ++;
	    	if (this.niveauEstFini())  { this.UI.scoreDisplay(); }
	    	else {
	    		this.genererExercice();
	    		document.getElementById('div_score').style.backgroundColor = "#8EC547";
	    		document.getElementById('div_score').style.borderColor = "#54B542";
	    	}
        } 
        // si la reponse est fausse
        else { 
        	this.nbReponsesFausses ++;
        	this.genererExercice();
        	document.getElementById('div_score').style.backgroundColor = "#E96E64";
		    document.getElementById('div_score').style.borderColor = "#CF6259";
        }
	};

	this.facebookShare = function() {
		//alert("Le partage facebook n'est pas encore en ligne.");
		app_id = "281921212010602";
   		message = "Score atteint à Mathoux - " + this.name + " : " + this.UI.printGameScore(false);
   		link = "http://twiy-logic.fr/works/mathoux/";
   		redirect_uri = "https://mathoux.twiy-logic.fr/" + this.ID + "/";
   		shareLink = "https://www.facebook.com/dialog/feed?app_id=" + app_id + "&display=popup&caption=" + message + "&link=" + link + "&redirect_uri=" + redirect_uri;
   		window.location.assign(shareLink);
	};
	this.mathouxInitialize();
}


/**
** Constructeur d'un rang
** @param nom : Nom du rang (ex: "Addition")
** @param niveau : objet niveau personaliser
**/
function rang(nom, niveaux) {
    this.nom = nom;
    this.niveaux = niveaux; // ce tableau n'est pas utiliser par Mathoux.js
    // il est concu pour etre utiliser par la fonction de génération des exercices
}

/**
** Constructeur des methodes qui gerent les sauvegarde
** @param objMathoux : objet parent
**/
function GlobalSave(objMathoux) {
	this.toString = "";

	this.load = function() {
		this.toString = getCookie(objMathoux.ID + "-mathoux");
		if ((!this.toString) || (this.toString.length != (objMathoux.nbNiveaux))) { 
		    this.toString = "";
		    for (var i = 0; i < objMathoux.nbNiveaux; i++) {
		        this.toString += "6";
		    }
		    this.save();
		}
	};

	this.save = function() { setCookie(objMathoux.ID + "-mathoux", this.toString); };

	this.getScore = function(numNiveau){ return this.toString.charAt(numNiveau - 1); };

	this.setScore = function(numNiveau, Score) {
		// si le nouveau score est mieu 
		if (this.getScore(numNiveau) > Score) {
			var saveStr = this.toString.substring(0, numNiveau - 1);
			saveStr += Score + this.toString.substring(numNiveau);
			this.toString = saveStr;
			this.save();
		}
	};
} // fin de GlobalSave


function UI(objMathoux) {
	/**
	* fonction à placer dans le html pour définir l'emplacement de mathoux
	**/
	this.initialize = function(){
		document.write("<div id='MathouxMain'></div>");
	};

	this.menuDisplay = function() {	
		objMathoux.etat = "menu";	
		objMathoux.GlobalSave.load();
		var menuHTML = "";

		// Mise en place du titre et du score principal
		menuHTML += '<div class="class_menu"><h1>'+ objMathoux.name +'</h1>';
        menuHTML += "<hr><h2>" + objMathoux.UI.printGameScore() + "</h2></div>"

        // Mise en place du bouton FACEBOOK
        menuHTML += "<p><button id='bt_partageFB' onclick='"+ objMathoux.ID +".facebookShare()'><img src='./img/facebook.png'>";
        menuHTML += "<span> Partager mon score</span></button></p>";

        // Mise en place des rangs avec leurs titres et leurs niveaux (avec notes individuels)
		var compteur_niveaux = 1;
        for (var i = 0; i < objMathoux.rangs.length; i++) // parcours des rangs
        {
            menuHTML += "<div class='class_menu'>";
            menuHTML += "<h2>" + objMathoux.rangs[i].nom + "</h2><hr>";
            for (var j = 0; j < objMathoux.rangs[i].niveaux.length; j++) // parcours des niveaux
            {
                menuHTML += '<button onclick="' + objMathoux.ID + '.numNiveauActuel = '+ compteur_niveaux + '; ';
                menuHTML += objMathoux.ID + '.gameInitialize();" ' ;
                menuHTML += objMathoux.ID + '.genererExercice();"' ;
                menuHTML +=  '"> Niveau ' + compteur_niveaux;
                menuHTML += objMathoux.UI.printStarsScore(objMathoux.GlobalSave.getScore(compteur_niveaux)) + "</button>";
                compteur_niveaux++; 
            }
            menuHTML += "</div>";
        }
        document.getElementById("MathouxMain").innerHTML = menuHTML;
        animation.menu();
	}; // fin de this.menuDisplay

	this.gameDisplay = function() {
		objMathoux.etat = "game";	
		var gameHTML = "";
		var txtButton1 = "";
		var txtButton2 = "";

		// selection aléaoire du boutton qui prendra la valeur juste
	    var alea = rand(0, 1);
	    if (alea == 1) {
	        txtButton1 = objMathoux.reponseJuste;
	        txtButton2 = objMathoux.reponseFausse;
	    } else {
	        txtButton2 = objMathoux.reponseJuste;
	        txtButton1 = objMathoux.reponseFausse;
	    }

		gameHTML += '<div id="div_score">';
		gameHTML += objMathoux.UI.printStarsCompteur(objMathoux.nbReponsesJustes - objMathoux.nbReponsesFausses);
	    gameHTML += '     <hr>';
	    gameHTML += '     <strong>'+ objMathoux.correction +'</strong>';
	    gameHTML += '</div>';
	    gameHTML += '<div id="div_exercice">';
	    gameHTML += '    <p><span id="spanCalcul">'+ objMathoux.question +'</span></p>';
	    gameHTML += '    <button id=\'boutonResultat1\' onclick="'+ objMathoux.ID +'.corriger(1);">'+ txtButton1 +'</button>';
	    gameHTML += '    <button id=\'boutonResultat2\' onclick="'+ objMathoux.ID +'.corriger(2);">'+ txtButton2 +'</button>';
	    gameHTML += '</div>';

		document.getElementById("MathouxMain").innerHTML = gameHTML;
		animation.game();
	}; // fin de this.gameDisplay

	this.scoreDisplay = function() {
		objMathoux.etat = "score";	
    	var note = 0;
    	if (objMathoux.nbReponsesFausses > 4)  { note = 4; } 
    	else { note = objMathoux.nbReponsesFausses; }
		
    	objMathoux.GlobalSave.setScore(objMathoux.numNiveauActuel, note);
    	
    	// afficher ecrans de fin
    	var scoreHTML = "";
		scoreHTML += '<div class="class_menu">';
		scoreHTML += '<h1>Félicitation !</h1><hr>';
		scoreHTML +=  objMathoux.UI.printStarsScore(note, "big_");
		scoreHTML += '<br><br><center><h2>'+ objMathoux.nbReponsesJustes +' / '+ (objMathoux.nbReponsesFausses + objMathoux.nbReponsesJustes) +'</h2>';
		scoreHTML += '<hr><span>Vous avez finis le niveau ';
		scoreHTML +=  objMathoux.numNiveauActuel + ' de Mathoux : '+ objMathoux.name + '.</span></center>';
		scoreHTML += '<hr><button onclick="'+ objMathoux.ID +'.UI.menuDisplay();">Retour</button></div>';
		//scoreHTML += "<p><button id='bt_partageFB' onclick='"+ objMathoux.ID +".facebookShare()'><img src='./img/facebook.png'>";
        //scoreHTML += "<span> Partager mon score</span></button></p>";

    	document.getElementById("MathouxMain").innerHTML = scoreHTML;
    	animation.score();
	}; // fin de this.scoreDisplay

	this.printStarsCompteur = function(nb_stars) {
	    var html_star = "";
	    for (var i = 0; i < nb_stars; i++) {
	        html_star += "<img src='./img/star2.png'>";
	    }
	    for (var j = nb_stars; j < objMathoux.scorePourFinir(); j++) {
	        html_star += "<img src='./img/star0.png'>";
	    }
	    return html_star;
	};

	this.printStarsScore = function(score, prefixe) {
		score = score.toString();
		prefixe = prefixe || "";
		var prefixe_centre = "";
		// 3 cas possible :
		// - prefixe = "" -> petites étoiles noires
		// - prefixe = "big_" -> étoiles : petite, grande, petite

		if (prefixe == "big_") {
			prefixe_centre = prefixe;
			prefixe = "half_";
		}
		else if (prefixe == "") {
			prefixe_centre = prefixe;
		}

		var html_star = "";
	    switch (score) {
	        case "0":
	            html_star = "<img src='./img/"+ prefixe +"star2.png'> <img src='./img/"+ prefixe_centre +"star2.png'> <img src='./img/"+ prefixe +"star2.png'>";
	            break;
	        case "1":
	            html_star = "<img src='./img/"+ prefixe +"star2.png'> <img src='./img/"+ prefixe_centre +"star2.png'> <img src='./img/"+ prefixe +"star1.png'>";
	            break;
	        case "2":
	            html_star = "<img src='./img/"+ prefixe +"star2.png'> <img src='./img/"+ prefixe_centre +"star2.png'> <img src='./img/"+ prefixe +"star0.png'>";
	            break;
	        case "3":
	            html_star = "<img src='./img/"+ prefixe +"star2.png'> <img src='./img/"+ prefixe_centre +"star1.png'> <img src='./img/"+ prefixe +"star0.png'>";
	            break;
	        case "4":
	            html_star = "<img src='./img/"+ prefixe +"star2.png'> <img src='./img/"+ prefixe_centre +"star0.png'> <img src='./img/"+ prefixe +"star0.png'>";
	            break;
	        case "5":
	            html_star = "<img src='./img/"+ prefixe +"star1.png'> <img src='./img/"+ prefixe_centre +"star0.png'> <img src='./img/"+ prefixe +"star0.png'>";
	            break;
	        case "6":
	            html_star = "<img src='./img/"+ prefixe +"star0.png'> <img src='./img/"+ prefixe_centre +"star0.png'> <img src='./img/"+ prefixe +"star0.png'>";
	            break;
	    }
	return html_star;
	};

	this.printGameScore = function(avecEtoile) {

		var nbEtoilesTotal = objMathoux.nbNiveaux * 3;
		var nbEtoilesGagne = 0.0;

		for (var i = 1; i < objMathoux.GlobalSave.toString.length; i++) {
			var score = parseInt(objMathoux.GlobalSave.getScore(i));
			//alert(objMathoux.GlobalSave.getScore(i));
			nbEtoilesGagne += (3.0 - (score*0.5));
	    }
	    avecEtoile = avecEtoile || true;
	    if (avecEtoile) {
	    	return nbEtoilesGagne + " <img src='./img/star2.png' class='img_star'> sur " + nbEtoilesTotal ;
	    } else {
	    	return nbEtoilesGagne + " sur " + nbEtoilesTotal ;
	    }
	    
	}; // fin de this.printGameScore

}// fin de UI


/*************************************
  Fonctions de géstion des cookies
 *************************************/
function setCookie(sName, sValue) 
{
    var today = new Date(), expires = new Date();
    expires.setTime(today.getTime() + (365*24*60*60*1000));
    document.cookie = sName + "=" + encodeURIComponent(sValue) + ";expires=" + expires.toGMTString();
}

function getCookie(sName) 
{
    var cookContent = document.cookie, cookEnd, i, j;
    sName = sName + "=";
    for (i=0; i<cookContent.length; i++) {
            j = i + sName.length;
            if (cookContent.substring(i, j) == sName)
            {
                cookEnd = cookContent.indexOf(";", j);
                if (cookEnd == -1) {
                    cookEnd = cookContent.length;
                }
                return decodeURIComponent(cookContent.substring(j, cookEnd));
            }
    }       
    return null;
}

/*************************************
  Fonctions de génération aléatoire
 *************************************/
function rand(min, max) { return parseInt(Math.random() * ((max+1) - min) + min); }

/*************************************
  Inclure un fichier js avec un callback
 *************************************/
var loadScripts = []; // scripts déjà chargés
function loadScript(url, callback)
{
	// // si le script n'a pas encore été chargé
	if (loadScripts.indexOf(url) == -1) {
		loadScripts.push(url); // on ajoute le scripts aux scripts chargés
		// chargement du script
	    var script = document.createElement('script');
	    script.type = 'text/javascript';
	    script.src = url;
	    script.onreadystatechange = callback;
	    script.onload = callback;
	    document.getElementsByTagName('head')[0].appendChild(script);
	} else {
		callback();
	}
}

/*************************************
  Objet ANIMATION 
 *************************************/
var animationEnable = true; // cette var peut etre modifier dans le fichier index
function animation() { return true; }

animation.menu = function() {
	if (animationEnable) {
		(function($){
			$("div, button").velocity("transition.flipXIn", { stagger: 100 });   
		})(jQuery);
	}
}

animation.game = function() {
	if (animationEnable) {
		(function($){
        	$("#div_score img").velocity("callout.pulse", { stagger: 100 });
	      	$("#div_exercice").velocity("transition.slideUpBigIn", { stagger: 300 });   
		})(jQuery);
	}

}
animation.score = function() {
	if (animationEnable) {
		(function($){
	        $(".class_menu img").velocity("callout.tada", { stagger: 100 });
		    $("div, button").velocity("transition.flipXIn", { stagger: 100 }); 
		})(jQuery);
	}
}
