# Urban

## What?

This is a small web app that visualizes urbanization data of countries as a street of buildings, the height of which corresponds to the urbanization level relative to the total population of the country.

## How?

It uses Three.js 3D JavaScript animation library to visualize the level of urbanization of different countries relative to their population. The data is accessed from the World Bank. The height of each block in the visualization represents the relative urbanization level of the respective country, identified by the tiled texture of the country's flag. The actual values are not shown, as the idea is to compare the relative urbanization level of countries, especially when two countries with vastly different urbanization levels are placed together.

## Why

Having a hard time coming up with a worthwhile idea for this project, I talked to Craig Protzel, my professor for the Mashups course. He suggested I think of other courses I am taking and try to blend a few ideas together to produce something unusual. Another course I am taking is called *Imagined Cities*. So I decided to build a city! The inspiration for such medium of visualization came from driving along the Sheikh Zayed Road in Dubai, which is essentially a long straight road with skyscrapers on either side. In my opinion, visualizing urbanization data through building a city is a pretty logical way of going about it. =)

## Challenges & lessons learnt

In the beginning I was able to quickly dive into Three.js, as there were plenty of examples and documentation about the basics. Building the blocks was relatively easy, however, something as simple as displaying two-dimensional text in the three-dimensional scene gave me a very hard time. It turned out that Three.js is rapidly changing and certain methods get deprecated, which is a shame as many examples and tutorials relied on the previous versions of the library. Another struggle was implementing the Pointer Lock Controls for the camera. Nevertheless, although many things are still not absolutely clear to me, I am content I was able to visualize data in 3D and build a decent understanding of the Three.js library. The examples on the library's homepage looked extremely advanced to me before I started to play around with the library - now I know they are doable and that I could try re-creating some of them.

## Future plans

Ideally, I would love to be able to make use of the urbanization data for the earlier years that I have access to. Although this would involve a simple change of height of each block, the structure of my code needs to be slightly changed in order for it to work. I'll figure it out within the next week.

## Resources

[Three.js](http://threejs.org/)

[Wolrd Bank API - Urbanization data](http://api.worldbank.org/countries/all/indicators/SP.URB.TOTL.IN.ZS?date=2014:2014&format=json&per_page=250)

[Flagpedia](http://flagpedia.net/download)