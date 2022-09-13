# [Word VS](http://word-vs.herokuapp.com/)

Link to site [Word VS](http://word-vs.herokuapp.com/)

Word Vs is basically wordle with friends you challenge your friends to guess your word very simple lots of fun.
The inspiration for this mostly came from the idea behind wordle one man wanted to challenge his wife everyday.
So with the app anyone can challenge anyone everyday or even more than once everyday!

<img src="static/images/responsive-readme-3.png" alt="image of the website on various devices to show responsiveness" width="100%">

desktop and background credit: [pixabay](https://pixabay.com/photos/apple-computer-desk-workspace-1868496/)

# Table of contents
1.  [User stories](#user_stories)
2.  [Features](#Features)
3.  [Wireframes](#wireframes)
  - [Interactive](#interactive)
4.  [Challenges](#challenges)
5.  [Technology used](#technology_used)
  - [Wireframes](#wireframes)
  - [Frameworks](#frameworks)
  - [Libraries](#libraries)
6.  [Features left to implement](#features-left-to-implement)
7.  [Manual testing](#testing)
8.  [Manual public testing](#manual-public-testing)
9.  [Automatic testing with jest](#I-despise-JSdom)
10. [Validator testing](#validator-testing)
11. [Unfixed-bugs](#unfixed-bugs)
12. [Deployment](#deployment)
13. [Credits](#credits)
14. [My to do list](#todolist)
15. [Notes for assessor](#notes-for-assessor)

# User stories <a name="user_stories">
input needed

## Features<a name="Features"></a>
input needed

# Wireframes<a name="wireframes"></a>

### Adobe XD<a name="interactive"></a>

[interactive wireframe]()

This is the best way other than using the site to get an idea of how everything works. There are no other wireframes created for this app as I went straight to a digital wireframe.

# Challenges overcome <a name="challenges"></a>

# centering image

This may seem like an easy task but no matter what I was doing I couldn't center the image as according to a google search you can only center align something smaller than 100% 

This lead to me going down the route of calculating the position to be exactly the middle this is a breakdown of the calculation

The image width is determined by the height so I had to get the ratio of the image which is 16:9 

This enabled me to calculate the width by using the ratio done by dividing by the height (9) and mulitplying by the width (16)

So now I had the width I just needed a sure fire way to position it the exact same place each time so using left I then did the calculation again but this time using half the vh this
center the image to the left perfectly 

Finally I add 50vw to the total this centers the image in the middle of the screen regardless of viewport height try it out it works perfectly. There is likely a less complex way of 
doing this but I couldn't find it.

This is the CSS code to look out for:
left:calc(calc(calc(calc(50vh / 9) * 16) - calc(calc(100vh / 9) * 16)) + 50vw);

Another benefit of this is my animation became easier by just scaling the vh against the scroll position 

I actually ended up having to create this in javascript afterwards the javascript code is a little cleaner though.

# navbar not working 

This was a really frustrating issue early in development the navbar kept breaking.

At the stage of writing this I am currently still trying to understand what the issue is. I am taking a guess 
that it's something to do with the load times where the system is loading the js file before the DOM is ready slighlty dissapointing that bootstrap didn't think of that being an issue but will add an event listener to make sure DOM is loaded first.

Turns out I was misusing blocks in Django I was actually overwriting postloadJS whereas I thought calling block tag was actually extending I understand that a little better to avoid the issue again I added an empty block called extrapostjs where I will add extra js files for specific pages.

# Technology used<a name="technology_used"></a>
## Wireframes<a name="wireframes"></a>
- adobe XD
## Frameworks<a name="frameworks"></a>
- I used the Django framework
- I used github to store the repository and version management
- I used gitpod for editing the code and for posting to github 
## Libraries<a name="libraries"></a>
- bootstrap
- materialize

### Features Left to Implement<a name="features-left-to-implement"></a>
input needed


## Manual testing <a name="testing"></a>
input needed

# Manual public testing <a name="manual-public-testing"></a>
input needed

# Automatic testing <a name="I-despise-jsdom"></a>

## img_scroll.js

If you set debug to true it will run automatic tests to determine whether you've made a mistake in your animationprops or if you're missing any properties such as an ID or animationprops. The debugger will also continuously spit out each update and the variables it uses to do it's calculations which can lead to an overdose of information.

The reason I implemented the tests directly into the file is so that when users use the designer it will spit out easy to understand errors and makes my life much easier when trying to debug the code.

Jest while it's likely capable of what I am doing here would be extremely difficult to implement to the level I have implemented in these tests.

The only way to manually test is to see if you put in good info into the start,end,startpos,endpos,direction properties if so it'll do what you want if not it wont. It can be a little difficult to understand initially but it becomes intuitive after a while.

# Validator Testing <a name="validator-testing"></a>

## HTML
input needed
# CSS
input needed
# JS
input needed

# Unfixed Bugs <a name="unfixed-bugs"></a>
input needed

# Deployment <a name="deployment"></a>
input needed

I was using github as the repository for the whole project so when I wanted to create a live page it was very easy to do.

- The site was deployed to the Azure platform. The steps to deploy are as follows:
input needed

## How to clone repository:
 - Go to my github repository
 - Click the code option and then copy the link
 - If you have git installed on your pc you can use git clone followed by the URL 

## How to deploy to heroku:
- To deploy to heroku you need to do the following 
1. Go to heroku create an account or sign in 
2. Create an app
3. Go to the deploy tab
4. Choose your preferred method
5. Choose the repository and deploy.
6. Things you'll need to do to ensure your system deploys correctly is: 
7. Create a procfile containing the following text: 
   - web: python app.py
8. Create a requirements.txt with the following content:
input needed


## The live link can be found here - input needed


# Credits <a name="credits"></a>

Below are the sources of all the media and content 

All hero images were created by me in photoshop
The Logo was made by my in illustrator and photoshop


## Websites I copy and pasted from:
  - [google fonts](https://fonts.google.com/)
  - [materialize colors](https://materializecss.com/color.html)
  - [javascript tutorial](https://www.javascripttutorial.net/javascript-dom/javascript-scroll-events/)
## All websites used are linked below nothing was copy and pasted just checked:
  - [Bootstrap breakpoints](https://getbootstrap.com/docs/5.0/layout/breakpoints/)


## Content 

- I used a collapsible navbar from bootstrap the generic one. Edited it to fit my sites theme.
- I was concerned about performance issues as I am using the scroll event alot on the homepage so I looked up how to throttle events
this is where I found some code on javascript tutorials site that did exactly what I was looking to do. I user this multiple times throughout my code.

## Media

- input needed

# More coming soon! 
 
## Follow me on github to stay upto date and message me for project ideas/pitches always ready to work with someone.
 
# To do <a name="Todolist"></a>
 only started noting things when I noticed I started forgetting things
## Completed

## Not done yet

# Notes for assessor <a name="notes-for-assessor"></a>

Sorry my readme is so long.

Assessor only: Please email me for log in details for admin account if required or follow instructions to clone and deploy to heroku and set the ADMIN_REAL key to an account of your choosing to see the admin page.
thebrightspark1@gmail.com
I will ask for proof you're an assessor.