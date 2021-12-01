
document.querySelector('#register').addEventListener('submit', async function (event) {
    event.preventDefault();
    const form = this;
    const formObject = {};
    formObject['username'] = form.username.value;
    formObject['password'] = form.password1.value;
    formObject['Repassword'] = form.password2.value
    if (formObject['password'] === formObject['Repassword']) {
        const res = await fetch('/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formObject)
        });
        const result = await res.json();
        if (result.success) {
            alert('Register Success!');
        } else {
            alert('Register Fail!');
        }
    }
    else {
        alert('Two passwords are not the same! Please re-enter your password!')
    }
})
