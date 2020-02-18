
interface CarouselItem {
  image: string, //url
  name: string,
  url?: string,
  width?: number,
  height?: number,
  property_enum?: Enumerator
}
interface Dimension {
  width?: number,
  height?: number
}

class Carousel {

    defaultImages =  [
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/luke.png',  name:'item0'},
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/chubaka.png', name:'item1'},
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/boba.png',  name:'item2'},
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/c3po.png', name:'item3'},
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/leia.png', name:'item4'},
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/obi.png', name:'item5'},
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/r2d2.png', name:'item6'},
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/storm.png', name:'item7'},
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/varder.png', name:'item8'},
      { image: 'https://ngx-drag-scroll.fanjin.io/assets/img/yoda.png', name:'item9'},
    ]

    startIndex:number;
    endIndex:number;
    activityArray:CarouselItem[];
     constructor(private itemNumber:number, private carouselItems?: Array<CarouselItem> ){

      // Initialise default images if no array of objects passed
       if(!this.carouselItems) {this.carouselItems = this.defaultImages;}
       console.log("carouselItems => ", this.carouselItems.slice(0,4));

      // default if the itemNumber wasn't supplied
      if(!this.itemNumber )
      { this.itemNumber = 4; }
      // if the number of objects is too few, then set the activity array to that number
      if(this.carouselItems.length < 5)
      { this.itemNumber = this.carouselItems.length; }
      // any number set larger than 4 will default the activity array to a size of 4
      if( this.itemNumber < 4)
      { this.activityArray = Array(this.itemNumber); } else {
        this.activityArray = Array(4);
      }
      // This map is only necessary for a certain project at work
      // // if the first default image is absent then map user provide images
      // if(this.carouselItems[0].image != 'https://ngx-drag-scroll.fanjin.io/assets/img/luke.png') {
      //   this.carouselItems =
      //   this.carouselItems.map((value)=>{
      //     return {...value, image:''}
      //   });
      // }
      // setting indexes and activityArray
      this.startIndex = 0;
      this.endIndex = this.activityArray.length;
      this.activityArray = this.carouselItems.slice(this.startIndex,this.endIndex);

     }

     next(){
      console.log("Next! ");
      if(this.startIndex >= 0 &&
         this.endIndex <= this.carouselItems.length &&
         ( this.endIndex - this.startIndex) == this.activityArray.length ) {
           this.startIndex += 1;
           this.endIndex += 1;
           this.activityArray = this.carouselItems.slice(this.startIndex,this.endIndex);
         }
     }
     previous(){
       console.log("Previous!");
       if( this.startIndex >= 1 ) {
          this.startIndex -= 1;
          this.endIndex -= 1;
          this.activityArray = this.carouselItems.slice(this.startIndex,this.endIndex);
        }
    }



    // ACCESSORS

    //  GETTER METHODS : single value
    public getName(index:number=0): string {
      return this.carouselItems[index].name;
    }
    public getImage(index:number=0): string {
      return this.carouselItems[index].image;
    }
    public getWidth(index:number=0): number {
      return this.carouselItems[index].width;
    }
    public getHeight(index:number=0): number {
      return this.carouselItems[index].height;
    }
    //  GETTER METHODS : array value
    public getAllNames(): string[] {
      return this.carouselItems.map( item => { return item.name}) ;
    }
    public getAllImages(): string[] {
      return this.carouselItems.map( item => { return item.image}) ;
    }
    public getDimensions(index:number=0): number[] {
      return [this.carouselItems[index].width, this.carouselItems[index].height];
    }
    public getAllDimensions(): Dimension[] {
      return this.carouselItems.map( (dimension) => {  return { height: dimension.height, width: dimension.width} });;
    }
    // SETTER METHODS: single value
    public setName(newName:string, index:number) {
      this.carouselItems[index].name = newName;
    }
    public setImage(newImage:string, index:number) {
      this.carouselItems[index].image = newImage;
    }
    public setWidth(newWidth:number, index:number) {
      this.carouselItems[index].width = newWidth;
    }
    public setHeight(newHeight:number, index:number){
      this.carouselItems[index].height = newHeight;
    }
    public setDimension( newDimension:Dimension, index:number){
      this.carouselItems[index].height = newDimension.height;
      this.carouselItems[index].width = newDimension.width;
    }

  }

((window, document)=>{

  window.onload = init;
  let next= ()=>{};
  let previous = ()=>{};
  function init(){
    let myImages:Array<CarouselItem> = [
      {image:'images/AlphaOasis_MemberManager.jpg', name:'alpha', url:'https://github.com/timi95/AlphaOasis-MemberManager/tree/Electronic'},
      {image:'images/safe-transaction.jpg', name:'safetransaction', url:'http://safetransaction.ng'},
      // {image:'https://www.youtube.com/embed/n7wcPsIFHKo', name:'netlogo'},
      {image:'https://www.youtube.com/embed/e80d21NjF_8', name:'motion_detection'},
    ]
    // the code to be called when the dom has loaded
    // #document has its nodes
    let carouselObject = new Carousel(2, myImages);
     next = ()=>carouselObject.next();
     previous = ()=>carouselObject.previous();
    let cfc = document.getElementById("carousel");
    let array_string:string='';
    console.log(cfc);
    carouselObject.activityArray.forEach((_element)=>{
      if(_element.url){
        array_string +='<a href='+_element.url+' target="_blank">'+
                      '<object style="height:250px; width:350px; margin:0 10px;" data='+_element.image+'></object>'+
                      ' </a>';
      }else{
        array_string +='<object style="height:250px; width:350px; margin:0 10px;" data='+_element.image+'></object>';
      }
    });
    cfc.innerHTML = array_string;

  }

})(window, document);
