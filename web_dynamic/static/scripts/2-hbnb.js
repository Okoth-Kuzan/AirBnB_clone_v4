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

    // Initial call to update the API status
    updateAPIStatus();

    // Set interval to periodically update the API status
    setInterval(updateAPIStatus, 5000); // Update every 5 seconds
});
