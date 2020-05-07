export class Menu {
    title: Phaser.GameObjects.Text;
    footer: Phaser.GameObjects.Text;
    marker: Phaser.GameObjects.Text;    
    items: Array<Phaser.GameObjects.Text>;
    selectedIndex: integer;

    menuStartX: number;
    menuStartY: number;

    titleOffsetX(): number {return -100;}
    titleOffsetY(): number {return -300;}

    footerStartX: number;
    footerStartY: number;

    markerOffsetX(): number {return -100;}
    menuItemDistanceY(): number {return 60;}

    constructor(scene: Phaser.Scene) {        
        this.items = new Array<MenuItem>();
        this.selectedIndex = 0;

        this.menuStartX = scene.game.canvas.width / 4;
        this.menuStartY = scene.game.canvas.height / 2;
        this.footerStartX = scene.game.canvas.width / 4 + this.titleOffsetX();
        this.footerStartY = scene.game.canvas.height - scene.game.canvas.height / 8;
    }

    addMenuItem(scene: Phaser.Scene, text: string) {              
        var temp = new MenuItem({
            scene: scene,
            x: this.menuStartX,
            y: this.menuStartY + this.menuItemDistanceY() * this.items.length,
            text: text,
            style: {
                fontFamily: 'KenneyRocketSquare',
                fontSize: 64,
                align: 'right',            
                color:"rgb(255,255,255)",
            }});
        temp.setStroke('rgb(0,0,0)', 16);

        scene.add.existing(temp);

        this.items.push(temp);
    }

    addMenuComplexItem(scene: Phaser.Scene, text: string, subItems: Array<string>) {
        var temp = new ComplexMenuItem({
            scene: scene,
            x: this.menuStartX,
            y: this.menuStartY + this.menuItemDistanceY() * this.items.length,
            text: text,
            style: {
                fontFamily: 'KenneyRocketSquare',
                fontSize: 64,
                align: 'right',            
                color:"rgb(255,255,255)",
            },
            subItems});
        temp.setStroke('rgb(0,0,0)', 16);

        scene.add.existing(temp);

        this.items.push(temp);
    }

    setTitle(scene: Phaser.Scene, text: string) {
        this.title = scene.add.text(this.menuStartX + this.titleOffsetX(), this.menuStartY + this.titleOffsetY(), text,
        {
            fontFamily: 'KenneyRocketSquare',
            fontSize: 96,
            align: 'center',            
            color:"rgb(255,255,255)",
        });
        this.title.setStroke('rgb(0,0,0)', 16);
    }

    setFooter(scene: Phaser.Scene, text: string) {
        this.footer = scene.add.text(this.footerStartX, this.footerStartY, text,
        {
            fontFamily: 'KenneyRocketSquare',
            fontSize: 32,
            align: 'center',            
            color:"rgb(255,255,255)",
        });
        this.footer.setStroke('rgb(0,0,0)', 16);
    }

    setMarker(scene: Phaser.Scene, text: string) {
        this.marker = scene.add.text(this.menuStartX + this.markerOffsetX(), this.menuStartY, text,
        {
            fontFamily: 'KenneyRocketSquare',
            fontSize: 64,
            align: 'right',            
            color:"rgb(255,255,255)",
        });
        this.marker.setStroke('rgb(0,0,0)', 16);  
    }

    selectNextItem() {
        if(this.selectedIndex < this.items.length - 1)
            this.selectedIndex++;        

        this.marker.setY(this.menuStartY + this.selectedIndex * this.menuItemDistanceY())
    }

    selectPreviousItem() {
        if(this.selectedIndex > 0)
            this.selectedIndex--;        

        this.marker.setY(this.menuStartY + this.selectedIndex * this.menuItemDistanceY())
    }

    trySelectNextSubItem() {
       var temp = this.items[this.selectedIndex];
       if(temp instanceof ComplexMenuItem)
       {
            var item = <ComplexMenuItem>this.items[this.selectedIndex]
            item.selectNextItem();
       }       
    }

    trySelectPreviousSubItem() {
        var temp = this.items[this.selectedIndex];
        if(temp instanceof ComplexMenuItem)
        {
             var item = <ComplexMenuItem>this.items[this.selectedIndex]
             item.selectPreviousItem();
        }   
     }
}

export class MenuItem extends Phaser.GameObjects.Text {
    constructor(params) {
        super(params.scene, params.x, params.y, params.text, params.style);

        this.text = params.text;
    }
}

export class ComplexMenuItem extends Phaser.GameObjects.Text {
    subItems: Array<string>;
    itemTitle: string;
    selectedSubItemIndex: integer;

    constructor(params) {
        super(params.scene, params.x, params.y, params.text, params.style);

        this.itemTitle = params.text;
        this.subItems = params.subItems;
        
        this.selectedSubItemIndex = 0;

        this.refreshText();
    }

    selectNextItem() {
        if(this.selectedSubItemIndex < this.subItems.length - 1)
            this.selectedSubItemIndex++;        

        this.refreshText();
    }

    selectPreviousItem() {
        if(this.selectedSubItemIndex > 0)
            this.selectedSubItemIndex--;        

        this.refreshText();
    }

    private refreshText() {
        this.text = this.itemTitle + ' - ' + this.subItems[this.selectedSubItemIndex];
    }
}