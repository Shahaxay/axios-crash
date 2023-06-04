// AXIOS GLOBAL 
axios.defaults.headers.common["Auth-Token"]="ServerToken";
// AXIOS INSTANCES
const axiosObj=axios.create({
  baseURL:"https://jsonplaceholder.typicode.com"
})
axiosObj.get("/posts").then(res=>showOutput(res)).catch(err=>console.log(err));
// GET REQUEST
function getTodos() {
  console.log('GET Request');
  axios({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/posts',
    parems:{
      _limit: 10
    }
  }).then(res=>{showOutput(res); console.log(res);})
  .catch(err=>console.log(err));
}

// POST REQUEST
function addTodo() {
  console.log('POST Request');
  axios({
    method:"post",
    url:"https://jsonplaceholder.typicode.com/posts",
    data:{"name":"akshay","rollno":"l1"}
  }).then(res=>{showOutput(res);console.log(res);})
  .catch(err=>console.log(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  console.log('PUT/PATCH Request');
  axios({
    method:"put",
    url:"https://jsonplaceholder.typicode.com/posts/1"
  }).then(res=>{showOutput(res);console.log(res)})
  .catch(err=>console.log(err));
}

// DELETE REQUEST
function removeTodo() {
  console.log('DELETE Request');
  axios({
    method:"delete",
    url:"https://jsonplaceholder.typicode.com/posts/1",
    headers:{AuthinticationToken:"SDFHFJHAFHD"}
  }).then(res=>{showOutput(res);console.log(res)})
  .catch(err=>console.log(err));
}

// SIMULTANEOUS DATA
function getData() {
  console.log('Simultaneous Request');
  axios.all([axios.get("https://jsonplaceholder.typicode.com/posts"),axios.post("https://jsonplaceholder.typicode.com/posts")]).then(res=>{
    console.log(res[0]);
    console.log(res[1]);
    showOutput(res[1]);
  })
  .catch(err=>console.log(err));
}

// CUSTOM HEADERS
function customHeaders() {
  console.log('Custom Headers');
  const config={
    headers:{
      'x-auth':'ASDFG'
    }    
  }
  //WAY:0
  axios.post("https://jsonplaceholder.typicode.com/posts",{"name":"kamal","roll":"k8"},config)
  .then(res=>showOutput(res))
  .catch(err=>console.log(err));

  //WAY:1
  // axios.delete("https://jsonplaceholder.typicode.com/posts/1",config)
  // .then(res=>showOutput(res))
  // .catch(err=>console.log(err));

  //WAY:2
//   axios({
//     method:"post",
//     url:"https://jsonplaceholder.typicode.com/posts",
//     data:{"name":"kamal","roll":"k8"},
//     headers:{"hname":"kamal","hroll":"k8"}
// })
//   .then(res=>showOutput(res))
//   .catch(err=>console.log(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  console.log('Transform Response');
  axios({
    method:"post",
    url:"https://jsonplaceholder.typicode.com/posts",
    data:{"name":"akshay","rollno":"l1"},
    transformResponse:axios.defaults.transformResponse.concat((data)=>{
      data.name=data.name.toUpperCase();
      data.rollno=data.rollno.toUpperCase();
      return data;
    })
  }).then(res=>{showOutput(res);console.log(res);})
  .catch(err=>console.log(err));
}

// ERROR HANDLING
function errorHandling() {
  console.log('Error Handling');
  axios({
    method:'get',
    url:'https://jsonplaceholder.typicode.com/posts11',
    parems:{
      _limit: 10
    }
  }).then(res=>{showOutput(res); console.log(res);})
  .catch(err=>{
    if(err.response){
      //server respond with status other than 200
      console.log(err.response.status);
      console.log(err.response.data);
      console.log(err.response.headers);
      console.log(err.message);
      if(err.response===404){
        alert("ERROR: Page Not Found");
    }else if(err.request){
      console.log(err.request);
    }else{
      console.log(err.message);
    }
  }});
  
}

// CANCEL TOKEN
function cancelToken() {
  console.log('Cancel Token');
  const source=axios.CancelToken.source();
  axios
  .get("https://jsonplaceholder.typicode.com/posts?_limit=5",{
    cancelToken:source.token
  })
  .then(res=>showOutput(res))
  .catch(thrown=>{
    if(axios.isCancel(thrown)){
      console.log("Resuest canceled",thrown.message);
    }
  });
  if(true){
    source.cancel("Request canceled");
  }
}

// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  config=>{
    console.log(`${config.method.toUpperCase()} request sent to url:${config.url} at time:${new Date().toLocaleTimeString()}`)
    return config;
  },
  err=>console.log(err)
);

// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
