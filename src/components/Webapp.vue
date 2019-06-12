<template>
<div class="col-md-6 offset-3" v-if="!login">
 <div class="card">
 <div class="card-body">
 <h5 class="card-title">Enter your email</h5>
 <input type="text" v-model="email">
 <button class="btn btn-outline-primary" @click="validateEmail">Enter</button>
 <span v-if="error"><div class="alert alert-danger">Please enter a vaild email</div></span>
 </div>
 </div>
 </div>


 <div class="row" v-else>
 <div class="col-md-12">
 <button>View my collection lists</button>
 </div>
  <div class="col-md-12">
    <div class="col-md-6 mx-auto">
 <input type="text" v-model="search" placeholder="search restaurant title">
 </div>
 </div>
 <div class="col-md-6">
 <h2>Restaurant List</h2>
 <div class="table-responsive">
 <table class="table table-hover">
 <thead>
   <tr>
     <th scope="col">Restaurant</th>
     <th scope="col">Hours</th>
     <th scope="col"></th>
   </tr>
 </thead>
 <tbody>
   <tr v-for="(restaurant, index) in filterRestaurant">
     <td>{{restaurant.restaurant}}</td>
     <td>{{restaurant.hours}}</td>
     <td @click="add(index)"><button>Add to collection</button></td>
   </tr>
   </tbody>
 </table>
 </div>
 </div>

  <div class="col-md-6">
  <h2>Collection List</h2>
 <div class="table-responsive">
 <table class="table table-hover">
 <thead>
   <tr>
     <th scope="col">Restaurant</th>
     <th scope="col">Hours</th>
     <th scope="col"></th>
   </tr>
 </thead>
 <tbody>
   <tr v-for="(restaurant, index) in collection">
     <td>{{restaurant.restaurant}}</td>
     <td>{{restaurant.hours}}</td>
     <td @click="deleteRes(index)"><button>Delete</button></td>
   </tr>
   </tbody>
 </table>
 </div>
 <input type="text" placeholder="Collection Name" v-model="collectionName"><button @click="saveCollection">Save Collection</button>
 </div>
 </div>



</template>

<script>
import ApiService from '@/services/ApiService'

export default {
  name: 'Webapp',
  data () {
    return {
      email: '',
      error: false,
      login: false,
      restaurants:[],
      collection:[],
      collectionName: null,
      search: null,
      searchHours: null,
    }
  },created(){
    this.getRestaurant()
  },
  methods:{
    validateEmail(){
      if (!this.validEmail(this.email)) {
        this.error = true;
        return false;
      	}else{
          this.error = false;
          this.login = true;
          this.$emailStore = this.email;
        }
    },
     validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
     },
     async getRestaurant(){
       const response =await ApiService.fetchRestaurant()
       let resArr = [];
       response.data.restaurant.forEach(function(data){
         resArr.push({id: data._id, restaurant: data.restaurent, hours: data.hours});
       });
       this.restaurants = resArr;
     },
     add(arrayIndex){
       this.collection.push(this.restaurants[arrayIndex]);
       this.restaurants.splice(arrayIndex, 1);
     },
     deleteRes(arrayIndex){
       this.restaurants.push(this.collection[arrayIndex]);
       this.collection.splice(arrayIndex, 1);
     },async saveCollection(){
       if(this.collectionName == null || this.collection.length < 1){
         alert('Please input collection name and insert collection');
         return false;
       }
       const response =await ApiService.saveCollection(this.email, this.collectionName, this.collection);
       alert('collection saved');
         this.collection = [];
     }
  },computed:{
    filterRestaurant(){
      if(this.search != null){
          return this.restaurants.filter(restaurant => {
          let name = restaurant.restaurant;
          return name.toLowerCase().includes(this.search.toLowerCase())
          })
      }else{
        return this.restaurants;
      }
    },
  }
}
</script>

