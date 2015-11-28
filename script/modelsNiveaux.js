function niveau(nb_var_alea, nb_var, borne_min, borne_max, add, sub, mult) {
    this.nb_var_alea = nb_var_alea;
    this.nb_var = nb_var;
    this.borne_min = borne_min;
    this.borne_max = borne_max;
    this.add = add;
    this.sub = sub;
    this.mult = mult;
}

function ModelCalcul() {
    return [
        new rang("Initiation", [
            new niveau(true,    3, 0, 5,    true,   false,  false), // additions
            new niveau(true,    3, 0, 5,    false,  true,   false), // soustractions
            new niveau(true,    3, 0, 5,    true,   true,   false), // additions et soustractions
            new niveau(true,    3, 0, 5,    false,  false,  true),  // multiplications
            new niveau(true,    3, 0, 5,    true,   true,   true)   // tout ensemble
        ]),

        new rang("Additions", [
            new niveau(false,   2, 0, 10,   true,   false,  false),
            new niveau(false,   3, 0, 20,   true,   false,  false),
            new niveau(true,    4, 0, 30,   true,   false,  false),
            new niveau(true,    5, 0, 40,   true,   false,  false),
            new niveau(true,    6, 0, 50,   true,   false,  false)
        ]),

        new rang("Soustractions", [
            new niveau(false,   2, 0, 10,   false,  true,   false),
            new niveau(false,   3, 0, 20,   false,  true,   false),
            new niveau(true,    4, 0, 30,   false,  true,   false),
            new niveau(true,    5, 0, 40,   false,  true,   false),
            new niveau(true,    6, 0, 50,   false,  true,   false)
        ]),

        new rang("Additions et Soustractions", [
            new niveau(false,   2, 0, 10,   true,   true,   false),
            new niveau(false,   3, 0, 20,   true,   true,   false),
            new niveau(true,    4, 0, 30,   true,   true,   false),
            new niveau(true,    5, 0, 40,   true,   true,   false),
            new niveau(true,    6, 0, 50,   true,   true,   false)
        ]),

        new rang("Multiplications", [
            new niveau(false,   2, 0, 10,    false,  false,  true),
            new niveau(false,   2, 1, 20,   false,  false,  true),
            new niveau(false,   3, 1, 10,   false,  false,  true),
            new niveau(false,   3, 1, 20,    false,  false,  true),
            new niveau(true,    4, 1, 10,   false,  false,  true),
            new niveau(true,    4, 1, 20,   false,  false,  true)
        ]),

        new rang("Tout ensemble", [
            new niveau(false,   2, 0, 50,   true,   true,   true),
            new niveau(false,   3, 0, 50,   true,   true,   true),
            new niveau(true,    4, 0, 50,   true,   true,   true),
            new niveau(true,    5, 0, 25,   true,   true,   true),
            new niveau(true,    5, 0, 50,   true,   true,   true),
            new niveau(true,    6, 0, 25,   true,   true,   true),
            new niveau(true,    6, 0, 50,   true,   true,   true)
        ])
    ];
}
