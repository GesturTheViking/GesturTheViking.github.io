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
            scene.sounds.microLoop.play();
            scene.sounds.marten175g.play();

            scene.time.delayedCall(3000, () => 
            {
                scene.sounds.martenGlodlampa.play();
            });
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

            SpawnIngredAt(scene.ingredienser.aggHel[0], x, y);
            scene.sounds.aggSpawn.play();
            scene.sounds.martenHona.play();
        }
    },
    {
        instruktion: "Knäck ett ägg.",
        objekt1: 6,
        objekt2: 6,
        max: 50,
        callback: (scene) => {
            let x = scene.ingredienser.aggHel[scene.heldEggIndex].x;
            let y = scene.ingredienser.aggHel[scene.heldEggIndex].y;

            RemoveIngred(scene.ingredienser.aggHel[scene.heldEggIndex]);
            SpawnIngredAt(scene.ingredienser.agg, x, y);
            SpawnIngredAt(scene.ingredienser.skal, x, y - 10.0);
            scene.sounds.aggKras.play();
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
            let x = scene.ingredienser.socker.x;
            let y = scene.ingredienser.socker.y;

            RemoveIngred(scene.ingredienser.socker);
            SpawnIngredAt(scene.ingredienser.sockertom, x, y);
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
            let x = scene.ingredienser.mjol.x;
            let y = scene.ingredienser.mjol.y;

            RemoveIngred(scene.ingredienser.mjol);
            SpawnIngredAt(scene.ingredienser.mjoltom, x, y);
        }
    },
    {
        instruktion: "Tillsätt potatismjöl.",
        objekt1: 14,
        objekt2: 0,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.potatisMjol.x;
            let y = scene.ingredienser.potatisMjol.y;

            RemoveIngred(scene.ingredienser.potatisMjol);
            SpawnIngredAt(scene.ingredienser.potatismjoltom, x, y);
        }
    },
    {
        instruktion: "Tillsätt bakpulver.",
        objekt1: 0,
        objekt2: 2,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.bakpulver.x;
            let y = scene.ingredienser.bakpulver.y;

            RemoveIngred(scene.ingredienser.bakpulver);
            SpawnIngredAt(scene.ingredienser.bakpulvertom, x, y-10);
            SpawnIngredAt(scene.ingredienser.bakpulverlock, x, y);
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

        }
    },
    {
        instruktion: "Vispa grädden.",
        objekt1: 21,
        objekt2: 0,
        max: 100,
        callback: (scene) => {
            scene.sounds.martAlskarVisp.play();
        }
    },
    {
        instruktion: "Tillsätt vaniljsocker.",
        objekt1: 0,
        objekt2: 20,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.vaniljSocker.x;
            let y = scene.ingredienser.vaniljSocker.y;

            RemoveIngred(scene.ingredienser.vaniljSocker);
            SpawnIngredAt(scene.ingredienser.vaniljtom, x, y-10);
            SpawnIngredAt(scene.ingredienser.vaniljlock, x, y);
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
            //Sound 15
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

            scene.sounds.spelSyltHela.play();
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
            SpawnIngredAt(scene.ingredienser.spelsylttom, x, y-10);
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
            SpawnIngredAt(scene.ingredienser.marsipantom, x, y-10);
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
            SpawnIngredAt(scene.ingredienser.florsockertom, x, y-10);

            scene.sounds.martenVilkenArFlourSocker.play();
        }  
    },
    {
        instruktion: "Lägg på rosen.",
        objekt1: 33,
        objekt2: 35,
        max: 100,
        callback: (scene) => {
            let x = scene.ingredienser.tallrikbotten6.x;
            let y = scene.ingredienser.tallrikbotten6.y;
            
            RemoveIngred(scene.ingredienser.rosEllerHallon);
            RemoveIngred(scene.ingredienser.tallrikbotten6);
            SpawnIngredAt(scene.ingredienser.tallrikbotten7, x, y);
        }  
    }
];