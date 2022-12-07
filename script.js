// blank Check --------------------------------------------------------------------------------------------------
function blankCheck(element){
    if(element.value.length == 0){
        setError(element, "*Cannot be empty");
        console.log(element.value.length);
    }
    else{
        element.value = element.value.trim();
    }
}


// set Error --------------------------------------------------------------------------------------------------
function setError(element, errorMsg){
    const formControl = element.parentElement;
    formControl.classList = "input error";
    formControl.querySelector(".error-msg").innerText = errorMsg;
}


// set Success --------------------------------------------------------------------------------------------------
function setSuccess(element){
    const formControl = element.parentElement;
    formControl.classList = "input success";
    formControl.querySelector(".error-msg").innerText = "";
}


// fname validation --------------------------------------------------------------------------------------------------
const fname = document.getElementById("fname");
const fnameCheck = /^[a-zA-Z .]{3,30}$/;
function fnameValidation(element){
    // element.style.textTransform = "uppercase";
    element.value = element.value.toUpperCase();
    if(element.value.length == 0){
        console.log("blankCheck run and value = %s", element.value)
        setError(element, "*Full name cannot be empty");
    }else if(element.value.length <= 3){
        setError(element, "*Please enter valid name");
    }
    else if(fnameCheck.test(fname.value)){
        setSuccess(element);
    } else{
        setError(element, "*Please enter valid name last");
        console.log(fnameCheck.test(fname.value));
    }
    cnameValidation(cname);
}


// cname validation --------------------------------------------------------------------------------------------------
const cname = document.getElementById("cname");
function cnameValidation(element){
    element.value = element.value.toUpperCase();
    // element.style.textTransform = "uppercase";
    if(cname.value == fname.value){
        setSuccess(element);
        console.log(fname.value);
        console.log(cname.value);
    }
    else{
        setError(element, "*Name Mismatch");
    }
}


// phone validation --------------------------------------------------------------------------------------------------
const phone = document.getElementById("phone");
const phoneCheck = /^[6,7,8,9][0-9]{9}$/;
document.querySelectorAll("input[name='phone']").forEach(input => {
    input.oninput = () => {
        if (input.value.length > 10) {
            input.value = input.value.slice(0, 10);
        }
    }
});
function phoneValidation(element){
    console.log(phoneCheck.test(element.value));
    console.log(element.value);
    if(element.value.length == 0){
        setError(element, "*Cannot be empty");
        console.log(element.value.length);
    } else if(phoneCheck.test(element.value)){
        setSuccess(element);
    }
    else{
        setError(element, "*Enter valid phone number");
    }
    cphoneValidation(cphone);
}


// cphone validation --------------------------------------------------------------------------------------------------
const cphone = document.getElementById("cphone");
function cphoneValidation(element){
    if(phone.value == cphone.value){
        setSuccess(element);
    }
    else{
        setError(element, "*Phone number mismatch");
    }
    blankCheck(element);

}


// email validation --------------------------------------------------------------------------------------------------
const email = document.getElementById("email");
const emailCheck = /^[a-zA-Z][a-zA-Z0-9\-\.\_]{3,30}[@][a-zA-Z0-9]{3,10}[.][a-zA-Z]{2,5}$/;
function emailValidation(element){
    email.value = email.value.toLowerCase();
    if(emailCheck.test(email.value)){
        setSuccess(element);
    }
    else{
        setError(element, "*Enter valid email");
    }
    cemailValidation(cemail);
}


// cemail validation --------------------------------------------------------------------------------------------------
const cemail = document.getElementById("cemail");
function cemailValidation(element){
    email.value = email.value.toLowerCase();
    if(email.value == cemail.value){
        setSuccess(element);
    }
    else{
        setError(element, "*Email mismatch");
    }
}


// alternate number validation --------------------------------------------------------------------------------------------------
const aphone = document.getElementById("aphone");
function aphoneValidation(element){
    if(phone.value == aphone.value){
        setError(element, "*Phone number and alternate number cannot be same")
    }
    else{
        aphone.parentElement.querySelector(".error-msg").innerHTML = "";
        setSuccess(element);
    }
}

// captcha validation --------------------------------------------------------------------------------------------------
const captchaValues = ["4kr5s", "8rqvb", "7n9ny", "2q2qq", "ghnp5"];
var captchaValue = captchaValues[0];
function randomCaptcha(element){
    const randomNumber =  Math.floor(Math.random() * 5) + 1;
    const source = "img/captcha-img/captcha0" +  randomNumber + ".png";
    const parent = element.parentElement;
    const captchaImg = parent.querySelector(".captcha-img img");
    captchaImg.setAttribute("src", source);
    console.log(randomNumber);
    captchaValue = captchaValues[randomNumber - 1];
    console.log(captchaValue);
    console.log(randomNumber);
}
addEventListener("load", randomCaptcha(document.querySelector(".captcha-refresh")));
function captchaValidation(element){
    if(captchaValue == element.value){
        setSuccess(element);
    }
    else{
        setError(element, "*wrong captcha");
    }
}


// All validation --------------------------------------------------------------------------------------------------
function validateAll(){
    const successNumber = document.querySelectorAll(".input.success");
    const len = successNumber.length;
    console.log(len);
    if(len == 8){
        alert("Your registration completed");
        document.forms[0].reset();
        const reset = document.querySelectorAll(".input");
        reset.forEach(function (element){
            element.classList = "input";
        })
    }
    else{
        alert("Please complete the form");
    }
}