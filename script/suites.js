// forme 1 : (x + val1)*val2
// forme 2 : (x + val1)*val2
function niveau(forme, borne_min_val1, borne_max_val1, borne_min_val2, borne_max_val2, borne_min_indice, borne_max_indice) {
    this.forme = forme; // =1 || =2

    this.borne_min_val1     = borne_min_val1;
    this.borne_max_val1     = borne_max_val1;

    this.borne_min_val2     = borne_min_val2;
    this.borne_max_val2     = borne_max_val2;

    this.borne_min_indice   = borne_min_indice;
    this.borne_max_indice   = borne_max_indice;
}

function ModelCalculSuite() {
    return [
        new rang("BETA TEST", [
            new niveau(1,    1, 15,     1, 15 ,      1, 15   ),
            new niveau(2,    1, 15,     1, 15 ,      1, 15   ),
            new niveau(0,    1, 15,     1, 15 ,      1, 15   ) 
        ])

        //new rang("Initiation", [
        //    new niveau(1,    1, 10,     1, 5 ,      1, 5    ),
        //    new niveau(1,    1, 10,     1, 5 ,      1, 10   ),
        //    new niveau(1,    1, 20,     1, 5 ,      1, 20   ),
        //    new niveau(2,    1, 5,      1, 10,      1, 5    ),
        //    new niveau(2,    1, 5,      1, 10,      1, 10   ), 
        //    new niveau(2,    1, 5,      1, 20,      1, 20   )  
        //]),

        //new rang("Facile", [
        //    new niveau(1,    1, 10,     1, 5 ,      1, 5    ),
        //    new niveau(1,    1, 10,     1, 5 ,      1, 10   ),
        //    new niveau(1,    1, 20,     1, 5 ,      1, 20   ),
        //    new niveau(2,    1, 5,      1, 10,      1, 5    ),
        //    new niveau(2,    1, 5,      1, 10,      1, 10   ), 
        //    new niveau(2,    1, 5,      1, 20,      1, 20   )
        //]),

        //new rang("Intermédiaire", [
        //    new niveau(1,    1, 10,     1, 5 ,      1, 5    ),
        //    new niveau(1,    1, 10,     1, 5 ,      1, 10   ),
        //    new niveau(1,    1, 20,     1, 5 ,      1, 20   ),
        //    new niveau(2,    1, 5,      1, 10,      1, 5    ),
        //    new niveau(2,    1, 5,      1, 10,      1, 10   ), 
        //    new niveau(2,    1, 5,      1, 20,      1, 20   )
        //]),

        //new rang("Difficile", [
        //    new niveau(1,    1, 10,     1, 5 ,      1, 5    ),
        //    new niveau(1,    1, 10,     1, 5 ,      1, 10   ),
        //    new niveau(1,    1, 20,     1, 5 ,      1, 20   ),
        //    new niveau(2,    1, 5,      1, 10,      1, 5    ),
        //    new niveau(2,    1, 5,      1, 10,      1, 10   ), 
        //    new niveau(2,    1, 5,      1, 20,      1, 20   )
        //])
    ];
}

var suites = new Mathoux("Suites de nombres", "suites", ModelCalculSuite());

/**
    Génération de :
     - this.reponseJuste = "Réponse true";
     - this.reponseFausse = "Réponse false";
     - this.question = "Question";
**/
var sauvegardeCorrection = "";
suites.genererExercice = function() {

    if (this.etat == "menu") {
        this.correction = "Complètez correctement la suite.";
    } else {
        this.correction = sauvegardeCorrection;
    }

    var forme               = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].forme;
    var borne_min_val1      = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].borne_min_val1;
    var borne_max_val1      = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].borne_max_val1;
    var borne_min_val2      = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].borne_min_val2;
    var borne_max_val2      = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].borne_max_val2;
    var borne_min_indice    = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].borne_min_indice;
    var borne_max_indice    = this.rangs[this.rangActuel].niveaux[this.indiceNiveauActuel].borne_max_indice;

    var val1    = rand(borne_min_val1, borne_max_val1);
    var val2    = rand(borne_min_val2, borne_max_val2);
    var indice  = rand(borne_min_indice, borne_max_indice);

    var indice_element_manquant = rand(0, 5);
    var sensSuite = rand(0, 1);

    var tabSuite = new Array();

    if (forme == 0) { forme = rand(1, 2); }

    if (forme == 1) {
        // FORME 1 : (x + val1)*val2
        if (sensSuite == 0) { // sens croissant
            for (var i = 0; i < 6; i++) { tabSuite.push(((indice+i)+val1)*val2); }
            sauvegardeCorrection = "&fnof; ( " + indice + " > X > " + (indice+6)  + " ) &rarr; (( X + " + val1 + " ) * " + val2 + ")";
        } else { // sens decroissant
            for (var i = 5; i >=0 ; i--) { tabSuite.push(((indice+i)+val1)*val2); }
            sauvegardeCorrection = "&fnof; ( " + (indice+6) + " < X < " + indice + " ) &rarr; (( X + " + val1 + " ) * " + val2  + ")";
        }
    } else if (forme== 2) {
        // FORME 2 : (x + val1)*val2
        if (sensSuite == 0) { // sens croissant
            for (var i = 0; i < 6; i++) { tabSuite.push(((indice+i)+val1)*val2); }
            sauvegardeCorrection = "&fnof; ( " + indice + " > X > " + (indice+6)  + " ) &rarr; (( X * " + val1 + " ) + " + val2  + ")";
        } else { // sens decroissant
            for (var i = 5; i >=0 ; i--) { tabSuite.push(((indice+i)+val1)*val2); }
            sauvegardeCorrection = "&fnof; ( " + (indice+6) + " < X < " + indice + " ) &rarr; (( X * " + val1 + " ) + " + val2  + ")";
        }
    } else {
        alert("ERREUR : Forme invalide.")
        return 0;
    }

    this.question = "";
    for (var i = 0; i < tabSuite.length; i++) {
        if (i == indice_element_manquant) { 
            this.question += "... , "; 
            this.reponseJuste = tabSuite[i];
            this.reponseFausse = ResultatFau(tabSuite[i]);
        } else {
            this.question += tabSuite[i] + ", ";
        }

    }

    

    this.UI.gameDisplay();
}; 




function ResultatFau(resultat) {
    var rfau = 0;

    switch (rand(0, 1)) {
        case 0: rfau = eval(resultat + " + " + rand(1, 6)); break;
        case 1: rfau = eval(resultat + " - " + rand(1, 6)); if (rfau <0) {rfau = 0;} break;
    }
    return rfau;
};





