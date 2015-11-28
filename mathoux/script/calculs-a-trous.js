var calculATrous = new Mathoux("Calculs à trous", "calculATrous", ModelCalcul());

/**
    Génération de :
     - this.reponseJuste = "Réponse true";
     - this.reponseFausse = "Réponse false";
     - this.question = "Question";
**/
calculATrous.genererExercice = function() {
    
    if (this.etat == "menu") {
        this.correction = "Cliquez sur le résultat juste.";
    } else {
        this.correction = this.question.replace("...", this.reponseJuste);
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
    

    // génération du calcul (avec regles spec pour les divisions )
    calcul += String(rand(borne_min, borne_max));

    var indice_trou = rand(1, nb_var-1);

    for (var i = 1; i < nb_var; i++) {
        calcul += " " + RandOp(add, sub, mult) + " ";
        var alea = String(rand(borne_min, borne_max));
        if (i== indice_trou)
        {
            calcul += "...";
            nombre_inconnu = alea;
        }
        else
        {
            calcul += alea;
        }
    }
    
    this.reponseJuste = nombre_inconnu;
    this.reponseFausse = ResultatFau(nombre_inconnu);
    this.question = calcul + " = " + eval(calcul.replace("...", nombre_inconnu));

    this.UI.gameDisplay();
}; //fin de this.gameInitialize


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



