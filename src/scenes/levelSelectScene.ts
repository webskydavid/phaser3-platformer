/**
 * @author       Mark Dickinson
 * @copyright    2019 Mark Dickinson
 * @license      none
 */

 /// <reference path="../phaser.d.ts"/>

 import "phaser";
 import { Menu } from "./menu";
 
 export class LevelSelectScene extends Phaser.Scene {

    menu: Menu;

    pauseKey: Phaser.Input.Keyboard.Key;
    selectKey: Phaser.Input.Keyboard.Key;
    cursorUp: Phaser.Input.Keyboard.Key;
    cursorDown: Phaser.Input.Keyboard.Key;

    constructor() {
        super({
            key: "LevelSelectScene"
        });
    }
        
    preload(): void {
        this.load.image('menuSky', './assets/sprites/backgrounds/backgroundEmpty.png');
    }

    create(): void {

        var skySprite = this.add.tileSprite(0, 0, 20480, 1080, 'menuSky');
        skySprite.setX(0);
        skySprite.setY(540);

        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.selectKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursorDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursorUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
       
        this.menu = new Menu(this);

        this.menu.setTitle(this, "Level Select");
        this.menu.setMarker(this, ">>");
        this.menu.addMenuItem(this, "World 01-01");
        this.menu.addMenuItem(this, "World 02-01");
        this.menu.addMenuItem(this, "Exit to Title");
        this.menu.setFooter(this, "©2020 by Mark Dickinson  //  Powered by Phaser 3");
    }

    update(): void {
        if(Phaser.Input.Keyboard.JustDown(this.selectKey))  {
            if(this.menu.selectedIndex == 0) {
                this.input.keyboard.resetKeys();
                this.scene.sleep('LevelSelectScene');
                this.scene.start('MainScene', {id: 0});
                this.scene.start('HudScene');
            }
            if(this.menu.selectedIndex == 1) {
                this.input.keyboard.resetKeys();
                this.scene.sleep('LevelSelectScene');
                this.scene.start('MainScene', {id: 1});
                this.scene.start('HudScene');
            }
            else if(this.menu.selectedIndex == 2) {
                this.input.keyboard.resetKeys();
                this.scene.sleep('TitleScene');
                this.scene.start('LevelSelectScene');
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursorUp)) {
            this.menu.selectPreviousItem();
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursorDown)) {
            this.menu.selectNextItem();
        }
    }
}