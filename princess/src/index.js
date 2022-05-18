var gameScene = {};

let leftGrabbing = false;
let rightGrabbing = false;

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
        this.load.image("armL1", "assets/sprites/character/armL1.png");
        this.load.image("armL2", "assets/sprites/character/armL2.png");
        this.load.image("armR1", "assets/sprites/character/armR1.png");
        this.load.image("armR2", "assets/sprites/character/armR2.png");
        this.load.image("chest", "assets/sprites/character/chest.png");
        this.load.image("head", "assets/sprites/character/head.png");
        this.load.image("legL", "assets/sprites/character/legL.png");
        this.load.image("legR", "assets/sprites/character/legR.png");
        this.load.json("character_collider", "assets/hannes.json");

        this.load.image("bunke", "assets/sprites/tempbunke.png");
        this.load.image("mjol", "assets/sprites/tempMjol.png");
        this.load.json("ingredienser", "assets/ingredienser.json");
    },
    create: function () {
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

        this.matter.world.on('collisionstart', function (e) {
            e.pairs.forEach(function (pair) {
                let A = pair.bodyA;
                let B = pair.bodyB;
                if (!A.isStatic && !B.isStatic && !pair.isSensor) {
                    if (A.gameObject.getData("isCharacter") && B.gameObject.getData("isIngrediens"))
                    {
                        if (A.gameObject.texture.key == "armL2" && !A.gameObject.getData("hasIngrediens") && leftGrabbing)
                        {
                            A.gameObject.setData("hasIngrediens", t.matter.add.constraint(A.gameObject, B.gameObject, 10, .07,
                                { pointA: { x: -65, y: 10 } }));
                            
                            A.gameObject.setData("holdIngrediens", B.gameObject);
                        }
                        if (A.gameObject.texture.key == "armR2" && !A.gameObject.getData("hasIngrediens") && rightGrabbing)
                        {
                            A.gameObject.setData("hasIngrediens", t.matter.add.constraint(A.gameObject, B.gameObject, 10, .07,
                                { pointA: { x: -65, y: 10 } }));
                            
                            A.gameObject.setData("holdIngrediens", B.gameObject);
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

            this.character.head = this.matter.add.sprite(800, 500, 'head');
            this.character.head.setBody(this.character_collider.head);
            
            this.character.chest = this.matter.add.sprite(810, 650, 'chest');
            this.character.chest.setBody(this.character_collider.chest);

            this.character.armL1 = this.matter.add.sprite(740, 610, 'armL1');
            this.character.armL1.setBody(this.character_collider.armL1);

            this.character.armR1 = this.matter.add.sprite(860, 610, 'armR1');
            this.character.armR1.setBody(this.character_collider.armR1);

            this.character.armL2 = this.matter.add.sprite(720, 700, 'armL2');
            this.character.armL2.setBody(this.character_collider.armL2);

            this.character.armR2 = this.matter.add.sprite(885, 700, 'armR2');
            this.character.armR2.setBody(this.character_collider.armR2);

            this.character.legL = this.matter.add.sprite(787, 845, 'legL');
            this.character.legL.setBody(this.character_collider.legL);

            this.character.legR = this.matter.add.sprite(842, 845, 'legR');
            this.character.legR.setBody(this.character_collider.legR);

            this.matter.add.constraint(this.character.chest, this.character.head, 10, .1,
                { pointA: { x: 0, y: -70 }, pointB: { x: 7, y: 50 } });
            this.matter.add.constraint(this.character.chest, this.character.armL1, 15, .05,
                { pointA: { x: -55, y: -70 }, pointB: { x: 5, y: -20 } });
            this.matter.add.constraint(this.character.chest, this.character.armR1, 15, .05,
                { pointA: { x: 55, y: -70 }, pointB: { x: -5, y: -20 } });
            this.matter.add.constraint(this.character.chest, this.character.legL, 20, .02,
                { pointA: { x: -25, y: 90 }, pointB: { x: -10, y: -85 } });
            this.matter.add.constraint(this.character.chest, this.character.legR, 20, .02,
                { pointA: { x: 25, y: 90 }, pointB: { x: -10, y: -85 } });
            this.matter.add.constraint(this.character.armL1, this.character.armL2, 15, .1,
                { pointA: { x: -3, y: 19 }, pointB: { x: 10, y: -65 } });
            this.matter.add.constraint(this.character.armR1, this.character.armR2, 15, .1,
                { pointA: { x: 3, y: 19 }, pointB: { x: -13, y: -70 } });

            Object.values(this.character).forEach((obj) => {
                obj.setData("isCharacter", true);
            });
        }
        
        walla = this.add.image(300, 400, 'axel');

        /* Ingredienser */
        {
            this.ingredienser = {};
            this.ingredienser_colliders = this.cache.json.get("ingredienser");

            this.ingredienser.bunke = this.matter.add.sprite(300, 500, "bunke");
            this.ingredienser.bunke.setBody(this.ingredienser_colliders.tempbunke);
            this.ingredienser.bunke.setData({ isBunke: true, index: 0 });

            this.ingredienser.mjol = this.matter.add.sprite(300, 500, "mjol");
            this.ingredienser.mjol.setBody(this.ingredienser_colliders.tempMjol);
            this.ingredienser.mjol.setData({ index: 1 });

            Object.values(this.ingredienser).forEach((obj) => {
                obj.setData("isIngrediens", true);
            });
        }

        graphics = this.add.graphics();
        txt = this.add.text(1800, 20, 'walla kebab').setFontFamily('Comic Sans MS').setFontSize(32).setColor("#ff389c");
        this.timerTxt = this.add.text(1800, 900, '0:00').setFontFamily('Comic Sans MS').setFontSize(32).setColor("#ff389c");
    },
    update: function (frame, dt) {
        graphics.clear();
        
        if (!this.timerStopped)
        {
            this.timerTxt.setText(formatTime(this.timer));
            this.timerTxt.setX(1920 - this.timerTxt.width - 20).setY(1080 - this.timerTxt.height - 20);
            
            this.timer += dt / 1000;
            let progressBarColor = 0xff0000;
            if(receptProgress >= recept[nuvarandeSteg].max){
                progressBarColor = 0x00ff00;
                if (!progressTimer || progressTimer.hasDispatched)
                {
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
            
            graphics.fillStyle(0xffffff).fillRect(1920 - txt.width - 10, 60, txt.width * 1.0, 40);
            graphics.fillStyle(progressBarColor).fillRect(1920 - txt.width - 10, 60, txt.width * receptProgress / recept[nuvarandeSteg].max, 40);
            
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

        // this.scene.pause();
        walla.scale = .5;
        walla.setDepth(-10);
        let speed = 16;

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
                    let slakt = this.character.armL2.getData("hasIngrediens");
                    if(slakt) {
                        this.matter.world.remove(slakt);
                        this.character.armL2.setData("hasIngrediens", false);
                    }
                    leftGrabbing = false;
                }

                if(rTrigger > 0.2 || keyboardInput.space.isDown) {
                    rightGrabbing = true;
                }
                else if (!keyboardInput.space.isDown){
                    let slakt = this.character.armR2.getData("hasIngrediens");
                    if(slakt) {
                        this.matter.world.remove(slakt);
                        this.character.armR2.setData("hasIngrediens", false);
                    }
                    rightGrabbing = false;
                }

                if(Math.abs(lAxisH) > 0.1){
                    this.character.armL2.setVelocityX(speed * lAxisH);
                }
                
                if(Math.abs(lAxisV) > 0.1){
                    this.character.armL2.setVelocityY(speed * lAxisV);
                }

                if(Math.abs(rAxisH) > 0.1){
                    this.character.armR2.setVelocityX(speed * rAxisH);
                }
                
                if(Math.abs(rAxisV) > 0.1){
                    this.character.armR2.setVelocityY(speed * rAxisV);
                }
            }
        }
        else
        {
            leftGrabbing = keyboardInput.shift.isDown;
            rightGrabbing = keyboardInput.space.isDown;

            if (!rightGrabbing)
            {
                let slakt = this.character.armR2.getData("hasIngrediens");
                if(slakt) {
                    this.matter.world.remove(slakt);
                    this.character.armR2.setData("hasIngrediens", false);
                    this.character.armR2.getData("holdIngrediens").setSensor(false).setCollidesWith(1);
                }
            }
            if (!leftGrabbing)
            {
                let slakt = this.character.armL2.getData("hasIngrediens");
                if(slakt) {
                    this.matter.world.remove(slakt);
                    this.character.armL2.setData("hasIngrediens", false);
                    this.character.armL2.getData("holdIngrediens").setSensor(false).setCollidesWith(1);
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
                this.character.armR2.setVelocity(v2.x, v2.y);
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
                this.character.armL2.setVelocity(v2.x, v2.y);
            }
        }
    }
};

game.scene.add('gameScene', gameScene.Boot, true);