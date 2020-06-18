import { LoadingScene } from "./loadingScene";
import { MainScene } from "./mainScene";
import { MenuBackgroundScene } from "./menuBackgroundScene";
import { PauseScene } from "./pauseScene";
import { TitleScene } from "./titleScene";
import { LevelSelectScene } from "./levelSelectScene";
import { HudScene } from "./hudScene";

export class SceneController extends Phaser.Scene {

    titleScene: TitleScene;
    levelSelectScene: LevelSelectScene;
    loadingScene: LoadingScene;
    mainScene: MainScene;
    menuBackgroundScene: MenuBackgroundScene;
    pauseScene: PauseScene;
    hudScene: HudScene;

    constructor() {
        super({
            key: "SceneManager"
        })
    }

    init(data): void {
        console.log(data.id);        
    }

    preload(): void {        

    }

    create() {

        this.titleScene = new TitleScene(this);
        this.game.scene.add("TitleScene", this.titleScene);
        
        this.menuBackgroundScene = new MenuBackgroundScene(this);
        this.game.scene.add("MenuBackgroundScene", this.menuBackgroundScene);
                
        this.levelSelectScene = new LevelSelectScene(this);
        this.game.scene.add("LevelSelectScene", this.levelSelectScene);

        this.loadingScene = new LoadingScene(this);
        this.game.scene.add("LoadingScene", this.loadingScene);

        this.mainScene = new MainScene(this);
        this.game.scene.add("MainScene", this.mainScene);

        this.pauseScene = new PauseScene(this);
        this.game.scene.add("PauseScene", this.pauseScene);

        this.hudScene = new HudScene(this);
        this.game.scene.add("HudScene", this.hudScene);        

        this.loadTitleScene();        
    }

    update(): void {

    }

    loadTitleScene() {
        this.scene.launch("TitleScene");
        this.scene.launch("MenuBackgroundScene");
    }

    returnToTitleSceneFromLevelSelect() {
        this.scene.sleep('LevelSelectScene');
        this.scene.start('TitleScene');
        this.scene.start('MenuBackgroundScene');
    }

    preloadGameAndDisplayLoadingScene(levelId: number) {
        this.scene.sleep('TitleScene');                
        this.scene.sleep('MenuBackgroundScene'); 
        this.scene.start('MainScene', { id: 0, worldName: 'world-04-02' });
        this.scene.start('HudScene');
        this.scene.start('LoadingScene');
    }

    loadLevelSelectScene() {
        this.scene.sleep('TitleScene');                
        this.scene.start('LevelSelectScene');
    }

    loadMainScene() {
        this.scene.stop("LoadingScene");

        this.scene.bringToTop("HudScene");
        this.scene.setVisible(true, "HudScene");
        
        this.scene.resume('MainScene');        
        this.scene.setVisible(true, "MainScene");
    }

    pauseGame() {
        this.scene.pause('MainScene');            
        this.scene.pause('HudScene');
        this.scene.setVisible(false, "HudScene");
        this.sound.pauseAll();

        this.scene.run("PauseScene");
        this.scene.bringToTop("PauseScene")
    }

    returnToGame() {
        this.scene.sleep('PauseScene');   
        this.scene.wake('MainScene');               
        this.scene.setVisible(true, 'HudScene');
    }

    returnToTitleScene() {
        this.scene.stop('MainScene');
        this.scene.stop('HudScene');
        this.scene.sleep('PauseScene');
        this.scene.switch('TitleScene');      
        this.scene.launch('MenuBackgroundScene');
    }
}