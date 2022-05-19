var pauseScene = {};

pauseScene.Boot = function () {
    this.face = null;
};
pauseScene.Boot.prototype.constructor = pauseScene.Boot;

pauseScene.Boot.prototype = {
    preload: function () {
        this.load.image('enterBtn', 'assets/sprites/ui/enterBtn.png');
        this.load.image('EscBtn', 'assets/sprites/ui/EscBtn.png');
        this.load.image('AButton', 'assets/sprites/ui/AButton.png');
        this.load.image('BButton', 'assets/sprites/ui/BButton.png');
    },
    create: function () {
        p = this;
        this.input.mouse.disableContextMenu();

        this.keyboardInput = {};
        this.keyboardInput.esc =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyboardInput.space =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyboardInput.enter =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.delay = 0;

        this.btnText = this.add.text(1920/2 + 10, 1080/2, 'Return to Game').setFontSize(45).setFontFamily('Comic Sans MS').setOrigin(0, .5).setStroke(0, 4);
        this.btn = this.add.image(1920/2 - 10, 1080/2, 'EscBtn').setOrigin(1, .5);
        this.qbtnText = this.add.text(1920/2 + 10, 1080/2 + 100, 'Quit').setFontSize(45).setFontFamily('Comic Sans MS').setOrigin(0, .5).setStroke(0, 4);
        this.qbtn = this.add.image(1920/2 - 10, 1080/2 + 100, 'enterBtn').setOrigin(1, .5);
        this.btn.setVisible(false);
        this.btnText.setVisible(false);
        this.qbtn.setVisible(false);
        this.qbtnText.setVisible(false);

        this.scene.pause();
    },
    update: function (frame, dt) {
        if (this.input.gamepad.total > 0)
        {
            this.btn.setTexture('BButton');
            this.qbtn.setTexture('AButton');
        }

        this.btn.setVisible(true);
        this.btnText.setVisible(true);
        this.qbtn.setVisible(true);
        this.qbtnText.setVisible(true);

        this.delay += dt;
        if (this.delay <= 50)
        {
            return;
        }

        let back = Phaser.Input.Keyboard.JustDown(this.keyboardInput.esc);
        let quit = Phaser.Input.Keyboard.JustDown(this.keyboardInput.space) || Phaser.Input.Keyboard.JustDown(this.keyboardInput.enter);
        if (this.input.gamepad.total > 0)
        {
            let pad = this.input.gamepad.getPad(0);

            back |= pad.buttons[1].value;
            quit |= pad.buttons[0].value;
        }
        if (back)
        {
            this.scene.resume('gameScene');
            this.scene.pause('pauseScene');
            t.delay = 50;
            this.delay = 0;

            this.btn.setVisible(false);
            this.btnText.setVisible(false);
            this.qbtn.setVisible(false);
            this.qbtnText.setVisible(false);
            return;
        }
        if (quit)
        {
            location.reload();
        }
    }
};

game.scene.add('pauseScene', pauseScene.Boot, true);