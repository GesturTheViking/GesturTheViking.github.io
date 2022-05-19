var menuScene = {};

menuScene.Boot = function () {
    this.face = null;
};
menuScene.Boot.prototype.constructor = menuScene.Boot;

menuScene.Boot.prototype = {
    preload: function () {
        this.load.image("credits", "assets/sprites/ui/credits.png");
        this.load.image("Logo", "assets/sprites/ui/Logo.png");
        this.load.image("playBtn", "assets/sprites/ui/playBtn.png");
        this.load.image("hs", "assets/sprites/ui/highscore.png");

        this.load.audio('theme', [ 'assets/audio/menu.ogg', 'assets/audio/menu.mp3' ]);
    },
    create: function () {
        document.body.style.background = 'url("assets/sprites/ui/bg.png")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundColor = "black";

        m = this;
        this.input.mouse.disableContextMenu();
        
        this.keyboardInput = {};
        this.keyboardInput.cursors = this.input.keyboard.createCursorKeys();
        this.keyboardInput.shift =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);
        this.keyboardInput.w =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyboardInput.a =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyboardInput.s =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyboardInput.d =       this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyboardInput.space =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyboardInput.enter =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.add.image(1920/2, 1080/3, "Logo");

        this.buttons = [];
        this.buttons.push(this.add.image(1920/2, 1080/2 + 200, "playBtn").setScale(1.2));
        this.buttons.push(this.add.image(1920/2, 1080/2 + 300, "credits"));
        this.buttons.push(this.add.image(1920/2, 1080/2 + 400, "hs"));

        this.selected = 0;
        this.dosDelay = 0;

        this.delay = 0;

        this.theme = this.sound.add('theme', { loop: true }).setVolume(.2).play();
    },
    update: function (frame, dt) {
        this.delay += dt;
        if (this.delay <= 250)
        {
            return;
        }

        this.dosDelay -= dt / 1000;

        this.buttons.forEach((obj, i) =>
        {
            if (i == this.selected)
            {
                obj.setScale(1.2);
            }
            else
            {
                obj.setScale(1);
            }
        }, this);

        if (Phaser.Input.Keyboard.JustDown(this.keyboardInput.cursors.down))
        {
            this.selected = Phaser.Math.Clamp(this.selected + 1, 0, this.buttons.length - 1);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keyboardInput.cursors.up))
        {
            this.selected = Phaser.Math.Clamp(this.selected - 1, 0, this.buttons.length - 1);
        }

        let selectDown = Phaser.Input.Keyboard.JustDown(this.keyboardInput.space) || Phaser.Input.Keyboard.JustDown(this.keyboardInput.enter);
        if (this.input.gamepad.total > 0 && this.dosDelay <= 0)
        {
            let pad = this.input.gamepad.getPad(0);

            let up = pad.buttons[12].value, down = pad.buttons[13].value;
            if (pad.axes.length)
            {
                up |= pad.axes[1].getValue() < -.5;
                down |= pad.axes[1].getValue() > .5;
            }
            if (up)
            {
                this.selected = Phaser.Math.Clamp(this.selected - 1, 0, this.buttons.length - 1);
                this.dosDelay = .2;
            }
            if (down)
            {
                this.selected = Phaser.Math.Clamp(this.selected + 1, 0, this.buttons.length - 1);
                this.dosDelay = .2;
            }

            selectDown |= pad.buttons[0].value;
        }

        if (selectDown)
        {
            switch (this.selected)
            {
                case 0: this.scene.switch('gameScene'); break;
                case 1: this.scene.switch('creditsScene'); this.delay = 0;break;
                case 2: this.scene.switch('hsListScene'); this.delay = 0;break;
            }
        }
    }
};

game.scene.add('menuScene', menuScene.Boot, true);