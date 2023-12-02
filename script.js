var type = null, link = null;
var formEl = document.getElementById("myForm"),
  typeOptions = document.querySelectorAll("[name='type']"),
  idStrEl = document.getElementById("id-str"),
  clearBtn = document.getElementById("clear"),
  submitBtn = document.getElementById("submit"),
  outputEl = document.getElementById("output");

function checkSubmit() {
  for(let i = 0; i < typeOptions.length; i++) {
    if(typeOptions[i].checked) {
      type = typeOptions[i].value;
    }
  }//or do on submit
  submitBtn.disabled = !(idStrEl.value && type);
}
function fetchData() {
  link = "https://open.spotify.com/oembed?url=" + (type !== "url" ? ("spotify:" + type + ":") : "") + idStrEl.value;
  outputEl.innerHTML = null;
  outputEl.innerHTML += `Data: <a href="${link}" target="_blank">${link}</a><br>`;
  return fetch(link, { method: "GET" })
    .then(response => response.json())
    .then(result => {
      /*for(let i in result) {
        output.innerHTML += i+":"+result[i]+"<br>";
      }*/
      output.innerHTML += `Image source: <a href="${result.thumbnail_url}" target="_blank">${result.thumbnail_url}</a><br><img src="${result.thumbnail_url}" width="250">`;
    })
    .catch(e => {
      output.innerHTML += e;
    });
}

idStrEl.addEventListener("change", () => {
  if(idStrEl.value) {
    idStrEl.value = idStrEl.value.split("?")[0];
  }
});
formEl.addEventListener("change", checkSubmit);
idStrEl.addEventListener("input", checkSubmit);
formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  fetchData();
});

clearBtn.addEventListener("click", function() {
  for(let i = 0; i < typeOptions.length; i++) {
    typeOptions[i].checked = false;
  }
  idStrEl.value = null;
  outputEl.innerHTML = null;
});
