const cl = console.log;
const postcontainer = document.getElementById("postcontainer");
const postForm = document.getElementById("postForm");
const titleConrol = document.getElementById("title");
const bodyConrol = document.getElementById("body");
const userIdConrol = document.getElementById("userId");
const updatebtn = document.getElementById("updatebtn");
const submitbtn = document.getElementById("submitbtn");
const lader = document.getElementById("lader");




 let baseUrl =` https://jsonplaceholder.typicode.com`


 let postsUrl = `${baseUrl}/posts`

 let postsArray = [];


//XMLHttpRequest >> constructor function >> to create object  to diff refance is constructr func 

// ************  1. create a instance/ object XMLHttpRequest

// POST 
// GET
// PUT/PATCH
// DELETE
let onEdit=(ele)=>{
    lader.classList.remove("d-none");
cl(ele)
let newid= ele.closest(".card").id;
cl(newid)
localStorage.setItem(`editid`,newid);
let objurl1=`${baseUrl}/posts/${newid}`;
window.scrollTo(0,0)
  cl(objurl1)
  AllApicall("GET",objurl1);
  lader.classList.add("d-none");
  
};
let onDelet=(del)=>{
   // cl(del);
   let delid= del.closest(".card").id;
   let delurl=`${postsUrl}/${delid}`;
   cl(delurl)
   AllApicall("DELETE",delurl);

};

const templating = (arr) =>{
    let result = ``;
    arr.forEach(post => {
        result +=`
                        <div class="card mb-4" id="${post.id}">
                      <div class="card-header">
                      <h2>${post.title}</h2>
                          </div>
                      <div class="card-body">
                      <p>
                        ${post.body}
                          </p>
                            </div>
                        <div class="card-footer d-flex justify-content-between">
                       <button class="btn btn-primary" onclick="onEdit(this)">
                           Edit
                          </button>
                          <button class="btn btn-danger" onclick="onDelet(this)">
                          Delete
                          </button>
                      </div>
                   </div>
        `        
    });
    postcontainer.innerHTML = result;
};

let createfun=(ele)=>{
 let card=document.createElement(`div`);
 card.className="card";
 card.id=ele.id;
 card.innerHTML=` 
 <div class="card-header">
 <h2>${datafromdb.title}</h2>
     </div>
 <div class="card-body">
 <p>
   ${datafromdb.body}
     </p>
       </div>
   <div class="card-footer d-flex justify-content-between">
  <button class="btn btn-primary" onclick="onEdit(this)">
      Edit
     </button>
     <button class="btn btn-danger" onclick="onDelet(this)">
     Delete
     </button>
 </div>
</div>0p
 `;
 postcontainer.append(card);
 postForm.reset;
}
 const onsubmitPost = (eve) => {
        eve.preventDefault();
        let newPost = {
            title: titleConrol.value,
            body: bodyConrol .value,
            userId: userIdConrol.value
        }

        cl(newPost);
        AllApicall("POST",postsUrl,newPost);

         }
let onupdate=()=>{
let updobj= {
    title:titleConrol.value,
    body:bodyConrol.value,
    userId:userIdConrol.value,
}
cl(updobj)
let updid=localStorage.getItem("editid");
cl(updid)
let updurl=`${postsUrl}/${updid}`
cl(updurl)
AllApicall("PUT",updurl,updobj)
submitbtn.reset()
            }
let AllApicall=(method,apiurl,datafromdb=null)=>{
    lader.classList.remove("d-none");
let xhr=new XMLHttpRequest();
xhr.open(method,apiurl,true);
xhr.send(JSON.stringify(datafromdb));//data from database
xhr.onload= function(){
    lader.classList.add("d-none");
if(xhr.status===200 || xhr.status===201 && xhr.readyState===4){
    //cl(xhr.response);
    if(method==="GET"){//DATA MAY BE ARRAY OR OBJECT
       let data1= JSON.parse(xhr.response);
       if(Array.isArray(data1)){//if is array then templete
        templating(data1)
       }
       else(
        titleConrol.value=data1.title,
        bodyConrol.value=data1.body,
        userIdConrol.value=userId.userId,
        submitbtn.classList.add("d-none"),
        updatebtn.classList.remove("d-none")
       )//we will patch data inform
    }
    else if(method==="PUT"){
        let id=JSON.parse(xhr.response).id;
        let card =document.getElementById(id);
        cl(card)
        let cardchild= [...card.children]//gets htmlcollections like body header footer
        cl(cardchild)
        cardchild[0].innerHTML=`<h2>${datafromdb.title}</h2>`
        cardchild[1].innerHTML=`<p>${datafromdb.body}</p>`
        //cl(cardchild[0]);//cardheader
        //cl(cardchild[1]);//cardbody
        postForm.reset();
        updatebtn.classList.add("d-none");
        submitbtn.classList.remove("d-none");
    }
   else if(method==="DELETE"){
let getindex=apiurl.indexOf(`posts/`);
cl(getindex)
let id2= apiurl.slice(getindex +6);
cl(id2);
document.getElementById(id2).remove()
   }
    else if(method==="POST"){
        let card=document.createElement("div");
        card.className="card";
        let postid=JSON.parse(xhr.response);
        card.id=postid.id;
        cl(card)
        card.innerHTML=`
        <div class="card-header">
 <h2>${datafromdb.title}</h2>
     </div>
 <div class="card-body">
 <p>
   ${datafromdb.body}
     </p>
       </div>
   <div class="card-footer d-flex justify-content-between">
  <button class="btn btn-primary" onclick="onEdit(this)">
      Edit
     </button>
     <button class="btn btn-danger" onclick="onDelet(this)">
     Delete
     </button>
 </div>
</div>`;//
postcontainer.append(card);
postForm.reset()
    }
}
}
}
AllApicall("GET",postsUrl);





postForm .addEventListener("submit",onsubmitPost)
updatebtn.addEventListener("click",onupdate)