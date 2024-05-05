$(document).ready(function() {
    // Variable to store checked Amenity IDs
    var checkedAmenities = [];

    function updateCheckedAmenities() {
        // Get the h4 tag inside the div Amenities
        var amenitiesList = $(".amenities h4");

        // Clear the previous content
        amenitiesList.empty();

        // Add the list of checked amenities
        if (checkedAmenities.length > 0) {
            amenitiesList.text("Amenities: " + checkedAmenities.join(", "));
        } else {
            amenitiesList.text("Amenities: None");
        }
    }

    // Listen for changes on each input checkbox tag
    $(".amenities input[type='checkbox']").change(function() {
        var amenityId = $(this).data("id");

        // Check if the checkbox is checked
        if ($(this).prop("checked")) {
            // Add Amenity ID to the list
            checkedAmenities.push(amenityId);
        } else {
            // Remove Amenity ID from the list
            checkedAmenities = checkedAmenities.filter(function(id) {
                return id !== amenityId;
            });
        }

        // Update the list of checked amenities
        updateCheckedAmenities();
    });
});
