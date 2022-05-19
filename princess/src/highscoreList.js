var hsListScene = {};

hsListScene.Boot = function () {
    this.face = null;
};
hsListScene.Boot.prototype.constructor = hsListScene.Boot;

hsListScene.Boot.prototype = {
    preload: function () {
        this.load.image('EscBtn', 'assets/sprites/ui/EscBtn.png');
        this.load.image('BButton', 'assets/sprites/ui/BButton.png');
    },
    create: function () {
        hl = this;
        this.input.mouse.disableContextMenu();
        
        this.keyboardInput = {};
        this.keyboardInput.esc =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyboardInput.space =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyboardInput.enter =   this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.txt = this.add.text(1920/2, 1080/2, "").setOrigin(.5).setFontFamily("Comic Sans MS").setFontSize(52).setStroke(0, 3)
            .setAlign("center");

        this.add.text(1920/2 + 10, 880, 'Back').setFontSize(45).setFontFamily('Comic Sans MS').setOrigin(0, .5).setStroke(0, 4);
        this.btn = this.add.sprite(1920/2 - 10, 880, 'EscBtn').setOrigin(1, .5);

        this.delay = 0;
    },
    update: function (frame, dt) {
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
            this.scene.switch('menuScene');
            this.delay = 0;
        }

        let list = [];
        let val = "Highscores:\n";
        if (localStorage.getItem('marten-hs-list'))
        {
            list = JSON.parse(localStorage.getItem('marten-hs-list')).list;
        }

        list.forEach((l, i) => {
            val += (i + 1).toString() + ". " + l.name + " - " + formatTime(l.score) + "\n";
        });

        this.txt.setText(val);
    }
};

game.scene.add('hsListScene', hsListScene.Boot, false);