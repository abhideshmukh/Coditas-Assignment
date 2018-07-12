import { SortPipe } from '../../pipes/sort/sort';
import { SearchUserProvider } from "../../providers/search-user/search-user";
import { Component } from "@angular/core";
import { LoadingController, NavController } from 'ionic-angular';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  searchString: any;
  filt: any;
  data: any={
    items:[]
  };
  page: any = 1;
  shownGroup:any;
  repos:any = [];
  order:any='login';
  srt:any=true;

  constructor(
    public navCtrl: NavController,
    public searchuser: SearchUserProvider,
    public loadingCtrl: LoadingController
  ) {
    console.log(this.data);
  }
  searchUser(event) {
    if(this.searchString){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    
      this.searchuser.searchUser(this.searchString,this.page,null).subscribe(
        res => {
          console.log(res);
          this.data = res;
          this.page++;
          loading.dismiss();
        },
        err => {
          console.log(err);
          loading.dismiss();
        }
      );
    }
  }

  doInfinite(infiniteScroll) {
    console.log("Begin async operation");
    setTimeout(() => {
      this.searchuser.searchUser(event,this.page,null).subscribe(
        res => {
          console.log(res);
          for(let i=0;i<res.items.length;i++){
            this.data.items.push(res.items[i]);
          }
          console.log(this.data.items);
          this.page++;
        },
        err => {
          console.log(err);
        }
      );
      console.log("Async operation has ended");
      infiniteScroll.complete();
    }, 2000);
  }


  toggleDetails(item){
    if(this.isShownGroup(item)){
      this.shownGroup = null;
    }else{
      this.shownGroup = item;
      this.getRepos(item.repos_url);
    }
  }

  isShownGroup(item){
    return this.shownGroup === item;
  }

  getRepos(url){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.searchuser.getUserDetails(url).subscribe(res=>{
      console.log(res);
      this.repos = res;
      loading.dismiss();
    },err=>{
      console.log(err);
      loading.dismiss();
    })
  }

  getName(url) {
    this.searchuser.getUserDetails(url).subscribe(res => {
      return res;
    },err =>{
      console.log(err);
    });
  }

  filterChanged(){
    if(this.filt="asc"){
      this.order="login";
      this.srt="true"
    }else if(this.filt="desc"){
      this.order="login";
      this.srt="false"      
    }else if(this.filt="scoreasc"){
      this.order="score";
      this.srt="true"
    }else if(this.filt="scoredesc"){
      this.order="score";
      this.srt="false"
    }
  }

}
