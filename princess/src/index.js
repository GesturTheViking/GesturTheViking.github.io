var gameScene = {};

let leftGrabbing = false;
let rightGrabbing = false;
let hasGlasses = false;

let ingredientAddTime = 100;
let ingredientAddTimer = ingredientAddTime;

let bunkensMjol = 0;
let bunkensMaxMjol = 500;
let keyboardInput = {};

let formatTime = (timer) => {
    let minutes = Math.floor(timer / 60);
    let seconds = timer - minutes * 60;
    return minutes + ':' + (seconds < 10 ? '0' : '') + (seconds.toString().substr(0, 4 + (seconds >= 10))).replace('.', ':');
};

gameScene.Boot = function () {
    this.face = null;
};
gameScene.Boot.prototype.constructor = gameScene.Boot;

gameScene.Boot.prototype = {
    preload: function () {
        this.load.image('axel', 'assets/sprites/defaultaxel.png');

        /* Character */
        this.load.image("armL1", "assets/sprites/character/LShoulder.png");
        this.load.image("armL2", "assets/sprites/character/Larm.png");
        this.load.image("armR1", "assets/sprites/character/RShoulder.png");
        this.load.image("armR2", "assets/sprites/character/Rarm.png");
        this.load.image("chest", "assets/sprites/character/torso.png");
        this.load.image("head", "assets/sprites/character/Face.png");
        this.load.image("legL", "assets/sprites/character/Lleg.png");
        this.load.image("legR", "assets/sprites/character/Rleg.png");
        this.load.image("Lopenhand", "assets/sprites/character/Lopenhand.png");
        this.load.image("Ropenhand", "assets/sprites/character/Ropenhand.png");
        this.load.image("Lclosedhand", "assets/sprites/character/Lclosedhand.png");
        this.load.image("Rclosedhand", "assets/sprites/character/Rclosedhand.png");
        this.load.image("chin", "assets/sprites/character/Chin.png");
        this.load.json("character_collider", "assets/marten.json");

        this.load.image("hyllaV", "assets/sprites/LShelf.png");
        this.load.image("hyllaH", "assets/sprites/RShelf.png");
        this.load.image("bunke", "assets/sprites/bowl.png");
        this.load.image("mjol", "assets/sprites/mjöl.png");
        this.load.image("bakpulver", "assets/sprites/bakpulver.png");
        this.load.image("gronFagel", "assets/sprites/blue.png");
        this.load.image("hona", "assets/sprites/chicken.png");
        this.load.image("agg", "assets/sprites/egg.png");
        this.load.image("aggHel", "assets/sprites/eggINTACT.png");
        this.load.image("florsocker", "assets/sprites/florsocker.png");
        this.load.image("spelsylt", "assets/sprites/gamejam.png");
        this.load.image("blaFagel", "assets/sprites/green.png");
        this.load.image("gradde", "assets/sprites/grädde.png");
        this.load.image("marsipan", "assets/sprites/marsipan.png");
        this.load.image("mikroAv", "assets/sprites/mikroOff.png");
        this.load.image("mikroPa", "assets/sprites/mikroOn.png");
        this.load.image("potatisMjol", "assets/sprites/potatisMjöl.png");
        this.load.image("raKyckling", "assets/sprites/RAW.png");
        this.load.image("skal", "assets/sprites/skal.png");
        this.load.image("sked", "assets/sprites/sked.png");
        this.load.image("socker", "assets/sprites/socker.png");
        this.load.image("kycklingBrostFile", "assets/sprites/tiddy.png");
        this.load.image("vaniljSocker", "assets/sprites/vaniljSocker.png");
        this.load.image("visp", "assets/sprites/visp.png");
        this.load.image("varmeLampa", "assets/sprites/warmLamp.png");
        this.load.image("tartbottenHel", "assets/sprites/tartbottenHel.png");
        this.load.image("tartbottenHalv", "assets/sprites/tartbottenHalv.png");
        this.load.image("kniv", "assets/sprites/kniv.png");
        this.load.image("solglasogon", "assets/sprites/solglasogon.png");
        this.load.image("tallrik", "assets/sprites/tallrik.png");
        this.load.image("tallrikbotten1", "assets/sprites/tallrikbotten1.png");
        this.load.image("tallrikbotten2", "assets/sprites/tallrikbotten2.png");
        this.load.image("tallrikbotten3", "assets/sprites/tallrikbotten3.png");
        this.load.image("tallrikbotten4", "assets/sprites/tallrikbotten4.png");
        this.load.image("tallrikbotten5", "assets/sprites/tallrikbotten5.png");
        this.load.image("tallrikbotten6", "assets/sprites/tallrikbotten6.png");

        this.load.json("ingredienser", "assets/ingredienser.json");

        this.load.image("barFill", "assets/sprites/barFill.png");
        this.load.image("barBackground", "assets/sprites/barBackground.png");
    },
    create: function () {
        document.body.style.background = 'url("../assets/bageri.png")';
        document.body.style.backgroundSize = "cover";

        t = this;
        this.input.mouse.disableContextMenu();
        this.matter.world.setBounds();
        
        keyboardInput.cursors = this.input.keyboard.createCursorKeys();
        keyboardInput.shift =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyboardInput.w =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyboardInput.a =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyboardInput.s =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyboardInput.d =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyboardInput.space =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyboardInput.esc =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.matter.world.on('collisionstart', function (e) {
            e.pairs.forEach(function (pair) {
                let A = pair.bodyA;
                let B = pair.bodyB;
                if (!A.isStatic && !B.isStatic && !pair.isSensor) {
                    if (A.gameObject.getData("isCharacter") && B.gameObject.getData("isIngrediens"))
                    {
                        if ((A.gameObject.texture.key == "Lopenhand" || A.gameObject.texture.key == "Lclosedhand") &&
                        !A.gameObject.getData("hasIngrediens") && leftGrabbing)
                        {
                            A.gameObject.setData("hasIngrediens", t.matter.add.constraint(A.gameObject, B.gameObject, 15, .04/* ,
                                { pointA: { x: -65, y: 10 } } */));
                            
                            A.gameObject.setData("holdIngrediens", B.gameObject);
                        }
                        if ((A.gameObject.texture.key == "Ropenhand" || A.gameObject.texture.key == "Rclosedhand")
                         && !A.gameObject.getData("hasIngrediens") && rightGrabbing)
                        {
                            A.gameObject.setData("hasIngrediens", t.matter.add.constraint(A.gameObject, B.gameObject, 15, .04/* ,
                                { pointA: { x: -65, y: 10 } } */));
                            
                            A.gameObject.setData("holdIngrediens", B.gameObject);
                        }
                        
                        if (!A.gameObject.getData("hasIngrediens") && A.gameObject.texture.key == "head" && B.gameObject.texture.key == "solglasogon")
                        {
                            B.gameObject.setSensor(true);
                            B.gameObject.setCollidesWith();

                            console.log(A.gameObject.body);
                            var rot = A.gameObject.body.angle;
                            B.gameObject.body.angle = rot;
                            t.matter.add.constraint(A.gameObject, B.gameObject, 10, .05,
                                { pointA: { x: 30, y: -5 }, pointB: { x: 10, y: -10 } });
                            t.matter.add.constraint(A.gameObject, B.gameObject, 10, .05,
                                { pointA: { x: -40, y: -5 }, pointB: { x: -10, y: -10 } });
                            hasGlasses = true;
                        }
                    }

                    let index1 = A.gameObject.getData("index");
                    let index2 = B.gameObject.getData("index");
                    if (((index1 == recept[nuvarandeSteg].objekt1 && index2 == recept[nuvarandeSteg].objekt2) ||
                        index1 == recept[nuvarandeSteg].objekt2 && index2 == recept[nuvarandeSteg].objekt1) 
                        && ingredientAddTimer <= 0.0) {
                        let velBunkeX = A.gameObject.body.velocity.x;
                        let velBunkeY = A.gameObject.body.velocity.y;
                        let velIngredX = B.gameObject.body.velocity.x;
                        let velIngredY = B.gameObject.body.velocity.y;
                        let magBunke = Math.sqrt(velBunkeX * velBunkeX + velBunkeY * velBunkeY);
                        let magIngred = Math.sqrt(velIngredX * velIngredX + velIngredY * velIngredY);
                        let mag = magBunke + magIngred;

                        if(mag > 15){
                            receptProgress += mag;
                            receptProgress = Math.min(receptProgress, recept[nuvarandeSteg].max);
                            ingredientAddTimer = ingredientAddTime;
                        }
                    }
                }
                else if (A.isStatic && !B.isStatic)
                {                   
                    let index2 = B.gameObject.getData("index");
                    if (index2 == recept[nuvarandeSteg].objekt1 && index2 == recept[nuvarandeSteg].objekt2)
                    {
                        let velIngredX = B.gameObject.body.velocity.x;
                        let velIngredY = B.gameObject.body.velocity.y;
                        let magIngred = Math.sqrt(velIngredX * velIngredX + velIngredY * velIngredY);

                        if(magIngred > 8){
                            receptProgress += magIngred;
                            receptProgress = Math.min(receptProgress, recept[nuvarandeSteg].max);
                            ingredientAddTimer = ingredientAddTime;
                        }
                    }
                }

                if (A.gameObject && B.gameObject) {
                }
            });
        });

        receptProgress = 0;
        nuvarandeSteg = 0;

        this.timer = 0;

        /* Character */
        {
            this.character = {};
            this.character_collider = this.cache.json.get("character_collider");

            this.character.head = this.matter.add.sprite(800, 450, 'head');
            this.character.head.setBody(this.character_collider.Face);
            
            this.character.chest = this.matter.add.sprite(810, 650, 'chest');
            this.character.chest.setBody(this.character_collider.torso);

            this.character.armL1 = this.matter.add.sprite(740, 610, 'armL1');
            this.character.armL1.setBody(this.character_collider.LShoulder);

            this.character.armR1 = this.matter.add.sprite(860, 610, 'armR1');
            this.character.armR1.setBody(this.character_collider.RShoulder);

            this.character.armL2 = this.matter.add.sprite(720, 700, 'armL2');
            this.character.armL2.setBody(this.character_collider.Larm);

            this.character.armR2 = this.matter.add.sprite(885, 700, 'armR2');
            this.character.armR2.setBody(this.character_collider.Rarm);

            this.character.legL = this.matter.add.sprite(787, 845, 'legL');
            this.character.legL.setBody(this.character_collider.Lleg);

            this.character.legR = this.matter.add.sprite(842, 845, 'legR');
            this.character.legR.setBody(this.character_collider.Rleg);

            this.character.Lhand = this.matter.add.sprite(787, 845, 'Lopenhand');
            this.character.Lhand.setBody(this.character_collider.Lopenhand);

            this.character.Rhand = this.matter.add.sprite(842, 845, 'Ropenhand');
            this.character.Rhand.setBody(this.character_collider.Ropenhand);

            this.character.chin = this.matter.add.sprite(842, 845, 'chin');
            this.character.chin.setBody(this.character_collider.chin);
            this.character.chin.setSensor(true);
            this.character.chin.setCollidesWith();

            this.matter.add.constraint(this.character.chest, this.character.head, 30, .25,
                { pointA: { x: 10, y: -70 }, pointB: { x: 10, y:  80 } });
            this.matter.add.constraint(this.character.chest, this.character.head, 30, .25,
                { pointA: { x: -10, y: -70 }, pointB: { x: -10, y:  80 } });
            this.matter.add.constraint(this.character.chest, this.character.armL1, 15, .05,
                { pointA: { x: -55, y: -70 }, pointB: { x: 5, y: -5 } });
            this.matter.add.constraint(this.character.chest, this.character.armR1, 15, .05,
                { pointA: { x: 55, y: -70 }, pointB: { x: -5, y: -5 } });
            this.matter.add.constraint(this.character.chest, this.character.legL, 20, .01,
                { pointA: { x: -25, y: 110 }, pointB: { x: 0, y: -105 } });
            this.matter.add.constraint(this.character.chest, this.character.legR, 20, .01,
                { pointA: { x: 25, y: 100 }, pointB: { x: 0, y: -105 } });
            this.matter.add.constraint(this.character.armL1, this.character.armL2, 15, .1,
                { pointA: { x: -3, y: 12 }, pointB: { x: 20, y: -50 } });
            this.matter.add.constraint(this.character.armR1, this.character.armR2, 15, .1,
                { pointA: { x: 3, y: 12 }, pointB: { x: -20, y: -50 } });
            this.matter.add.constraint(this.character.armL2, this.character.Lhand, 10, .1,
                { pointA: { x: -10, y: 60 }, pointB: { x: 0, y: -25 } });
            this.matter.add.constraint(this.character.armR2, this.character.Rhand, 10, .1,
                { pointA: { x: 12, y: 60 }, pointB: { x: 0, y: -25 } });
            this.matter.add.constraint(this.character.head, this.character.chin, 10, .1,
                { pointA: { x: 10, y: 45 }, pointB: { x: 5, y: -10 } });
            this.matter.add.constraint(this.character.head, this.character.chin, 10, .1,
                { pointA: { x: -20, y: 45 }, pointB: { x: -5, y: -10 } });
 
            Object.values(this.character).forEach((obj) => {
                obj.setData("isCharacter", true);
            });
        }
        
        graphics = this.add.graphics();
        /* Ingredienser */
        {
            this.hyllor = {};
            this.ingredienser = {};
            this.ingredienser_colliders = this.cache.json.get("ingredienser");

            this.hyllor.lampFaste = this.matter.add.sprite(960, 0, "hyllaV");
            this.hyllor.lampFaste.setBody(this.ingredienser_colliders.RShelf);
            this.hyllor.lampFaste.setVisible(false);
            this.hyllor.lampFaste.setCollidesWith();

            this.hyllor.hyllaV1 = this.matter.add.sprite(128, 200, "hyllaV");
            this.hyllor.hyllaV1.setBody(this.ingredienser_colliders.LShelf);

            this.hyllor.hyllaV2 = this.matter.add.sprite(128, 400, "hyllaV");
            this.hyllor.hyllaV2.setBody(this.ingredienser_colliders.LShelf);

            this.hyllor.hyllaV3 = this.matter.add.sprite(128, 600, "hyllaV");
            this.hyllor.hyllaV3.setBody(this.ingredienser_colliders.LShelf);

            this.hyllor.hyllaH1 = this.matter.add.sprite(1920 - 128, 200, "hyllaH");
            this.hyllor.hyllaH1.setBody(this.ingredienser_colliders.RShelf);

            this.hyllor.hyllaH2 = this.matter.add.sprite(1920 - 128, 400, "hyllaH");
            this.hyllor.hyllaH2.setBody(this.ingredienser_colliders.RShelf);

            this.hyllor.hyllaH3 = this.matter.add.sprite(1920 - 128, 600, "hyllaH");
            this.hyllor.hyllaH3.setBody(this.ingredienser_colliders.RShelf);

            this.ingredienser.bunke = this.matter.add.sprite(1830, 100, "bunke");
            this.ingredienser.bunke.setBody(this.ingredienser_colliders.bowl).setScale(0.5);
            this.ingredienser.bunke.setData({ isBunke: true, index: 0 });

            this.ingredienser.mjol = this.matter.add.sprite(160, 100, "mjol");
            this.ingredienser.mjol.setBody(this.ingredienser_colliders.mjol).setScale(0.5);
            this.ingredienser.mjol.setData({ index: 1 });

            this.ingredienser.bakpulver = this.matter.add.sprite(100, 100, "bakpulver");
            this.ingredienser.bakpulver.setBody(this.ingredienser_colliders.bakpulver).setScale(1.0);
            this.ingredienser.bakpulver.setData({ index: 2 });

            this.ingredienser.gronFagel = this.matter.add.sprite(60, 200, "gronFagel");
            this.ingredienser.gronFagel.setBody(this.ingredienser_colliders.blue).setScale(0.5);
            this.ingredienser.gronFagel.setData({ index: 3 });
            RemoveIngred(this.ingredienser.gronFagel);

            this.ingredienser.hona = this.matter.add.sprite(1860, 1000, "hona");
            this.ingredienser.hona.setBody(this.ingredienser_colliders.chicken).setScale(0.5);
            this.ingredienser.hona.setData({ index: 4 });

            this.ingredienser.agg = this.matter.add.sprite(60, 300, "agg");
            this.ingredienser.agg.setBody(this.ingredienser_colliders.egg).setScale(0.8);
            this.ingredienser.agg.setData({ index: 5 });
            RemoveIngred(this.ingredienser.agg);

            this.ingredienser.aggHel = this.matter.add.sprite(60, 350, "aggHel");
            this.ingredienser.aggHel.setBody(this.ingredienser_colliders.eggINTACT).setScale(0.8);
            this.ingredienser.aggHel.setData({ index: 6 });
            RemoveIngred(this.ingredienser.aggHel);

            this.ingredienser.florSocker = this.matter.add.sprite(40, 290, "florsocker");
            this.ingredienser.florSocker.setBody(this.ingredienser_colliders.florsocker).setScale(0.7);
            this.ingredienser.florSocker.setData({ index: 7 });

            this.ingredienser.spelSylt = this.matter.add.sprite(60, 450, "spelsylt");
            this.ingredienser.spelSylt.setBody(this.ingredienser_colliders.gamejam).setScale(1.0);
            this.ingredienser.spelSylt.setData({ index: 8 });
            RemoveIngred(this.ingredienser.spelSylt);

            this.ingredienser.blaFagel = this.matter.add.sprite(60, 500, "blaFagel");
            this.ingredienser.blaFagel.setBody(this.ingredienser_colliders.green).setScale(0.5);
            this.ingredienser.blaFagel.setData({ index: 9 });
            RemoveIngred(this.ingredienser.blaFagel);

            this.ingredienser.gradde = this.matter.add.sprite(120, 520, "gradde");
            this.ingredienser.gradde.setBody(this.ingredienser_colliders.gradde).setScale(0.7);
            this.ingredienser.gradde.setData({ index: 10 });

            this.ingredienser.marsipan = this.matter.add.sprite(60, 550, "marsipan");
            this.ingredienser.marsipan.setBody(this.ingredienser_colliders.marsipan).setScale(0.7);
            this.ingredienser.marsipan.setData({ index: 11 });

            this.ingredienser.mikroAv = this.matter.add.sprite(1830, 550, "mikroAv");
            this.ingredienser.mikroAv.setBody(this.ingredienser_colliders.mikroOff).setScale(0.25);
            this.ingredienser.mikroAv.setData({ index: 12 });

            /*this.ingredienser.mikroPa = this.matter.add.sprite(1860, 150, "mikroPa");
            this.ingredienser.mikroPa.setBody(this.ingredienser_colliders.mikroON).setScale(0.25);
            this.ingredienser.mikroPa.setData({ index: 13 });*/

            this.ingredienser.potatisMjol = this.matter.add.sprite(40, 100, "potatisMjol");
            this.ingredienser.potatisMjol.setBody(this.ingredienser_colliders.potatisMjöl).setScale(0.7);
            this.ingredienser.potatisMjol.setData({ index: 14 });

            this.ingredienser.raKyckling = this.matter.add.sprite(1860, 250, "raKyckling");
            this.ingredienser.raKyckling.setBody(this.ingredienser_colliders.RAW).setScale(0.5);
            this.ingredienser.raKyckling.setData({ index: 15 });
            RemoveIngred(this.ingredienser.raKyckling);

            this.ingredienser.skal = this.matter.add.sprite(1860, 300, "skal");
            this.ingredienser.skal.setBody(this.ingredienser_colliders.skal).setScale(0.8);
            this.ingredienser.skal.setData({ index: 16 });
            RemoveIngred(this.ingredienser.skal);

            this.ingredienser.sked = this.matter.add.sprite(1860, 280, "sked");
            this.ingredienser.sked.setBody(this.ingredienser_colliders.sked).setScale(0.7);
            this.ingredienser.sked.setData({ index: 17 });

            this.ingredienser.socker = this.matter.add.sprite(100, 290, "socker");
            this.ingredienser.socker.setBody(this.ingredienser_colliders.socker).setScale(0.7);
            this.ingredienser.socker.setData({ index: 18 });

            this.ingredienser.kycklingBrostFile = this.matter.add.sprite(1860, 450, "kycklingBrostFile");
            this.ingredienser.kycklingBrostFile.setBody(this.ingredienser_colliders.tiddy).setScale(0.7);
            this.ingredienser.kycklingBrostFile.setData({ index: 19 });
            RemoveIngred(this.ingredienser.kycklingBrostFile);

            this.ingredienser.vaniljSocker = this.matter.add.sprite(150, 290, "vaniljSocker");
            this.ingredienser.vaniljSocker.setBody(this.ingredienser_colliders.vaniljSocker).setScale(1.0);
            this.ingredienser.vaniljSocker.setData({ index: 20 });

            this.ingredienser.visp = this.matter.add.sprite(1830, 50, "visp");
            this.ingredienser.visp.setBody(this.ingredienser_colliders.visp).setScale(0.7);
            this.ingredienser.visp.setData({ index: 21 });

            this.ingredienser.varmeLampa = this.matter.add.sprite(960, 100, "varmeLampa");
            this.ingredienser.varmeLampa.setBody(this.ingredienser_colliders.warmLamp).setScale(0.7);
            this.ingredienser.varmeLampa.setData({ index: 22 });
            this.matter.add.constraint(this.hyllor.lampFaste, this.ingredienser.varmeLampa, 100, .05,
                { pointA: { x: 0, y: 0 }, pointB: { x: 0, y: 50 } });

            this.ingredienser.tartbottenHel = this.matter.add.sprite(1860, 650, "tartbottenHel");
            this.ingredienser.tartbottenHel.setBody(this.ingredienser_colliders.tartbottenHel);
            this.ingredienser.tartbottenHel.setData({ index: 23 });
            RemoveIngred(this.ingredienser.tartbottenHel);

            this.ingredienser.tartbottenHalv1 = this.matter.add.sprite(1860, 700, "tartbottenHalv");
            this.ingredienser.tartbottenHalv1.setBody(this.ingredienser_colliders.tartbottenHalv1);
            this.ingredienser.tartbottenHalv1.setData({ index: 24 });
            RemoveIngred(this.ingredienser.tartbottenHalv1);
            this.ingredienser.tartbottenHalv2 = this.matter.add.sprite(1860, 700, "tartbottenHalv");
            this.ingredienser.tartbottenHalv2.setBody(this.ingredienser_colliders.tartbottenHalv2);
            this.ingredienser.tartbottenHalv2.setData({ index: 25 });
            RemoveIngred(this.ingredienser.tartbottenHalv2);

            this.ingredienser.kniv = this.matter.add.sprite(1860, 700, "kniv");
            this.ingredienser.kniv.setBody(this.ingredienser_colliders.kniv);
            this.ingredienser.kniv.setData({ index: 26 });

            this.ingredienser.tallrik = this.matter.add.sprite(1800, 300, "tallrik");
            this.ingredienser.tallrik.setBody(this.ingredienser_colliders.tallrik);
            this.ingredienser.tallrik.setData({ index: 27 });

            this.ingredienser.tallrikbotten1 = this.matter.add.sprite(1160, 1000, "tallrikbotten1");
            this.ingredienser.tallrikbotten1.setBody(this.ingredienser_colliders.tallrikbotten1);
            this.ingredienser.tallrikbotten1.setData({ index: 28 });
            RemoveIngred(this.ingredienser.tallrikbotten1);

            this.ingredienser.tallrikbotten2 = this.matter.add.sprite(1160, 1000, "tallrikbotten2");
            this.ingredienser.tallrikbotten2.setBody(this.ingredienser_colliders.tallrikbotten2);
            this.ingredienser.tallrikbotten2.setData({ index: 29 });
            RemoveIngred(this.ingredienser.tallrikbotten2);

            this.ingredienser.tallrikbotten3 = this.matter.add.sprite(1160, 1000, "tallrikbotten3");
            this.ingredienser.tallrikbotten3.setBody(this.ingredienser_colliders.tallrikbotten3);
            this.ingredienser.tallrikbotten3.setData({ index: 30 });
            RemoveIngred(this.ingredienser.tallrikbotten3);

            this.ingredienser.tallrikbotten4 = this.matter.add.sprite(1160, 1000, "tallrikbotten4");
            this.ingredienser.tallrikbotten4.setBody(this.ingredienser_colliders.tallrikbotten4);
            this.ingredienser.tallrikbotten4.setData({ index: 31 });
            RemoveIngred(this.ingredienser.tallrikbotten4);

            this.ingredienser.tallrikbotten5 = this.matter.add.sprite(1160, 1000, "tallrikbotten5");
            this.ingredienser.tallrikbotten5.setBody(this.ingredienser_colliders.tallrikbotten5);
            this.ingredienser.tallrikbotten5.setData({ index: 32 });
            RemoveIngred(this.ingredienser.tallrikbotten5);

            this.ingredienser.tallrikbotten6 = this.matter.add.sprite(1160, 1000, "tallrikbotten6");
            this.ingredienser.tallrikbotten6.setBody(this.ingredienser_colliders.tallrikbotten6);
            this.ingredienser.tallrikbotten6.setData({ index: 33 });
            RemoveIngred(this.ingredienser.tallrikbotten6);

            this.ingredienser.solglasogon = this.matter.add.sprite(1830, 500, "solglasogon");
            this.ingredienser.solglasogon.setBody(this.ingredienser_colliders.solglasogon);
            this.ingredienser.solglasogon.setData({ index: 69 });

            Object.values(this.ingredienser).forEach((obj) => {
                obj.setData("isIngrediens", true);
            });
        }

        txt = this.add.text(1800, 20, 'hej').setFontFamily('Comic Sans MS').setFontSize(32)/* .setColor("#ff389c") */.setStroke(0, 4);
        this.timerTxt = this.add.text(1800, 900, '0:00').setFontFamily('Comic Sans MS').setFontSize(40)/* .setColor("#ff389c") */.setStroke(0, 4);

        this.delay = 20;

        this.barBackground = this.add.image(100, 110, "barBackground");
        this.barFill = this.add.image(100, 110, "barFill");

        console.log(this.barBackground);
    },
    update: function (frame, dt) {
        this.delay -= dt;
        if (this.delay >= .0)
        {
            return;
        }

        graphics.clear();
        graphics.lineStyle(10, 0x000000, 1).lineBetween(this.ingredienser.varmeLampa.getBottomCenter().x, this.ingredienser.varmeLampa.getBottomCenter().y, 
            this.hyllor.lampFaste.x, this.hyllor.lampFaste.y);
        
        if (!this.timerStopped)
        {
            //console.log(this.timerTxt);
            this.timerTxt.setText(formatTime(this.timer));
            this.timerTxt.setX(1920 - this.timerTxt.width - 20).setY(1080 - this.timerTxt.height - 20);
            
            this.timer += dt / 1000;
            if(receptProgress >= recept[nuvarandeSteg].max){
                if (!progressTimer || progressTimer.hasDispatched)
                {
                    recept[nuvarandeSteg].callback(this);
                    progressTimer = this.time.delayedCall(3000, () => 
                    {
                        nuvarandeSteg++; receptProgress = 0;
                        
                        if (nuvarandeSteg >= recept.length)
                        {
                            this.timerStopped = true;
                            nuvarandeSteg--;
                        }
                    }, [], this);
                }
            }
            
            this.barFill._scaleX = (receptProgress / recept[nuvarandeSteg].max) * ((txt.width - 20) / 442);
            this.barFill._scaleY = 0.8;
            this.barFill.width = 442 * this.barFill._scaleX;
            this.barFill.setX(1920 - txt.width + this.barFill.width * 0.5);

            this.barBackground._scaleX = txt.width / 466;
            this.barBackground._scaleY = 0.8;
            this.barBackground.width = 466 * this.barBackground._scaleX;
            this.barBackground.setX(1920 - txt.width - 10 + this.barBackground.width * 0.5);

            txt.setText(recept[nuvarandeSteg].instruktion);
            txt.setX(1920 - txt.width - 10);
        }
        else
        {
            txt.setText('');
        }
            
        ingredientAddTimer -= dt;
        if(ingredientAddTimer <= 0.0){
            ingredientAddTimer = 0;
        }

        if (hasGlasses)
        {
            //this.ingredienser.solglasogon.setX(this.character.head.x);
            //this.ingredienser.solglasogon.setY(this.character.head.y);
        }

        //this.scene.pause();
        let speed = 24;

        if(this.input.gamepad.total > 0) {
            let pad = this.input.gamepad.getPad(0);
            
            if(pad.axes.length) {

                let lAxisH = pad.axes[0].getValue();
                let lAxisV = pad.axes[1].getValue();
                let rAxisH = pad.axes[2].getValue();
                let rAxisV = pad.axes[3].getValue();

                let lTrigger = pad.buttons[6].value;
                let rTrigger = pad.buttons[7].value;

                if(lTrigger > 0.2 || keyboardInput.shift.isDown) {
                    leftGrabbing = true;
                }
                else if (!keyboardInput.shift.isDown){
                    let slakt = this.character.Lhand.getData("hasIngrediens");
                    if(slakt) {
                        this.matter.world.remove(slakt);
                        this.character.Lhand.setData("hasIngrediens", false);
                    }
                    leftGrabbing = false;
                }

                if(rTrigger > 0.2 || keyboardInput.space.isDown) {
                    rightGrabbing = true;
                }
                else if (!keyboardInput.space.isDown){
                    let slakt = this.character.Rhand.getData("hasIngrediens");
                    if(slakt) {
                        this.matter.world.remove(slakt);
                        this.character.Rhand.setData("hasIngrediens", false);
                    }
                    rightGrabbing = false;
                }

                if(Math.abs(lAxisH) > 0.1){
                    this.character.Lhand.setVelocityX(speed * lAxisH);
                }
                
                if(Math.abs(lAxisV) > 0.1){
                    this.character.Lhand.setVelocityY(speed * lAxisV);
                }

                if(Math.abs(rAxisH) > 0.1){
                    this.character.Rhand.setVelocityX(speed * rAxisH);
                }
                
                if(Math.abs(rAxisV) > 0.1){
                    this.character.Rhand.setVelocityY(speed * rAxisV);
                }

                if (pad.buttons[9].value)
                {
                    this.scene.resume('pauseScene');
                    this.scene.pause();
                    return;
                }
            }
        }
        else
        {
            leftGrabbing = keyboardInput.shift.isDown;
            rightGrabbing = keyboardInput.space.isDown;

            if (!rightGrabbing)
            {
                let slakt = this.character.Rhand.getData("hasIngrediens");
                if(slakt) {
                    this.matter.world.remove(slakt);
                    this.character.Rhand.setData("hasIngrediens", false);
                    this.character.Rhand.getData("holdIngrediens").setSensor(false).setCollidesWith(1);
                }
            }
            if (!leftGrabbing)
            {
                let slakt = this.character.Lhand.getData("hasIngrediens");
                if(slakt) {
                    this.matter.world.remove(slakt);
                    this.character.Lhand.setData("hasIngrediens", false);
                    this.character.Lhand.getData("holdIngrediens").setSensor(false).setCollidesWith(1);
                }
            }
        }
        /* Keyboard Input */
        {
            let x = 0, y = 0;
            if (keyboardInput.cursors.left.isDown)
            {
                x = -1;
            }
            else if (keyboardInput.cursors.right.isDown)
            {
                x = 1;
            }

            if (keyboardInput.cursors.up.isDown)
            {
                y = -1;
            }
            else if (keyboardInput.cursors.down.isDown)
            {
                y = 1;
            }

            let v2 = Phaser.Math.Vector2.ZERO;
            if (x || y)
            {
                v2.x = x;
                v2.y = y;
                v2 = v2.normalize();
                v2.x *= speed;
                v2.y *= speed;
                this.character.Rhand.setVelocity(v2.x, v2.y);
            }

            x = 0, y = 0;
            if (keyboardInput.a.isDown)
            {
                x = -1;
            }
            else if (keyboardInput.d.isDown)
            {
                x = 1;
            }

            if (keyboardInput.w.isDown)
            {
                y = -1;
            }
            else if (keyboardInput.s.isDown)
            {
                y = 1;
            }

            v2 = Phaser.Math.Vector2.ZERO;
            if (x || y)
            {
                v2.x = x;
                v2.y = y;
                v2 = v2.normalize();
                v2.x *= speed;
                v2.y *= speed;
                this.character.Lhand.setVelocity(v2.x, v2.y);
            }

            if (Phaser.Input.Keyboard.JustDown(keyboardInput.esc))
            {
                this.scene.resume('pauseScene');
                this.scene.pause();
                return;
            }
        }

        if (leftGrabbing)
        {
            this.character.Lhand.setTexture("Lclosedhand");
        }
        else
        {
            this.character.Lhand.setTexture("Lopenhand");
        }
        if (rightGrabbing)
        {
            this.character.Rhand.setTexture("Rclosedhand");
        }
        else
        {
            this.character.Rhand.setTexture("Ropenhand");
        }
    }
};

game.scene.add('gameScene', gameScene.Boot, false);