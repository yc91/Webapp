import Api from '@/services/Api'

export default{
    fetchRestaurant(){
        return Api().get('restaurant')
    },
    saveCollection(email, name, data){
        return Api().post('save', {email: email, name: name, data: data})
    }
}