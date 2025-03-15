document.addEventListener("DOMContentLoaded", function () {
    loadReviews();

    document.getElementById("reviewForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reload

        let name = document.getElementById("name").value;
        let text = document.getElementById("review").value;

        if (name.trim() === "" || text.trim() === "") {
            alert("Please enter both name and review.");
            return;
        }

        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

        reviews.push({ name: name, text: text });

        localStorage.setItem("reviews", JSON.stringify(reviews));

        document.getElementById("name").value = "";
        document.getElementById("review").value = "";

        loadReviews();
    });
});

function loadReviews() {
    let reviewContainer = document.getElementById("reviewContainer");
    reviewContainer.innerHTML = ""; // Clear old reviews

    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    reviews.forEach(review => {
        let reviewDiv = document.createElement("div");
        reviewDiv.classList.add("review");

        reviewDiv.innerHTML = `
            <strong>${review.name}</strong>
            <p>${review.text}</p>
            <hr>
        `;

        reviewContainer.appendChild(reviewDiv);
    });
}
document.querySelectorAll(".star").forEach((star, index, stars) => {
    star.addEventListener("click", function() {
        let value = this.getAttribute("data-value");
        document.getElementById("rating-value").value = value;

        // Remove 'active' class from all stars
        stars.forEach(s => s.classList.remove("active"));

        // Add 'active' class up to the clicked star (left to right)
        for (let i = 0; i < value; i++) {
            stars[i].classList.add("active");
        }
    });
});

const stars = document.querySelectorAll(".star");

stars.forEach((star, index) => {
  star.addEventListener("click", () => {
    stars.forEach((s, i) => {
      s.classList.toggle("selected", i <= index);
    });
  });
});

