# InstaGeo

## What?

This is a small web app that visualizes Instagram posts around a given location.

## How?

It uses the Google Maps Geocoding API to determine the coordinates associated with the input value. Then it looks up a 100 latest posts from Instagram within a 5 km range of the determined location and displays them on the Google Map. As the user moves the map and the change of the center of the map is detected, a new AJAX request is sent to the Instagram API. This time, however, only the images that have not yet been displayed on the map are appended to the `photos` array.

If the user hovers over a marker, an `infoWindow` appears, where the thumbnail of the image is displayed, which is hidden out mouseout. If the user clicks on the marker, the link to the original Instagram post appears in a new window.

## Why

As of October 2015, Instagram lacks map-based image visualization. This allows the user to see what the current posts are in a given location, which can be used to get a sense of how busy a certain place is, what the weather is like, or simply fulfill a need for homesickness or curosity.

## Challenges & lessons learnt

One of the main problems was caused by using the for-loop to generate image markers and their respecife infoWindows. The `infoWindow` was always the same for all markers - it was the `infoWindow` of the last element in the `photos` arrray. I had to use a clojure to fix this bug - something I've never encountered before. I learnt to keep Googling the problem until I found a similar question online - and to not hesitate askinh others for help.

## Future plans

Those would involve optimizing the speed of the application by removing old items from the array when the map is moved to a completely different location, as well as detecing the direction of the motion  and pre-loading even more images in that area.

## Resources

[Google Maps Geocoding API](https://developers.google.com/maps/documentation/geocoding/intro)
[Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/)
[Instagram API](https://instagram.com/developer/)
