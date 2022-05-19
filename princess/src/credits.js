var creditsScene = {};

creditsScene.Boot = function () {
    this.face = null;
};
creditsScene.Boot.prototype.constructor = creditsScene.Boot;

creditsScene.Boot.prototype = {
    preload: function () {
        this.load.image('enterBtn', 'assets/sprites/ui/enterBtn.png');
        this.load.image('EscBtn', 'assets/sprites/ui/EscBtn.png');
        this.load.image('AButton', 'assets/sprites/ui/AButton.png');
        this.load.image('BButton', 'assets/sprites/ui/BButton.png');
        this.load.audio('drottning', [ 'assets/audio/drottningsylt.mp3', 'assets/audio/drottningsylt.ogg' ]);
    },
    create: function () {
        c = this;
        this.input.mouse.disableContextMenu();
        
        this.keyboardInput = {};
        this.keyboardInput.esc =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyboardInput.space =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyboardInput.enter =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.add.text(1920/2, 1080/2, "Credits:\nAxel Melkersson - Lead Slav från Småland\nElia Rönning - Associate Principle Mutare av Utbildare\nSamuel Thorslund - Lead Sabotör av Andra Grupper\nJulian Wojtas - Boss Talent Acquisition Manager Lead Specialist HR Manager Artist\nEdward Blom - Lead Singer, Gastronom & Prinsessexpert\nTeo Silfverhjelm - Lead P-A Ring\nMorgan Waern Waernström - QA")
            .setOrigin(.5).setFontFamily('Comic Sans MS').setStroke(0, 4)
            .setFontSize(40);

        let btnText = this.add.text(1920/2 + 10, 880, 'Back').setFontSize(45).setFontFamily('Comic Sans MS').setOrigin(0, .5).setStroke(0, 4);
        this.btn = this.add.sprite(1920/2 - 10, 880, 'EscBtn').setOrigin(1, .5);

        this.delay = 0;

        this.music = this.sound.add('drottning', { loop: true }).setVolume(.3);
    },
    update: function (frame, dt) {
        if (!this.music.isPlaying)
        {
            this.music.play();
        }

        this.delay += dt;
        if (this.delay <= 50)
        {
            return;
        }

        let back = Phaser.Input.Keyboard.JustDown(this.keyboardInput.esc);
        if (this.input.gamepad.total > 0)
        {
            let pad = this.input.gamepad.getPad(0);

            back |= pad.buttons[1].value;

            this.btn.setTexture('BButton');
        }
        else
        {
            this.btn.setTexture('EscBtn');
        }
        if (back)
        {
            this.music.stop();
            this.scene.switch('menuScene');
            this.delay = 0;
        }
    }
};

game.scene.add('creditsScene', creditsScene.Boot, false);