const form = document.querySelector("form");
const userForm = document.querySelector("#userForm");
const users = document.getElementById("users");



function renderGoogleButton() {
  if(!gapi)
    return
  gapi.signin2.render('gSignIn', {
    onsuccess: function(user) {
      onSignIn(user)
    },
    onerror: function(err) {
    console.log('Google signIn2.render button err: ' + err)
    }
  })
}

//$('.container .search').append('<div id="gSignIn" class="g-signin2" data-onsuccess="onSignIn"></div>')

renderGoogleButton()



function listUsers() {
    fetch(_config.users.invokeUrl)
    .then(response => response.json())
    .then(list => {
        users.innerHTML = list;
    })
}
userForm.addEventListener("submit", event => {
    event.preventDefault();
    let values = userForm.elements;
    fetch(_config.users.invokeUrl, {
        method: 'POST',
        body: {
            net_id: values.netId.value,
            name: values.name.value,
            grad_year: values.gradYear.value,
            industry: values.industry.value
        }
    })
    .then(response => console.log(response));
})

form.addEventListener("submit", event => {
    event.preventDefault();

    fetch(_config.api.invokeUrl, {
        method: 'POST',
        body: {
            test: JSON.stringify(form.elements.test.value)
        }
    })
    .then(response => response.json())
    .then(response => {
        let text = document.createElement('p');
        let node = document.createTextNode(response.Response);
        text.appendChild(node);
        let div = document.getElementById('div1');
        div.appendChild(text);
    });
})
