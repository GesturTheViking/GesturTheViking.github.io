let receptProgress = 0;
let nuvarandeSteg = 0;
let progressTimer;

function SpawnIngredAt(ingred, x, y) {
    ingred.x = x;
    ingred.y = y;
    ingred.setCollidesWith(1);
    ingred.setVisible(true);
}

function RemoveIngred(ingred) {
    ingred.setCollidesWith();
    ingred.setVisible(false);
}

let recept = [
    {
        instruktion: "Banka mikrovågsugnen till 175 grader.",
        objekt1: 12,
        objekt2: 12,
        max: 100,
        callback: (scene) => {
            scene.ingredienser.mikroAv.setTexture("mikroPa");
        }
    },
    {
        instruktion: "Gör så att hönan värper ett ägg.",
        objekt1: 4,
        objekt2: 22,
        max: 50,
        callback: (scene) => {
            let x = scene.ingredienser.hona.x;
            let y = scene.ingredienser.hona.y;

            SpawnIngredAt(scene.ingredienser.aggHel, x, y);
        }
    },
    {
        instruktion: "Knäck ett ägg.",
        objekt1: 6,
        objekt2: 6,
        max: 50,
        callback: (scene) => {
            let x = scene.ingredienser.aggHel.x;
            let y = scene.ingredienser.aggHel.y;

            RemoveIngred(scene.ingredienser.aggHel);
            SpawnIngredAt(scene.ingredienser.agg, x, y);
            SpawnIngredAt(scene.ingredienser.skal, x, y);
        }
    },
    {
        instruktion: "Tillsätt ägget till bunken.",
        objekt1: 5,
        objekt2: 0,
        max: 100,
        callback: (scene) => {
            RemoveIngred(scene.ingredienser.agg);
        }
    },
    {
        instruktion: "Tillsätt socker till bunken.",
        objekt1: 18,
        objekt2: 0,
        max: 100,
        callback: (scene) => {
            RemoveIngred(scene.ingredienser.socker);
        }
    },
    {
        instruktion: "Blanda innehållet med skeden.",
        objekt1: 0,
        objekt2: 17,
        max: 100,
        callback: (scene) => {

        }
    },
    {
        instruktion: "Tillsätt mjöl.",
        objekt1: 1,
        objekt2: 0,
        max: 100,
        callback: (scene) => {
            RemoveIngred(scene.ingredienser.mjol);
        }
    },
    {
        instruktion: "Tillsätt potatismjöl.",
        objekt1: 14,
        objekt2: 0,
        max: 100,
        callback: (scene) => {
            RemoveIngred(scene.ingredienser.potatisMjol);
        }
    },
    {
        instruktion: "Tillsätt bakpulver.",
        objekt1: 0,
        objekt2: 2,
        max: 100,
        callback: (scene) => {
            RemoveIngred(scene.ingredienser.bakpulver);
        }
    },
    {
        instruktion: "Blanda innehållet med skeden igen.",
        objekt1: 0,
        objekt2: 17,
        max: 100,
        callback: (scene) => {

        }
    },
    {
        instruktion: "Grädda mitt i mikron i ca 40 minuter.",
        objekt1: 0,
        objekt2: 12,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.mikroAv.x;
            let y = scene.ingredienser.mikroAv.y;

            SpawnIngredAt(scene.ingredienser.tartbottenHel, x, y);
        }
    },
    {
        instruktion: "Skär kakan i två delar.",
        objekt1: 26,
        objekt2: 23,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.tartbottenHel.x;
            let y = scene.ingredienser.tartbottenHel.y;

            RemoveIngred(scene.ingredienser.tartbottenHel);
            SpawnIngredAt(scene.ingredienser.tartbottenHalv1, x, y);
            SpawnIngredAt(scene.ingredienser.tartbottenHalv2, x, y);
        }
    },
    {
        instruktion: "Tillsätt grädden till bunken.",
        objekt1: 0,
        objekt2: 10,
        max: 100,
        callback: (scene) => {
            RemoveIngred(scene.ingredienser.gradde);
        }
    },
    {
        instruktion: "Vispa grädden.",
        objekt1: 21,
        objekt2: 0,
        max: 100,
        callback: (scene) => {

        }
    },
    {
        instruktion: "Tillsätt vaniljsocker.",
        objekt1: 0,
        objekt2: 20,
        max: 100,
        callback: (scene) => {
            RemoveIngred(scene.ingredienser.vaniljSocker);
        }
    },
    {
        instruktion: "Lägg kakbotten på tallriken.",
        objekt1: 27,
        objekt2: 24,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.tallrik.x;
            let y = scene.ingredienser.tallrik.y;
            
            RemoveIngred(scene.ingredienser.tallrik);
            RemoveIngred(scene.ingredienser.tartbottenHalv1);
            SpawnIngredAt(scene.ingredienser.tallrikbotten1, x, y);
        }  
    },
    {
        instruktion: "Skapa spelsylt med hjälp av kniven.",
        objekt1: 4,
        objekt2: 26,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.hona.x;
            let y = scene.ingredienser.hona.y;
            
            RemoveIngred(scene.ingredienser.hona);
            SpawnIngredAt(scene.ingredienser.raKyckling, x, y);
            SpawnIngredAt(scene.ingredienser.spelSylt, x, y);
        }  
    },
    {
        instruktion: "Bre på spelsylt på kakan.",
        objekt1: 8,
        objekt2: 28,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.tallrikbotten1.x;
            let y = scene.ingredienser.tallrikbotten1.y;
            
            RemoveIngred(scene.ingredienser.spelSylt);
            RemoveIngred(scene.ingredienser.tallrikbotten1);
            SpawnIngredAt(scene.ingredienser.tallrikbotten2, x, y);
        }  
    },
    {
        instruktion: "Lägg den andra kakbottnen på tallriken.",
        objekt1: 25,
        objekt2: 29,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.tallrikbotten2.x;
            let y = scene.ingredienser.tallrikbotten2.y;
            
            RemoveIngred(scene.ingredienser.tallrikbotten2);
            RemoveIngred(scene.ingredienser.tartbottenHalv2);
            SpawnIngredAt(scene.ingredienser.tallrikbotten3, x, y);
        }  
    },
    {
        instruktion: "Bre på grädden på tårtan.",
        objekt1: 0,
        objekt2: 30,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.tallrikbotten3.x;
            let y = scene.ingredienser.tallrikbotten3.y;
            
            RemoveIngred(scene.ingredienser.tallrikbotten3);
            SpawnIngredAt(scene.ingredienser.tallrikbotten4, x, y);
        }  
    },
    {
        instruktion: "Klä på tårtan med marsipan.",
        objekt1: 11,
        objekt2: 31,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.tallrikbotten4.x;
            let y = scene.ingredienser.tallrikbotten4.y;
            
            RemoveIngred(scene.ingredienser.marsipan);
            RemoveIngred(scene.ingredienser.tallrikbotten4);
            SpawnIngredAt(scene.ingredienser.tallrikbotten5, x, y);
        }  
    },
    {
        instruktion: "Strö på florsocker.",
        objekt1: 7,
        objekt2: 32,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.tallrikbotten5.x;
            let y = scene.ingredienser.tallrikbotten5.y;
            
            RemoveIngred(scene.ingredienser.florSocker);
            RemoveIngred(scene.ingredienser.tallrikbotten5);
            SpawnIngredAt(scene.ingredienser.tallrikbotten6, x, y);
        }  
    },
    {
        instruktion: "Lägg på rosen.",
        objekt1: 33,
        objekt2: 34,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.tallrikbotten6.x;
            let y = scene.ingredienser.tallrikbotten6.y;
            
            RemoveIngred(scene.ingredienser.rosEllerHallon);
            RemoveIngred(scene.ingredienser.tallrikbotten6);
            //SpawnIngredAt(scene.ingredienser.tallrikbotten7, x, y); Rose
        }  
    }
];