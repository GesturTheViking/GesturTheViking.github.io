var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1920,
        height: 1080,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    input: {
        gamepad: true
    },
    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 2
            }
        }
    },
    audio: {
        disableWebAudio: true
    },
    title: "Stora Prinsessbaket",
    url: location.href,
    version: '1.0',
    banner: {
        hidePhaser: true,
        text: '#ffffff',
        background: '#000000'
    },
    transparent: true
};

var game = new Phaser.Game(config);