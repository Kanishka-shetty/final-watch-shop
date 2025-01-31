
// // Send watch data to DB
// document.querySelector(".form-box form")
// .addEventListener("submit", function(event){
//     event.preventDefault();
//     const formdata = new FormData(this)
//     fetch("http://127.0.0.1:8000/api/watches/create/",{
//         method: "POST",
//         body: formdata
//     })
//     .then ((response)=> response.json())
//     .then((data)=> {
//         alert("Watch added successfully");
//         displayWatches();
//     })
//     .catch((error)=>console.error("Error", error));
// });

// //Get all the list of API's
// function displayWatches(){
//     fetch("http://127.0.0.1:8000/api/watches/")
//     .then((response)=> response.json())
//     .then((data)=>{
//         const container = document.getElementById("watches-container");
//         container.innerHTML= "";

//         data.forEach((watch)=>{
//             const watchCard = `                
//                 <div class="watch-list" id="watch-list">
//                     <div class="watch">
//                         <img src = "${watch.image} " alt= " image" />
//                          <p class = "watch-name">Watch Name:${watch.name}</p>
//                          <p class = "watch-model">Watch Brand:${watch.brand}</p>
//                          <p class = "watch-price">Price:${watch.price}</p>
//                     </div>
//                 </div>
//                 `;
//                 container.innerHTML += watchCard;
//             });
//     })
//     .catch((error) => console.error("Error fetching watches", error));
// }

// document.addEventListener("DOMContentLoaded", displayWatches)


// Helper function to get the CSRF token from the form or page
function getCSRFToken() {
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
    return csrfToken ? csrfToken.value : '';
}

// Function to handle form submission
document.querySelector(".form-box form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formdata = new FormData(this); // Get form data

    // Append additional fields to the FormData object
    formdata.append("name", document.getElementById("watch-name").value);
    formdata.append("brand", document.getElementById("watch-brand").value);
    formdata.append("model", document.getElementById("watch-model").value);
    formdata.append("price", document.getElementById("price").value);
    formdata.append("image", document.getElementById("image").files[0]);

    // Send the POST request with the form data
    // fetch("http://127.0.0.1:8000/api/watches/create/", {
    //     method: "POST",
    //     headers: {
    //         "X-CSRFToken": getCSRFToken(), // Include CSRF token in the headers
    //     },
    //     body: formdata, // Include the form data
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         alert("Watch added successfully"); // Notify user of success
    //         displayWatches(); // Refresh the list of watches
    //     })
    //     .catch((error) => console.error("Error", error)); // Handle any errors
// ---------------------------
fetch("http://127.0.0.1:8000/api/watches/create/", {
    method: "POST",
    headers: {
        "X-CSRFToken": getCSRFToken(), // Include CSRF token in the headers
    },
    body: formdata, // Include the form data
})
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log("Response Data:", data);
        alert("Watch added successfully"); // Notify user of success
        displayWatches(); // Refresh the list of watches
    })
    .catch((error) => console.error("Error:", error)); // Handle errors

    });

// Function to fetch and display the list of watches
const baseurl = "http://127.0.0.1:8000/"

function displayWatches() {
    fetch("http://127.0.0.1:8000/api/watches/")
        .then((response) => response.json())
        .then((data) => {
            const container = document.getElementById("watches-container");
            container.innerHTML = ""; // Clear the container before displaying new data

            // Loop through each watch and create its HTML structure
            data.forEach((watch) => {
                const imageurl = baseurl + watch.image
                const watchCard = `
                <div class="watch-list" id="watch-list">
                    <div class="watch">
                        <img src="${imageurl}" width="50px" height = "50px" alt="Image" />
                        <p class="watch-name">Watch Name: ${watch.name}</p>
                        <p class="watch-brand">Watch Brand: ${watch.brand}</p>
                        <p class="watch-price">Price: ${watch.price}</p>
                    </div>
                </div>`;
                container.innerHTML += watchCard; // Append the watch card to the container
            });
        })
        .catch((error) => console.error("Error fetching watches", error)); // Handle any errors
}

// Run the displayWatches function when the page loads
document.addEventListener("DOMContentLoaded", displayWatches);
