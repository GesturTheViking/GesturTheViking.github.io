var hsAddScene = {};

hsAddScene.Boot = function () {
    this.face = null;
};
hsAddScene.Boot.prototype.constructor = hsAddScene.Boot;

hsAddScene.Boot.prototype = {
    preload: function () {
        this.load.image('enterBtn', 'assets/sprites/ui/enterBtn.png');
        this.load.image('EscBtn', 'assets/sprites/ui/EscBtn.png');
        this.load.image('AButton', 'assets/sprites/ui/AButton.png');
        this.load.image('BButton', 'assets/sprites/ui/BButton.png');
        this.load.image('playButton', 'assets/sprites/ui/playButton.png');
    },
    create: function () {
        ha = this;
        this.input.mouse.disableContextMenu();
        
        this.keyboardInput = {};
        this.keyboardInput.esc =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyboardInput.space =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyboardInput.enter =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.keyboardInput.cursors = this.input.keyboard.createCursorKeys();

        this.delay = 0;

        document.body.style.background = 'url("assets/sprites/ui/bg.png")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundColor = "black";

        this.add.text(1920/2, 100, "Skriv ditt namn").setOrigin(.5).setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3).setAlign("center");

        this.marker = this.add.text(1920/2 + 10, 300, "|").setOrigin(.5).setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3).setAlign("center");
        this.field = this.add.text(1920/2, 300, "").setOrigin(.5, .5).setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3).setAlign("center");

        this.tt = 0;

        this.input.keyboard.on('keydown', (e) => {
            if (this.field.text.length >= 16)
            {
                return;
            }

            let code = e.keyCode;

            if (code >= Phaser.Input.Keyboard.KeyCodes.A && code <= Phaser.Input.Keyboard.KeyCodes.Z)
            {
                this.field.setText(this.field.text += String.fromCharCode(code)).setAlign("center");
            }
        }, this);
        this.input.keyboard.on('keydown_BACKSPACE', () => {
            if (this.field.text.length)
            {
                this.field.setText(this.field.text.substr(0, this.field.text.length - 1));
            }
        }, this);

        this.keys = [];
        this.keySelected = 0;
        for (let i = Phaser.Input.Keyboard.KeyCodes.A; i <= Phaser.Input.Keyboard.KeyCodes.Z; ++i)
        {
            this.keys.push(this.add.text(300 + (i - Phaser.Input.Keyboard.KeyCodes.A) * 50, 1080/2, String.fromCharCode(i))
            .setOrigin(.5, .5).setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3).setAlign("center"));
        }

        this.lastLeft = false;
        this.lastRight = false;
        this.lastSelect = false;
        this.lastBS = false;

        this.escBtn = this.add.image(1920/2 - 10, 1080 - 100, "EscBtn").setOrigin(1, .5).setVisible(true);
        this.escBtnText = this.add.text(1920/2 + 10, 1080 - 100, "Done")
            .setOrigin(0, .5).setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3).setAlign("center").setVisible(true);

        this.ABtn = this.add.image(1920/4 + 150, 1080-100, "AButton").setOrigin(0, .5).setVisible(false);
        this.ABtnTxt = this.add.text(1920/4 + 150 + 10 + this.ABtn.width, 1080-100, "Type").setOrigin(0, .5)
            .setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3).setAlign("center").setVisible(false);

        this.BBtn = this.add.image(this.ABtnTxt.x + this.ABtnTxt.width + 20, 1080-100, "BButton").setOrigin(0, .5).setVisible(false);
        this.BBtnTxt = this.add.text(this.BBtn.x + this.BBtn.width + 10, 1080-100, "Backspace").setOrigin(0, .5)
            .setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3).setAlign("center").setVisible(false);

        this.BBtn = this.add.image(this.ABtnTxt.x + this.ABtnTxt.width + 20, 1080-100, "BButton").setOrigin(0, .5).setVisible(false);
        this.BBtnTxt = this.add.text(this.BBtn.x + this.BBtn.width + 10, 1080-100, "Backspace").setOrigin(0, .5)
            .setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3).setAlign("center").setVisible(false);

        this.playBtn = this.add.image(this.BBtnTxt.x + this.BBtnTxt.width + 20, 1080-100, "playButton").setOrigin(0, .5).setVisible(false);
        this.playBtnTxt = this.add.text(this.playBtn.x + this.playBtn.width + 10, 1080-100, "Done").setOrigin(0, .5)
            .setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3).setAlign("center").setVisible(false);

        happyMusic.play();
    },
    update: function (frame, dt) {
        if (this.input.gamepad.total > 0)
        {
            this.escBtn.setVisible(false);
            this.escBtnText.setVisible(false);
            this.ABtn.setVisible(true);
            this.ABtnTxt.setVisible(true);
            this.BBtn.setVisible(true);
            this.BBtnTxt.setVisible(true);
            this.BBtn.setVisible(true);
            this.BBtnTxt.setVisible(true);
            this.playBtn.setVisible(true);
            this.playBtnTxt.setVisible(true);
        }
        else
        {
            this.escBtn.setVisible(true);
            this.escBtnText.setVisible(true);
            this.ABtn.setVisible(false);
            this.ABtnTxt.setVisible(false);
            this.BBtn.setVisible(false);
            this.BBtnTxt.setVisible(false);
            this.BBtn.setVisible(false);
            this.BBtnTxt.setVisible(false);
            this.playBtn.setVisible(false);
            this.playBtnTxt.setVisible(false);
        }

        this.tt += dt / 1000;

        this.marker.setAlpha(Math.abs(Math.sin(this.tt * 3))).setX(this.field.x + (this.field.width/2) + 10);

        this.keys.forEach((o, i) => {
            if (i == this.keySelected)
            {
                o.setColor("red").setFontSize(72);
            }
            else
            {
                o.setColor("white").setFontSize(52);
            }
        }, this);

        let rightDown = Phaser.Input.Keyboard.JustDown(this.keyboardInput.cursors.right);
        let leftDown = Phaser.Input.Keyboard.JustDown(this.keyboardInput.cursors.left);
        let selectDown = Phaser.Input.Keyboard.JustDown(this.keyboardInput.enter);
        let done = Phaser.Input.Keyboard.JustDown(this.keyboardInput.esc);

        if (this.input.gamepad.total > 0)
        {
            let pad = this.input.gamepad.getPad(0);

            if (pad.buttons[14].pressed && !this.lastLeft)
            {
                leftDown = true;
            }
            this.lastLeft = pad.buttons[14].pressed;
            if (pad.buttons[15].pressed && !this.lastRight)
            {
                rightDown = true;
            }
            this.lastRight = pad.buttons[15].pressed;
            if (pad.buttons[0].pressed && !this.lastSelect)
            {
                selectDown = true;
            }
            this.lastSelect = pad.buttons[0].pressed;
            if (pad.buttons[1].pressed && !this.lastBS)
            {
                if (this.field.text.length)
                {
                    this.field.setText(this.field.text.substr(0, this.field.text.length - 1));
                }
            }
            this.lastBS = pad.buttons[1].pressed;
            if (pad.buttons[9].pressed)
            {
                done = true;
            }
        }

        if (rightDown)
        {
            this.keySelected = (this.keySelected + 1) % this.keys.length;
        }
        if (leftDown)
        {
            this.keySelected = this.keySelected - 1;
            if (this.keySelected < 0)
            {
                this.keySelected = this.keys.length - 1;
            }
        }
        if (selectDown & this.field.text.length < 16)
        {
            this.field.setText(this.field.text + String.fromCharCode(this.keySelected + Phaser.Input.Keyboard.KeyCodes.A));
        }
        if (done)
        {
            let data = {};
            if (localStorage.getItem('marten-hs-list'))
            {
                data = JSON.parse(localStorage.getItem('marten-hs-list'));
            }
            else
            {
                data.list = [];
            }

            data.list.push({ name: this.field.text, score: score });

            data.list.sort((a, b) => { return a.score - b.score; });

            data.list = data.list.slice(0, 10);

            localStorage.setItem('marten-hs-list', JSON.stringify(data));

            this.scene.switch('hsListScene');
        }
    }
};

game.scene.add('hsAddScene', hsAddScene.Boot, false);