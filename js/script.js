
window.onload = function(e) {
  if(e.target.activeElement.id ==='contact-us-page'){
    fetch('https://harishsoftwaresolutions.com/api/v1/services/service-details').then((response)=>response.json()).then(data=>{
        let responseData = data.data;
        let topic = document.getElementById('topic');
        console.log(responseData);
        for(var i=0;i<responseData.length;i++){
          var item=responseData[i];
          var option = document.createElement("option");
          option.text = item.name;
          option.value = item.name;
          topic.appendChild(option);
        }
  }).catch(error=>{
  window.alert(error.message)
  });
  }
  
};
document.querySelector('form').addEventListener('submit', async function(event) {
    const form = document.querySelector('form');
  event.preventDefault();
    var topicElement = document.querySelector('#topic');
    var nameElement = document.querySelector('#name');
    var emailElement = document.querySelector('#email');
    var descriptionElement = document.querySelector('#description');
    var companyElement = document.querySelector('#company');
    var dateElement = document.getElementById('#date');
    var mobileElement = document.querySelector('#number');
    var successMsg = document.querySelector('#success-msg');
    var parameters = {};
    console.log("IN event handkle")
    var formData = {
      topic: topicElement?.value,
      name: nameElement?.value,
      email: emailElement?.value,
      description: descriptionElement?.value
    };
    
    if(topicElement===null){
      formData['name']=document.querySelector('#firstName').value+' '+document.querySelector('#lastName').value;
      formData['company']=companyElement.value;
      formData['date']=dateElement?.value;
      formData['mobile']=Number(mobileElement.value);
      formData['description']=document.querySelector('#message').value;
      
    }
    console.log(formData);
  
    await fetch('https://harishsoftwaresolutions.com/api/v1/users/user-details/'+((topicElement===null)?('?softAdd=true'):('')), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      parameters:parameters,
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => true)
    .catch((error) => {
      console.error('Error:', error);
    });
    successMsg.innerHTML = "Thank you for your feedback";
    if(successMsg.hasAttribute('style')){
      successMsg.removeAttribute('style')
    }
    successMsg.className="success-msg fadeOut";
    setTimeout(()=>{successMsg.setAttribute('style','display:none')},7800);
    form.reset();
  });
  