$(document).ready(function() {
    // Function to update the API status
    function updateAPIStatus() {
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/status/",
            type: "GET",
            success: function(response) {
                // Check if the status is "OK"
                if (response.status === "OK") {
                    // Add the class 'available' to the div#api_status
                    $("#api_status").addClass("available");
                } else {
                    // Remove the class 'available' from the div#api_status
                    $("#api_status").removeClass("available");
                }
            },
            error: function(xhr, status, error) {
                // Remove the class 'available' from the div#api_status
                $("#api_status").removeClass("available");
            }
        });
    }

    // Function to fetch places data and render HTML
    function fetchAndRenderPlaces() {
        $.ajax({
            url: "http://0.0.0.0:5001/api/v1/places_search/",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({}), // Send an empty dictionary in the body
            success: function(response) {
                renderPlaces(response);
            },
            error: function(xhr, status, error) {
                console.error("Error fetching places:", error);
            }
        });
    }

    // Function to render places as HTML articles
    function renderPlaces(places) {
        var placesSection = $(".places");
        placesSection.empty(); // Clear existing places

        places.forEach(function(place) {
            var article = $("<article>");

            // Add title and price
            article.append("<h2>" + place.name + "</h2>");
            article.append("<div class='price_by_night'>$" + place.price_by_night + "</div>");

            // Add information
            article.append("<div class='max_guest'>" + place.max_guest + " Guest" + (place.max_guest != 1 ? "s" : "") + "</div>");
            article.append("<div class='number_rooms'>" + place.number_rooms + " Bedroom" + (place.number_rooms != 1 ? "s" : "") + "</div>");
            article.append("<div class='number_bathrooms'>" + place.number_bathrooms + " Bathroom" + (place.number_bathrooms != 1 ? "s" : "") + "</div>");

            // Add description
            article.append("<div class='description'>" + place.description + "</div>");

            // Append article to places section
            placesSection.append(article);
        });
    }

    // Initial call to update the API status
    updateAPIStatus();

    // Initial call to fetch and render places
    fetchAndRenderPlaces();

    // Set interval to periodically fetch and render places
    setInterval(fetchAndRenderPlaces, 10000); // Update every 10 seconds
});
