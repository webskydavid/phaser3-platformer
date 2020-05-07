/**
 * @author       Mark Dickinson
 * @copyright    2019 Mark Dickinson
 * @license      none
 */

 /// <reference path="../phaser.d.ts"/>

 import "phaser";
 import { Player } from "../player";
 import { Constants } from "../constants";
 import { Menu } from "./menu";
 
 export class PauseScene extends Phaser.Scene {

    // HUD
    menu: Menu;

    //cursors: Phaser.Input.Keyboard.CursorKeys;     
    pauseKey: Phaser.Input.Keyboard.Key;
    selectKey: Phaser.Input.Keyboard.Key;
    cursorUp: Phaser.Input.Keyboard.Key;
    cursorDown: Phaser.Input.Keyboard.Key;
    cursorLeft: Phaser.Input.Keyboard.Key;
    cursorRight: Phaser.Input.Keyboard.Key;

    constructor() {
        super({
            key: "PauseScene"
        });
    }
        
    preload(): void {

    }

    create(): void {
        
        this.pauseKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.selectKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        this.cursorDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.cursorUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.cursorLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.cursorRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        this.menu = new Menu(this);

        this.menu.setTitle(this, "Game Paused");
        this.menu.setMarker(this, ">>");
        this.menu.addMenuItem(this, "Resume");
        //this.menu.addMenuItem(this, "Toggle Sound - On");
        this.menu.addMenuComplexItem(this, "Toggle Sound", ['On', 'Off']);
        this.menu.addMenuItem(this, "Exit to Title");     
        
        this.scene.bringToTop;
    }

    update(): void {
        if(Phaser.Input.Keyboard.JustDown(this.pauseKey)) {
            this.returnToGame();
        }

        if(Phaser.Input.Keyboard.JustDown(this.selectKey)) {

            if(this.menu.selectedIndex == 0) {
               this.returnToGame();
            }
            else if(this.menu.selectedIndex == 1) {
                this.menu.trySelectNextSubItem();
            }
            else if(this.menu.selectedIndex == 2) {
                this.endGameAndReturnToTitleMenu();
            }
        }
         
        if(Phaser.Input.Keyboard.JustDown(this.cursorUp)) {
            this.menu.selectPreviousItem();
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursorDown)) {
            this.menu.selectNextItem();
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursorLeft)) {
            this.menu.trySelectPreviousSubItem();
        }

        if(Phaser.Input.Keyboard.JustDown(this.cursorRight)) {
            this.menu.trySelectNextSubItem();
        }
    }

    returnToGame(): void {        
        this.scene.switch('MainScene');            
        this.scene.setVisible(true, 'HudScene');
    }   

    endGameAndReturnToTitleMenu(): void {        
        this.scene.remove('MainScene');
        this.scene.remove('HudScene');
        this.scene.switch('TitleScene');        
    }   
 }
