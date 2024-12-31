// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Greet the user based on the time of day
    const greetingElement = document.createElement("p");
    const currentTime = new Date().getHours();
    let greeting;

    if (currentTime < 12) {
        greeting = "Good Morning!";
    } else if (currentTime < 18) {
        greeting = "Good Afternoon!";
    } else {
        greeting = "Good Evening!";
    }

    greetingElement.textContent = greeting;
    document.querySelector("header").appendChild(greetingElement);

    // Add click event to the "Get Started" button
    const getStartedButton = document.querySelector("a[href='login.html']");

    getStartedButton.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent the default link behavior
        alert("Redirecting to the login page. Enjoy exploring Skillchemy!");
        window.location.href = getStartedButton.href;
    });
});
