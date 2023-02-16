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

# colors unable to easily add transparency

This was really me thinking about me in the future really the easy way to get round this is to add opacity and set that to a value but that means that the element below inherits the opacity... This was a slight problem not a big one really but due to me wanting to make a designer eventually. I quickly looked into how to not inherit opacity. Turns out it's relatively simple just use RGBA to set color easy!

Only issue is that materialize is sert using hex values. Yuck makes sense as its more efficient saving valuable space! How do I fix this then? Due to my prior knowledge with adobve software and photoshop I knew that hex is basically rgb.

Hex uses the first value and mulitplies it by 16 a b c d e f basically mean 10 11 12 13 14 15 respectively 15*16 is 240 the second letter is taken at facevalue. 

So max value is 15 * 16 + 15 which is 255. so all I had to do is create a script to look at materializes code and edit it. In order to be lazy I took the entire css file into word and used replace on paragraphs to make each rule sit on its own line I didn't want it to happen for the } though as they would all be on the same line and I wanted to do a line at a time to for loop through. So i did another replace to add a paragraph after }. 

Then I created a quick and dirty python script and set it to print out the values I wanted. then > the output to another file called newcolors took a few attempts and then I sorted it. The script takes less than a second to run creating a 5k line css file. Next challenge is to create a quick and dirty python file to slap those into a database so I can add the indiviual colors in style tags in the designer allowing me to very efficiently serve user created HTML later but I can imagine that will show up in a later challenge

# Form handler for my contact options page

The page that accepts the input is a single form split into multiple chunks each chunk can have 10 questions each 
there is one part that always displays which is I am a human. so the answers to that need to map to the customer 
table a request number needs to be the link between the customer table and the rest of the questions 

So how do I create a form that has 40 plus fields where only sometimes fields are used and the validation needs to 
only trigger if the option was chosen origionally. So the sturcture coming from the front end is a mystery.. 

I also would love to have the fields be saved during the editing process they can be very big answers like whats your
idea? I try explaining this website as an idea in less than 2000 characters... No chance but we all know what its like
you've just written a whole bunch of text and bam you hit a wall cant think of the next bit leave the page come back and
all your hard work is gone. So the system needs to as soon as an account is created create an account create a request number
put any answers in the table with an incomplete tag so that when I am looking through requests I don't see the incomplete ones.

One way to solve this would be have the individual blocks of questions be saved individually without a page refresh. Also need
the system if refreshed to not reset to the way it was before. So if the user is logged in it needs to know what options were
already selected... Sounds like my JS file needs to be able to access the table? or I have a hidden field at the top of the page
which is created by the backend which contains an attribute called previouschosenoptions that gets passed through the submit function
straight away... Which would display the correct blocks.. If user already logged in then it could use that to autofill the inputs 

But say user refreshes and changes their options there will be data in the hidden sections.. Soo I need to segment them into seperate 
saves so you save and next one pops open.. Maybe some animations could be used here to make the save process more exciting to the 
user.. This allows me to handle each part seperately and it all gets sent to the same table apart from the customer one at the start.

This seems doable now but likely very complex. The things I will do to make my UX fit my minds eye...

Data solution 

table one customer
unique ID primary key
name 
lastname 
etc.

table two request table
Unique ID (foreign key customer table)
Request ID primary key

table three quesitons table 
Question ID primary key
request ID foreign key request table
question 1 question
question 1 answer 
question 2 question 
question 2 answer
etc 

This allows one customer to have multiple requests 
and each request to have multiple questions 

Javascript needs to get the submit use the label values as the questions 
then match them with the answers using the for on the labels to match to the answers

Will need to take the label value at the begginning of the page load and then make the links 
remembering the ids and saving the actual input elements rather than what their IDs were. Why? 
So that a user cant change the format of the questions and change the labels and submit bad data
for nefarious reasons or because they want to.. The javascript also needs to do a check to make sure 
all data is legitmate data aswell avoiding SQL injections With a custom error message stating I know 
how to handle SQL injections to the front end just to rub it in... 

This allows me to only validate fields that are not hidden and only submit data of the particular block aswell.

So this will handle every seperate contact option the 
same way. Will need to have a unique form referance to
group all the answers. 

Also allows flexibilty in the future so I can add groups and
change questions whenever I like without any additional changes
to the form handler. 

and have a foreign key to a customer table allowing 
a multiple to one relationship 
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

## selection.js

If you set debug to true it will run tests to ensure you have set the HTML correctly and it will output it's activity to the page including the connected message.

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