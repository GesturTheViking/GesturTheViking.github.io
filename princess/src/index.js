var gameScene = {};

let leftGrabbing = false;
let rightGrabbing = false;
let hasGlasses = false;

let chickenHeld = false;
let chickenAlive = true;
let chickenTimer = 1.0;
let chickenBounceRate = chickenTimer;

let ingredientAddTime = 100;
let ingredientAddTimer = ingredientAddTime;

let score = 6000.0;
let ingredientCollisionSoundTime = 250;
let ingredientCollisionSoundTimer = ingredientCollisionSoundTime;

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
        this.load.image("mikroPa", "assets/sprites/mikroON.png");
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
        this.load.image("tallrikbotten7", "assets/sprites/tallrikbotten7.png");
        this.load.image("rosEllerHallon", "assets/sprites/rosEllerHallon.png");
        this.load.image("bakpulverlock", "assets/sprites/bakpulverlock.png");
        this.load.image("marsipantom", "assets/sprites/marsipantom.png");
        this.load.image("spelsylttom", "assets/sprites/spelsylttom.png");
        this.load.image("vaniljlock", "assets/sprites/vaniljlock.png");
        this.load.image("vaniljtom", "assets/sprites/vaniljtom.png");
        this.load.image("mjoltom", "assets/sprites/mjoltom.png");
        this.load.image("florsockertom", "assets/sprites/florsockertom.png");
        this.load.image("sockertom", "assets/sprites/sockertom.png");
        this.load.image("potatismjoltom", "assets/sprites/potatismjoltom.png");
        this.load.image("bakpulvertom", "assets/sprites/bakpulvertom.png");

        this.load.json("ingredienser", "assets/ingredienser.json");

        this.load.image("barFill", "assets/sprites/barFill.png");
        this.load.image("barBackground", "assets/sprites/barBackground.png");
        this.load.image("barComplete", "assets/sprites/barComplete.png");

        this.load.image("particle", "assets/sprites/default.png");
        this.load.image("graddepart", "assets/sprites/gräddePart.png");
        this.load.image("vaniljsockerpart", "assets/sprites/vaniljsockerpartikle.png");
        this.load.image("sockerpartikel", "assets/sprites/sockerpartikle.png");
        this.load.image("bakpulverpartikel", "assets/sprites/bakpulverPartikle.png");
        this.load.image("mjolpartikel", "assets/sprites/mjölpartikle.png");
        this.load.image("marsipanpart", "assets/sprites/marsipanPart.png");
        this.load.image("blod", "assets/sprites/blood.png");
        this.load.image("el", "assets/sprites/el.png");
        this.load.image("fjader", "assets/sprites/feather.png");
        this.load.image("smet", "assets/sprites/smet.png");
        this.load.image("stjarna", "assets/sprites/star.png");
        this.load.image("aggskal", "assets/sprites/äggskal.png");

        this.load.audio("aggKras", "assets/audio/aggKras.wav");
        this.load.audio("aggSpawn", "assets/audio/aggSpawn.wav");
        this.load.audio("fardigUppgift", "assets/audio/fardigUppgift.wav");
        this.load.audio("kollision1", "assets/audio/kollision1.wav");
        this.load.audio("Kollision2", "assets/audio/Kollision2.wav");
        this.load.audio("Kollision3", "assets/audio/Kollision3.wav");
        this.load.audio("Kollision4", "assets/audio/Kollision4.wav");
        this.load.audio("microLoop", "assets/audio/microLoop.wav");
        this.load.audio("microPling", "assets/audio/microPling.wav");
        this.load.audio("microVaggKollision1", "assets/audio/microVaggKollision1.wav");
        this.load.audio("microVaggKollision2", "assets/audio/microVaggKollision2.wav");
        this.load.audio("microVaggKollision3", "assets/audio/microVaggKollision3.wav");
        this.load.audio("spelSyltBre", "assets/audio/spelSyltBre.wav");
        this.load.audio("spelSyltHela", "assets/audio/spelSyltHela.wav");
        this.load.audio("taPaGlasogon", "assets/audio/taPaGlasogon.wav");

        this.load.audio("gameMusic", [ "assets/audio/Hillbilly_Swing.mp3", "assets/audio/Hillbilly_Swing.ogg" ]);

        this.load.image("WinBG", "assets/sprites/ui/WinBK.png");
    },
    create: function () {
        document.body.style.background = 'url("assets/bageri.png")';
        document.body.style.backgroundSize = "cover";

        t = this;
        this.input.mouse.disableContextMenu();
        this.matter.world.setBounds();
        this.matter.set60Hz();
        console.log(this.matter);

        this.gameMusic = this.sound.add("gameMusic", { loop: true }).setVolume(.075);
        this.gameMusic.play();
        
        keyboardInput.cursors = this.input.keyboard.createCursorKeys();
        keyboardInput.shift =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        keyboardInput.w =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyboardInput.a =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyboardInput.s =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyboardInput.d =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyboardInput.space =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyboardInput.esc =     this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyboardInput.enter =     this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

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

                            if (B.gameObject.texture.key == "hona")
                            {
                                chickenHeld = true;
                            }
                        }
                        if ((A.gameObject.texture.key == "Ropenhand" || A.gameObject.texture.key == "Rclosedhand")
                         && !A.gameObject.getData("hasIngrediens") && rightGrabbing)
                        {
                            A.gameObject.setData("hasIngrediens", t.matter.add.constraint(A.gameObject, B.gameObject, 15, .04/* ,
                                { pointA: { x: -65, y: 10 } } */));
                            
                            A.gameObject.setData("holdIngrediens", B.gameObject);

                            if (B.gameObject.texture.key == "hona")
                            {
                                chickenHeld = true;
                            }
                        }
                        
                        if (!A.gameObject.getData("hasIngrediens") && A.gameObject.texture.key == "head" && B.gameObject.texture.key == "solglasogon")
                        {
                            B.gameObject.setSensor(true);
                            B.gameObject.setCollidesWith();

                            console.log(A.gameObject.body);
                            var rot = A.gameObject.body.angle;
                            B.gameObject.body.angle = rot;
                            t.matter.add.constraint(A.gameObject, B.gameObject, 10, .05,
                                { pointA: { x: 30, y: -15 }, pointB: { x: 10, y: -10 } });
                            t.matter.add.constraint(A.gameObject, B.gameObject, 10, .05,
                                { pointA: { x: -40, y: -15 }, pointB: { x: -10, y: -10 } });
                            hasGlasses = true;

                            t.sounds.taPaGlasogon.play();
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
                            if(nuvarandeSteg == 17) {
                                t.sounds.spelSyltBre.play();
                            }

                            receptProgress += mag;
                            receptProgress = Math.min(receptProgress, recept[nuvarandeSteg].max);
                            ingredientAddTimer = ingredientAddTime;

                            let emitterA = A.gameObject.getData("emitter")
                            let emitterExplodeCountA = A.gameObject.getData("explodeCount")
                            if(emitterA && emitterExplodeCountA){
                                emitterA.explode(emitterExplodeCountA, A.gameObject.x, A.gameObject.y)
                            }

                            let emitterB = B.gameObject.getData("emitter")
                            let emitterExplodeCountB = B.gameObject.getData("explodeCount")
                            if(emitterB && emitterExplodeCountB){
                                emitterB.explode(emitterExplodeCountB, B.gameObject.x, B.gameObject.y)
                            }
                        }
                    }

                    if (A.gameObject.getData("isIngrediens") && B.gameObject.getData("isIngrediens") && ingredientCollisionSoundTimer <= 0.0)
                    {
                        let velBunkeX = A.gameObject.body.velocity.x;
                        let velBunkeY = A.gameObject.body.velocity.y;
                        let velIngredX = B.gameObject.body.velocity.x;
                        let velIngredY = B.gameObject.body.velocity.y;
                        let magIngred1 = Math.sqrt(velBunkeX * velBunkeX + velBunkeY * velBunkeY);
                        let magIngred2 = Math.sqrt(velIngredX * velIngredX + velIngredY * velIngredY);
                        let mag = magIngred1 + magIngred2;

                        if(mag > 15) {
                            if(A.gameObject.getData("mikro") || B.gameObject.getData("mikro")) {
                                t.sounds.microPling.play();
                            }

                            let rand = Math.random() * 100;
                            if(rand < 25){
                                t.sounds.kollision1.play();
                            }
                            else if(rand < 50){
                                t.sounds.kollision2.play();
                            }
                            else if(rand < 75){
                                t.sounds.kollision3.play();
                            }
                            else if(rand < 100){
                                t.sounds.kollision4.play();
                            }

                            ingredientCollisionSoundTimer = ingredientCollisionSoundTime;
                        }
                    }
                }
                else if (A.isStatic && !B.isStatic)
                {       
                    let velIngredX = B.gameObject.body.velocity.x;
                    let velIngredY = B.gameObject.body.velocity.y;
                    let magIngred = Math.sqrt(velIngredX * velIngredX + velIngredY * velIngredY);
                    
                    let index2 = B.gameObject.getData("index");
                    if (index2 == recept[nuvarandeSteg].objekt1 && index2 == recept[nuvarandeSteg].objekt2)
                    {
                        if(magIngred > 8){
                            receptProgress += magIngred;
                            receptProgress = Math.min(receptProgress, recept[nuvarandeSteg].max);
                            ingredientAddTimer = ingredientAddTime;

                            let emitterB = B.gameObject.getData("emitter")
                            let emitterExplodeCountB = B.gameObject.getData("explodeCount");
                            if(emitterB && emitterExplodeCountB){
                                emitterB.explode(emitterExplodeCountB, B.gameObject.x, B.gameObject.y)
                            }
                        }
                    }

                    if(magIngred > 8 && !B.gameObject.getData("isCharacter")) {
                        if(B.gameObject.getData("mikro")) 
                        {
                            let rand = Math.random() * 100;
                            if(rand < 33){
                                t.sounds.microVaggKollision1.play();
                            }
                            else if(rand < 66){
                                t.sounds.microVaggKollision2.play();
                            }
                            else if(rand < 100){
                                t.sounds.microVaggKollision3.play();
                            }

                            ingredientCollisionSoundTimer = ingredientCollisionSoundTime;
                        }
                        else {
                            let rand = Math.random() * 100;
                            if(rand < 25){
                                t.sounds.kollision1.play();
                            }
                            else if(rand < 50){
                                t.sounds.kollision2.play();
                            }
                            else if(rand < 75){
                                t.sounds.kollision3.play();
                            }
                            else if(rand < 100){
                                t.sounds.kollision4.play();
                            }

                            ingredientCollisionSoundTimer = ingredientCollisionSoundTime;
                        }

                        let emitterB = B.gameObject.getData("emitter");
                        let emitterExplodeCountB = B.gameObject.getData("explodeCount");
                            if(emitterB && emitterExplodeCountB){
                                emitterB.explode(emitterExplodeCountB, B.gameObject.x, B.gameObject.y)
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
                { pointA: { x: 10, y: -70 }, pointB: { x: 10, y:  70 } });
            this.matter.add.constraint(this.character.chest, this.character.head, 30, .25,
                { pointA: { x: -10, y: -70 }, pointB: { x: -10, y:  70 } });
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
                { pointA: { x: 10, y: 35 }, pointB: { x: 5, y: -10 } });
            this.matter.add.constraint(this.character.head, this.character.chin, 10, .1,
                { pointA: { x: -20, y: 35 }, pointB: { x: -5, y: -10 } });
            this.matter.add.constraint(this.character.head, this.character.chin, 5, .08,
                { pointA: { x: -5, y: 65 }, pointB: { x: 0, y: 20 } });
 
            Object.values(this.character).forEach((obj) => {
                obj.setData("isCharacter", true);
            });
        }

        /* Particles */
        {
            this.particles = {};
            this.emitters = {};

            this.particles.default = this.add.particles("particle");
            this.emitters.default = this.particles.default.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.gradde = this.add.particles("graddepart");
            this.emitters.gradde = this.particles.gradde.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);
            
            this.particles.vaniljsocker = this.add.particles("vaniljsockerpart");
            this.emitters.vaniljsocker = this.particles.vaniljsocker.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.socker = this.add.particles("sockerpartikel");
            this.emitters.socker = this.particles.socker.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.bakpulver = this.add.particles("bakpulverpartikel");
            this.emitters.bakpulver = this.particles.bakpulver.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.mjolpartikel = this.add.particles("mjolpartikel");
            this.emitters.mjolpartikel = this.particles.mjolpartikel.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.marsipanpartikel = this.add.particles("marsipanpart");
            this.emitters.marsipanpartikel = this.particles.marsipanpartikel.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.blod = this.add.particles("blod");
            this.emitters.blod = this.particles.blod.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.el = this.add.particles("el");
            this.emitters.el = this.particles.el.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.fjader = this.add.particles("fjader");
            this.emitters.fjader = this.particles.fjader.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.smet = this.add.particles("smet");
            this.emitters.smet = this.particles.smet.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.stjarna = this.add.particles("stjarna");
            this.emitters.stjarna = this.particles.stjarna.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);

            this.particles.aggskal = this.add.particles("aggskal");
            this.emitters.aggskal = this.particles.aggskal.createEmitter({ frequency: -1, scale: { start: 1.0, end: 0.2 }, lifespan: 300, 
                speed: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 200;
                    }
                },
                lifespan: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 400 + 200;
                    }
                },
                rotate: {
                    onEmit: function (particle, key, t, value)
                    {
                        return Math.random() * 360;
                    }
                },
             }).setBlendMode(Phaser.BlendModes.NORMAL);
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

            this.hyllor.hyllaV1 = this.matter.add.sprite(128, 330, "hyllaV");
            this.hyllor.hyllaV1.setBody(this.ingredienser_colliders.LShelf);

            this.hyllor.hyllaV2 = this.matter.add.sprite(128, 530, "hyllaV");
            this.hyllor.hyllaV2.setBody(this.ingredienser_colliders.LShelf);

            this.hyllor.hyllaV3 = this.matter.add.sprite(128, 730, "hyllaV");
            this.hyllor.hyllaV3.setBody(this.ingredienser_colliders.LShelf);

            this.hyllor.hyllaH1 = this.matter.add.sprite(1920 - 128, 330, "hyllaH");
            this.hyllor.hyllaH1.setBody(this.ingredienser_colliders.RShelf);

            this.hyllor.hyllaH2 = this.matter.add.sprite(1920 - 128, 530, "hyllaH");
            this.hyllor.hyllaH2.setBody(this.ingredienser_colliders.RShelf);

            this.hyllor.hyllaH3 = this.matter.add.sprite(1920 - 128, 730, "hyllaH");
            this.hyllor.hyllaH3.setBody(this.ingredienser_colliders.RShelf);

            this.ingredienser.bunke = this.matter.add.sprite(1830, 230, "bunke");
            this.ingredienser.bunke.setBody(this.ingredienser_colliders.bowl).setScale(0.5);
            this.ingredienser.bunke.setData({ isBunke: true, index: 0, emitter: this.emitters.default, explodeCount: 10 });

            this.ingredienser.mjol = this.matter.add.sprite(160, 230, "mjol");
            this.ingredienser.mjol.setBody(this.ingredienser_colliders.mjol).setScale(0.5);
            this.ingredienser.mjol.setData({ index: 1, emitter: this.emitters.mjolpartikel, explodeCount: 10 });

            this.ingredienser.bakpulver = this.matter.add.sprite(100, 230, "bakpulver");
            this.ingredienser.bakpulver.setBody(this.ingredienser_colliders.bakpulver).setScale(1.0);
            this.ingredienser.bakpulver.setData({ index: 2, emitter: this.emitters.bakpulver, explodeCount: 10 });

            this.ingredienser.gronFagel = this.matter.add.sprite(60, 200, "gronFagel");
            this.ingredienser.gronFagel.setBody(this.ingredienser_colliders.blue).setScale(0.5);
            this.ingredienser.gronFagel.setData({ index: 3, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.gronFagel);

            this.ingredienser.hona = this.matter.add.sprite(1860, 1000, "hona");
            this.ingredienser.hona.setBody(this.ingredienser_colliders.chicken).setScale(0.5);
            this.ingredienser.hona.setData({ index: 4, emitter: this.emitters.fjader, explodeCount: 10 });

            this.ingredienser.agg = this.matter.add.sprite(60, 300, "agg");
            this.ingredienser.agg.setBody(this.ingredienser_colliders.egg).setScale(0.8);
            this.ingredienser.agg.setData({ index: 5, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.agg);

            this.ingredienser.aggHel = this.matter.add.sprite(60, 350, "aggHel");
            this.ingredienser.aggHel.setBody(this.ingredienser_colliders.eggINTACT).setScale(0.8);
            this.ingredienser.aggHel.setData({ index: 6, emitter: this.emitters.aggskal, explodeCount: 10 });
            RemoveIngred(this.ingredienser.aggHel);

            this.ingredienser.florSocker = this.matter.add.sprite(40, 420, "florsocker");
            this.ingredienser.florSocker.setBody(this.ingredienser_colliders.florsocker).setScale(0.7);
            this.ingredienser.florSocker.setData({ index: 7, emitter: this.emitters.socker, explodeCount: 10 });

            this.ingredienser.spelSylt = this.matter.add.sprite(60, 580, "spelsylt");
            this.ingredienser.spelSylt.setBody(this.ingredienser_colliders.gamejam).setScale(1.0);
            this.ingredienser.spelSylt.setData({ index: 8, emitter: this.emitters.blod, explodeCount: 10 });
            RemoveIngred(this.ingredienser.spelSylt);

            this.ingredienser.blaFagel = this.matter.add.sprite(60, 500, "blaFagel");
            this.ingredienser.blaFagel.setBody(this.ingredienser_colliders.green).setScale(0.5);
            this.ingredienser.blaFagel.setData({ index: 9, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.blaFagel);

            this.ingredienser.gradde = this.matter.add.sprite(120, 650, "gradde");
            this.ingredienser.gradde.setBody(this.ingredienser_colliders.gradde).setScale(0.7);
            this.ingredienser.gradde.setData({ index: 10, emitter: this.emitters.gradde, explodeCount: 10 });

            this.ingredienser.marsipan = this.matter.add.sprite(60, 680, "marsipan");
            this.ingredienser.marsipan.setBody(this.ingredienser_colliders.marsipan).setScale(0.7);
            this.ingredienser.marsipan.setData({ index: 11, emitter: this.emitters.marsipanpartikel, explodeCount: 10 });

            this.ingredienser.mikroAv = this.matter.add.sprite(1830, 680, "mikroAv");
            this.ingredienser.mikroAv.setBody(this.ingredienser_colliders.mikroOff).setScale(0.25);
            this.ingredienser.mikroAv.setData({ mikro: true, index: 12, emitter: this.emitters.default, explodeCount: 10 });

            /*this.ingredienser.mikroPa = this.matter.add.sprite(1860, 150, "mikroPa");
            this.ingredienser.mikroPa.setBody(this.ingredienser_colliders.mikroON).setScale(0.25);
            this.ingredienser.mikroPa.setData({ index: 13 });*/

            this.ingredienser.potatisMjol = this.matter.add.sprite(40, 230, "potatisMjol");
            this.ingredienser.potatisMjol.setBody(this.ingredienser_colliders.potatisMjöl).setScale(0.7);
            this.ingredienser.potatisMjol.setData({ index: 14, emitter: this.emitters.mjolpartikel, explodeCount: 10 });

            this.ingredienser.raKyckling = this.matter.add.sprite(1860, 250, "raKyckling");
            this.ingredienser.raKyckling.setBody(this.ingredienser_colliders.RAW).setScale(0.5);
            this.ingredienser.raKyckling.setData({ index: 15, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.raKyckling);

            this.ingredienser.skal = this.matter.add.sprite(1860, 300, "skal");
            this.ingredienser.skal.setBody(this.ingredienser_colliders.skal).setScale(0.8);
            this.ingredienser.skal.setData({ index: 16, emitter: this.emitters.aggskal, explodeCount: 10 });
            RemoveIngred(this.ingredienser.skal);

            this.ingredienser.sked = this.matter.add.sprite(1860, 410, "sked");
            this.ingredienser.sked.setBody(this.ingredienser_colliders.sked).setScale(0.7);
            this.ingredienser.sked.setData({ index: 17, emitter: this.emitters.default, explodeCount: 10 });

            this.ingredienser.socker = this.matter.add.sprite(100, 420, "socker");
            this.ingredienser.socker.setBody(this.ingredienser_colliders.socker).setScale(0.7);
            this.ingredienser.socker.setData({ index: 18, emitter: this.emitters.socker, explodeCount: 10 });

            this.ingredienser.kycklingBrostFile = this.matter.add.sprite(1860, 450, "kycklingBrostFile");
            this.ingredienser.kycklingBrostFile.setBody(this.ingredienser_colliders.tiddy).setScale(0.7);
            this.ingredienser.kycklingBrostFile.setData({ index: 19, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.kycklingBrostFile);

            this.ingredienser.vaniljSocker = this.matter.add.sprite(150, 420, "vaniljSocker");
            this.ingredienser.vaniljSocker.setBody(this.ingredienser_colliders.vaniljSocker).setScale(1.0);
            this.ingredienser.vaniljSocker.setData({ index: 20, emitter: this.emitters.vaniljsocker, explodeCount: 10 });

            this.ingredienser.visp = this.matter.add.sprite(1830, 180, "visp");
            this.ingredienser.visp.setBody(this.ingredienser_colliders.visp).setScale(0.7);
            this.ingredienser.visp.setData({ index: 21, emitter: this.emitters.default, explodeCount: 10 });

            this.ingredienser.varmeLampa = this.matter.add.sprite(960, 100, "varmeLampa");
            this.ingredienser.varmeLampa.setBody(this.ingredienser_colliders.warmLamp).setScale(0.7);
            this.ingredienser.varmeLampa.setData({ index: 22, emitter: this.emitters.el, explodeCount: 4 });
            this.matter.add.constraint(this.hyllor.lampFaste, this.ingredienser.varmeLampa, 100, .05,
                { pointA: { x: 0, y: 0 }, pointB: { x: 0, y: 50 } });

            this.ingredienser.tartbottenHel = this.matter.add.sprite(1860, 650, "tartbottenHel");
            this.ingredienser.tartbottenHel.setBody(this.ingredienser_colliders.tartbottenHel);
            this.ingredienser.tartbottenHel.setData({ index: 23, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tartbottenHel);

            this.ingredienser.tartbottenHalv1 = this.matter.add.sprite(1860, 700, "tartbottenHalv");
            this.ingredienser.tartbottenHalv1.setBody(this.ingredienser_colliders.tartbottenHalv1);
            this.ingredienser.tartbottenHalv1.setData({ index: 24, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tartbottenHalv1);
            this.ingredienser.tartbottenHalv2 = this.matter.add.sprite(1860, 700, "tartbottenHalv");
            this.ingredienser.tartbottenHalv2.setBody(this.ingredienser_colliders.tartbottenHalv2);
            this.ingredienser.tartbottenHalv2.setData({ index: 25, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tartbottenHalv2);

            this.ingredienser.kniv = this.matter.add.sprite(1860, 830, "kniv");
            this.ingredienser.kniv.setBody(this.ingredienser_colliders.kniv);
            this.ingredienser.kniv.setData({ stuckToWall: this.matter.add.constraint(this.hyllor.hyllaH3, this.ingredienser.kniv, 100, .05,
                { pointA: { x: 0, y: 0 }, pointB: { x: 0, y: 50 } }), index: 26, emitter: this.emitters.default, explodeCount: 10 });

            this.ingredienser.tallrik = this.matter.add.sprite(1800, 430, "tallrik");
            this.ingredienser.tallrik.setBody(this.ingredienser_colliders.tallrik);
            this.ingredienser.tallrik.setData({ index: 27, emitter: this.emitters.default, explodeCount: 10 });

            this.ingredienser.tallrikbotten1 = this.matter.add.sprite(1160, 1000, "tallrikbotten1");
            this.ingredienser.tallrikbotten1.setBody(this.ingredienser_colliders.tallrikbotten1);
            this.ingredienser.tallrikbotten1.setData({ index: 28, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tallrikbotten1);

            this.ingredienser.tallrikbotten2 = this.matter.add.sprite(1160, 1000, "tallrikbotten2");
            this.ingredienser.tallrikbotten2.setBody(this.ingredienser_colliders.tallrikbotten2);
            this.ingredienser.tallrikbotten2.setData({ index: 29, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tallrikbotten2);

            this.ingredienser.tallrikbotten3 = this.matter.add.sprite(1160, 1000, "tallrikbotten3");
            this.ingredienser.tallrikbotten3.setBody(this.ingredienser_colliders.tallrikbotten3);
            this.ingredienser.tallrikbotten3.setData({ index: 30, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tallrikbotten3);

            this.ingredienser.tallrikbotten4 = this.matter.add.sprite(1160, 1000, "tallrikbotten4");
            this.ingredienser.tallrikbotten4.setBody(this.ingredienser_colliders.tallrikbotten4);
            this.ingredienser.tallrikbotten4.setData({ index: 31, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tallrikbotten4);

            this.ingredienser.tallrikbotten5 = this.matter.add.sprite(1160, 1000, "tallrikbotten5");
            this.ingredienser.tallrikbotten5.setBody(this.ingredienser_colliders.tallrikbotten5);
            this.ingredienser.tallrikbotten5.setData({ index: 32, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tallrikbotten5);

            this.ingredienser.tallrikbotten6 = this.matter.add.sprite(1160, 1000, "tallrikbotten6");
            this.ingredienser.tallrikbotten6.setBody(this.ingredienser_colliders.tallrikbotten6);
            this.ingredienser.tallrikbotten6.setData({ index: 33, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tallrikbotten6);
            
            this.ingredienser.tallrikbotten7 = this.matter.add.sprite(1160, 1000, "tallrikbotten7");
            this.ingredienser.tallrikbotten7.setBody(this.ingredienser_colliders.tallrikbotten7);
            this.ingredienser.tallrikbotten7.setData({ index: 34, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.tallrikbotten7);

            this.ingredienser.rosEllerHallon = this.matter.add.sprite(160, 630, "rosEllerHallon");
            this.ingredienser.rosEllerHallon.setBody(this.ingredienser_colliders.rosEllerHallon);
            this.ingredienser.rosEllerHallon.setData({ index: 35, emitter: this.emitters.default, explodeCount: 10 });

            this.ingredienser.bakpulverlock = this.matter.add.sprite(160, 630, "bakpulverlock");
            this.ingredienser.bakpulverlock.setBody(this.ingredienser_colliders.bakpulverlock);
            this.ingredienser.bakpulverlock.setData({ index: 36, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.bakpulverlock);

            this.ingredienser.marsipantom = this.matter.add.sprite(160, 630, "marsipantom");
            this.ingredienser.marsipantom.setBody(this.ingredienser_colliders.marsipantom);
            this.ingredienser.marsipantom.setData({ index: 37, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.marsipantom);

            this.ingredienser.spelsylttom = this.matter.add.sprite(160, 630, "spelsylttom");
            this.ingredienser.spelsylttom.setBody(this.ingredienser_colliders.spelsylttom);
            this.ingredienser.spelsylttom.setData({ index: 38, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.spelsylttom);

            this.ingredienser.vaniljlock = this.matter.add.sprite(160, 630, "vaniljlock");
            this.ingredienser.vaniljlock.setBody(this.ingredienser_colliders.vaniljlock);
            this.ingredienser.vaniljlock.setData({ index: 39, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.vaniljlock);

            this.ingredienser.vaniljtom = this.matter.add.sprite(160, 630, "vaniljtom");
            this.ingredienser.vaniljtom.setBody(this.ingredienser_colliders.vaniljtom);
            this.ingredienser.vaniljtom.setData({ index: 39, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.vaniljtom);

            this.ingredienser.mjoltom = this.matter.add.sprite(160, 630, "mjoltom");
            this.ingredienser.mjoltom.setBody(this.ingredienser_colliders.mjoltom).setScale(0.5);
            this.ingredienser.mjoltom.setData({ index: 40, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.mjoltom);

            this.ingredienser.florsockertom = this.matter.add.sprite(160, 630, "florsockertom");
            this.ingredienser.florsockertom.setBody(this.ingredienser_colliders.florsockertom);
            this.ingredienser.florsockertom.setData({ index: 41, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.florsockertom);

            this.ingredienser.sockertom = this.matter.add.sprite(160, 630, "sockertom");
            this.ingredienser.sockertom.setBody(this.ingredienser_colliders.sockertom);
            this.ingredienser.sockertom.setData({ index: 42, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.sockertom);

            this.ingredienser.potatismjoltom = this.matter.add.sprite(160, 630, "potatismjoltom");
            this.ingredienser.potatismjoltom.setBody(this.ingredienser_colliders.potatismjoltom).setScale(0.5);
            this.ingredienser.potatismjoltom.setData({ index: 43, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.potatismjoltom);
            
            this.ingredienser.bakpulvertom = this.matter.add.sprite(160, 630, "bakpulvertom");
            this.ingredienser.bakpulvertom.setBody(this.ingredienser_colliders.bakpulvertom);
            this.ingredienser.bakpulvertom.setData({ index: 44, emitter: this.emitters.default, explodeCount: 10 });
            RemoveIngred(this.ingredienser.bakpulvertom);

            this.ingredienser.solglasogon = this.matter.add.sprite(1830, 630, "solglasogon");
            this.ingredienser.solglasogon.setBody(this.ingredienser_colliders.solglasogon);
            this.ingredienser.solglasogon.setData({ index: 69, emitter: this.emitters.default, explodeCount: 10 });

            Object.values(this.ingredienser).forEach((obj) => {
                obj.setData("isIngrediens", true);
            });
        }

        /* Sound */
        {
            this.sounds = {}
            this.sounds.aggKras = this.sound.add("aggKras");
            this.sounds.aggSpawn = this.sound.add("aggSpawn");
            this.sounds.fardigUppgift = this.sound.add("fardigUppgift").setVolume(0.1);
            this.sounds.kollision1 = this.sound.add("kollision1");
            this.sounds.kollision2 = this.sound.add("Kollision2");
            this.sounds.kollision3 = this.sound.add("Kollision3");
            this.sounds.kollision4 = this.sound.add("Kollision4");
            this.sounds.microLoop = this.sound.add("microLoop");
            this.sounds.microPling = this.sound.add("microPling");
            this.sounds.microVaggKollision1 = this.sound.add("microVaggKollision1");
            this.sounds.microVaggKollision2 = this.sound.add("microVaggKollision2");
            this.sounds.microVaggKollision3 = this.sound.add("microVaggKollision3");
            this.sounds.spelSyltBre = this.sound.add("spelSyltBre");
            this.sounds.spelSyltHela = this.sound.add("spelSyltHela");
            this.sounds.taPaGlasogon = this.sound.add("taPaGlasogon");
        }

        txt = this.add.text(1800, 20, 'hej').setFontFamily('Comic Sans MS').setFontSize(32)/* .setColor("#ff389c") */.setStroke(0, 4);
        this.timerTxt = this.add.text(1800, 900, '0:00').setFontFamily('Comic Sans MS').setFontSize(40)/* .setColor("#ff389c") */.setStroke(0, 4);

        this.delay = 20;

        this.barBackground = this.add.image(100, 110, "barBackground");
        this.barFill = this.add.image(100, 110, "barFill");
        this.barComplete = this.add.image(100, 110, "barComplete");

        {
            this.winBG = this.add.image(0, 0, "WinBG").setOrigin(0).setVisible(false);
            this.winText = this.add.text(1920/4, 1080/2, '"Snyggt bakat, fräääsig kaka."')
                .setOrigin(.5).setFontFamily("Comic Sans MS").setFontSize(64).setColor("#b5e61d").setStroke(0, 4)
                .setVisible(false);
        }
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

        let slakt = this.ingredienser.kniv.getData("stuckToWall");
        if(slakt){
            graphics.lineStyle(10, 0x000000, 1).lineBetween(this.ingredienser.kniv.getBottomCenter().x, this.ingredienser.kniv.getBottomCenter().y, 
            this.hyllor.hyllaH3.x, this.hyllor.hyllaH3.y);
        
            let xVec = this.ingredienser.kniv.getBottomCenter().x - this.hyllor.hyllaH3.x;
            let yVec = this.ingredienser.kniv.getBottomCenter().y - this.hyllor.hyllaH3.y;
            let magKniv = Math.sqrt(xVec * xVec + yVec * yVec);
            
            if(magKniv > 200) {
                this.matter.world.remove(slakt);
                this.ingredienser.kniv.setData("stuckToWall", false)
            }
        }

        if (!this.timerStopped)
        {
            //console.log(this.timerTxt);
            this.timerTxt.setText(formatTime(this.timer));
            this.timerTxt.setX(1920 - this.timerTxt.width - 20).setY(1080 - this.timerTxt.height - 20);
            
            this.timer += dt / 1000;
            if(receptProgress >= recept[nuvarandeSteg].max) {
                if (!progressTimer || progressTimer.hasDispatched)
                {
                    this.sounds.fardigUppgift.play();
                    recept[nuvarandeSteg].callback(this);
                    progressTimer = this.time.delayedCall(3000, () => 
                    {
                        nuvarandeSteg++; receptProgress = 0;
                        
                        if (nuvarandeSteg >= recept.length)
                        {
                            this.timerStopped = true;
                            nuvarandeSteg--;

                            this.winText.setAlign("center").setText(this.winText.text + "\nTid: " + formatTime(this.timer)
                                + "\nPress " + (this.input.gamepad.total > 0 ? "A" : "Enter") + " to return to menu.").setVisible(true);
                            this.winBG.setVisible(true);
                            this.timerTxt.setVisible(false);
                        }
                    }, [], this);
                }
            }
            
            this.barFill._scaleX = (receptProgress / recept[nuvarandeSteg].max) * ((txt.width - 20) / 442);
            this.barFill._scaleY = 0.8;
            this.barFill.width = 442 * this.barFill._scaleX;
            this.barFill.setX(1920 - txt.width - 10 + this.barFill.width * 0.5);

            this.barBackground._scaleX = txt.width / 466;
            this.barBackground._scaleY = 0.8;
            this.barBackground.width = 466 * this.barBackground._scaleX;
            this.barBackground.setX(1920 - txt.width - 20 + this.barBackground.width * 0.5);

            if(receptProgress >= recept[nuvarandeSteg].max) {
                this.barComplete._scaleX = this.barFill._scaleX;
                this.barComplete._scaleY = 0.8;
                this.barComplete.width = 442 * this.barComplete._scaleX;
                this.barComplete.setX(1920 - txt.width - 10 + this.barComplete.width * 0.5);
            }
            else {
                this.barComplete._scaleX = 0;
            }

            txt.setText(recept[nuvarandeSteg].instruktion);
            txt.setX(1920 - txt.width - 20);
        }
        else
        {
            txt.setText('');

            if (Phaser.Input.Keyboard.JustDown(keyboardInput.enter) || (this.input.gamepad.total > 0 && this.input.gamepad.getPad(0).buttons[0].pressed))
            {
                //location.reload();
                score = this.timer;
                let data = JSON.parse(localStorage.getItem('marten-hs-list'));
                if (data == null)
                {
                    this.scene.switch('hsAddScene');
                }
                else if (score < data.list[data.list.length - 1].score || data.list.length < 10)
                {
                    this.scene.switch('hsAddScene');
                }
                else this.scene.switch('hsListScene');

                this.gameMusic.stop();
            }
        }
            
        ingredientCollisionSoundTimer -= dt;
        if(ingredientCollisionSoundTimer <= 0.0){
            ingredientCollisionSoundTimer = 0;
        }

        ingredientAddTimer -= dt;
        if(ingredientAddTimer <= 0.0){
            ingredientAddTimer = 0;
        }

        if (!chickenHeld && chickenAlive)
        {
            //console.log(dt);
            chickenTimer -= dt / 1000,0;
            if (chickenTimer <= 0)
            {
                this.ingredienser.hona.setVelocityY(-6);
                this.ingredienser.hona.setVelocityX(Math.sin(dt));
                chickenTimer = chickenBounceRate;
                chickenBounceRate = Math.random() + 1.0;
            }
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
                    chickenHeld = false;
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
                    chickenHeld = false;
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