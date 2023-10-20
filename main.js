// init variable
let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let count = document.getElementById('count')
let category = document.getElementById('category')
let btnSubmit = document.getElementById('btn-submit')
let search = document.getElementById('search')
let btnTitle = document.getElementById('btn-title')
let btnCategory = document.getElementById('btn-category')
let total = document.getElementById('total')
let btnAll = document.getElementById('btn-All')
let tbody = document.getElementById('tbody')
let Alert = document.getElementById("alert")
let alertErorr = document.getElementById("erorr")

let mode ="create"
let serMode ="title"
let temp ;

//cancel alert btn 
function cancelAlert(){
    Alert.style.display="none"
}

function showAlert(msg){
    Alert.style.display="flex"
    alertErorr.innerHTML=msg
}
// get data from localStorage
var data ;
if(localStorage.products != null){
   data=[...JSON.parse(localStorage.products)]
   
}else{
   data =[]
}

// get Total function 
 function getTotal (){
    if(price.value != ""){
        total.innerHTML=(+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.backgroundColor ="green"
    }else{
        total.style.backgroundColor="darksalmon"
        total.innerHTML=0
    }
 }

//  add Product function 
function addProduct(){
    // init object
    let newPro ={
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        category:category.value,
        total:total.innerHTML
    }


    let counter = 0;
    count.value === "" ? counter = 1 : counter = +count.value
  
    count.style.display="block"

    if(title.value == "" || price.value == "" || taxes.value == "" || ads.value=="" || category.value =="" ){
        showAlert("please Enter All inputs")
    }else{
        if(mode==="create"){
            if(counter >100 || counter <0 ){
                showAlert("please enter the count range between 0 and 100")
            }else{
                for(let i=0 ; i< +counter;i++){
                    data.push(newPro)
                }
                localStorage.setItem("products",JSON.stringify(data))
                cleanInputs()   

            }
        }
        else{
            data[temp]=newPro
            mode="create"
            btnSubmit.innerHTML=mode
            total.style.backgroundColor="red"
            total.innerHTML=0
            cleanInputs()

        }
    }
   
    showProducts()
}

//  clean input function 
function cleanInputs(){
    title.value=""
    price.value=""
    taxes.value=""
    ads.value=""
    discount.value=""
    category.value=""
    count.value=""
    total.value=""
}

//  show products function 
function showProducts(){
    let table =''
    for(let i=0 ; i< data.length;i++)
        table+=AddTableItem(data[i],i)

    tbody.innerHTML=table
    
    if(data.length >0){
        btnAll.innerHTML=`delete All (${data.length}) `
        btnAll.style.display="block"

    }else{
        btnAll.style.display="none"
    }
   
}
showProducts()

// this fun make one row in table
function AddTableItem (item,i){
    let table ;

    table=`
    <tr>
        <td>${i}</td>
        <td>${item.title}</td>
        <td>${item.price}</td>
        <td>${item.taxes}</td>
        <td>${item.ads}</td>
        <td>${item.discount}</td>
        <td>${item.category}</td>
        <td>${item.total}</td>
        <td>
            <button onClick="update(${i})">update</button>
        </td>
        <td>
            <button onClick="deleteProduct(${i})">
                delete
            </button>
        </td>
    </tr>
`
return table
}

//  deleteProduct function 
function deleteProduct(index){
    data.splice(index,1)
    localStorage.setItem("products",JSON.stringify(data))
    showProducts()
}

//  deleteAllProduct function 
function deleteAllProduct(){
    data.splice(0)
    localStorage.clear()
    showProducts()
}

//  update function 
function update (i){
    title.value=data[i].title
    price.value=data[i].price
    taxes.value=data[i].taxes
    ads.value=data[i].ads
    discount.value=data[i].discount
    category.value=data[i].category
    total.value=data[i].total
    getTotal()
    mode="Update"
    count.style.display="none"
    temp=i;
    btnSubmit.innerHTML=mode
    window.scroll({
        top:0,
        behavior:"smooth"
    })

}

// function searchBtn
function searchBtn(id){

    id === "btn-title" ? serMode="title" : (serMode="category" , search.value="")
    search.placeholder=`search by ${serMode}`
}

// function search
function searchF(){

    let table=''
    if(serMode=="title"){
        for(let i=0;i<data.length;i++){
            if(data[i].title.includes(search.value))
            table+=AddTableItem(data[i],i)
        }
    }else{
        for(let i=0;i<data.length;i++){
            if(data[i].category.includes(search.value))
            table+=AddTableItem(data[i],i)            
        }
    }

    tbody.innerHTML=table

}


