var CalculVraisFaux = new Mathoux("Calculs vrais ou faux", "CalculVraisFaux", ModelCalcul());

CalculVraisFaux.UI.gameDisplay = function() {
    CalculVraisFaux.etat = "game";
    var gameHTML = "";

    gameHTML += '<div id="div_score">';
    gameHTML += CalculVraisFaux.UI.printStarsCompteur(CalculVraisFaux.nbReponsesJustes - CalculVraisFaux.nbReponsesFausses);
    gameHTML += '     <hr>';
    gameHTML += '     <strong>'+ CalculVraisFaux.correction +'</strong>';
    gameHTML += '</div>';
    gameHTML += '<br>';
    gameHTML += '<div id="div_exercice">';
    gameHTML += '    <p><span id="spanCalcul">'+ CalculVraisFaux.question +'</span></p>';
    gameHTML += '    <button id=\'boutonResultat1\' onclick="'+ CalculVraisFaux.ID +'.corriger(1);">Vrai</button>';
    gameHTML += '    <button id=\'boutonResultat2\' onclick="'+ CalculVraisFaux.ID +'.corriger(2);">Faux</button>';
    gameHTML += '</div>';

    document.getElementById("MathouxMain").innerHTML = gameHTML;
    animation.game();
}; // fin de this.gameDisplay

/**
    Génération de :
     - this.reponseJuste = "Réponse true";
     - this.reponseFausse = "Réponse false";
     - this.question = "Question";
**/
CalculVraisFaux.genererExercice = function() {

    if (this.etat == "menu") {
        this.correction = "Cliquez sur le résultat juste.";
    } else {
        this.correction = this.reponseJuste;
    }
    
    var nb_var_alea = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].nb_var_alea;
    var nb_var      = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].nb_var;
    var borne_min   = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].borne_min;
    var borne_max   = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].borne_max;
    var add         = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].add;
    var sub         = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].sub;
    var mult        = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].mult;

    // nombre de variables
    if (nb_var_alea) { nb_var = rand(2, nb_var); }
    var calcul = "";

    // génération du calcul
    calcul += String(rand(borne_min, borne_max));

    for (var i = 1; i < nb_var; i++) {
        calcul += " " + RandOp(add, sub, mult) + " ";
        calcul += String(rand(borne_min, borne_max));
    }

    this.reponseJuste = calcul + " = " + eval(calcul);
    this.reponseFausse = calcul + " = " + ResultatFau(eval(calcul));

    var alea = rand(0, 1);
    if (alea == 1) { 
        this.question = this.reponseJuste;
    } else {
        this.question = this.reponseFausse;
    }
    
    this.UI.gameDisplay();
}; //fin de this.gameInitialize


    /**
    ** Met à jours :
    **  - this.nbReponsesJustes
    **  - this.nbReponsesFausses
    **
    **  puis lance :
    **      - this.genererExercice();
    **      - this.UI.gameDisplay();
    **/
    CalculVraisFaux.corriger = function(id_button) {
        //this.correction = this.question + " = " + this.reponseJuste;
        // si la réponse est bonne
        if (((this.question == this.reponseJuste)&&(id_button == 1))
            ||((this.question != this.reponseJuste)&&(id_button == 2))) { 
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


function ResultatFau(resultat) {
    var rfau = 0;

    switch (rand(0, 1)) {
        case 0: rfau = eval(resultat + " + " + rand(1, 6)); break;
        case 1: rfau = eval(resultat + " - " + rand(1, 6)); if (rfau <0) {rfau = 0;} break;
    }
    return rfau;
};


function RandOp(add, sub, mult) {
    var opp = "";
    if (add && !sub && !mult)       {op = "+";}
    else if (!add && sub && !mult)  {op = "-";}
    else if (!add && !sub && mult)  {op = "*";}
    else
    {
        var tab_opp = "";
        if (add)    { tab_opp += "+";}
        if (sub)    { tab_opp += "-";}
        if (mult)   { tab_opp += "*";}
        alea = (rand(0, 30) % tab_opp.length);
        //alert(add + " <-> "+ sub+ " <-> "+ mult + " <-> " + tab_opp + " - " + tab_opp.charAt(alea));
        op = tab_opp.charAt(alea);
    }
    return op;
};



