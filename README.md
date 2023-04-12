# [MakeWebWork](http://makewebwork.azurewebsites.net)

Link to site [MakeWebWork](http://makewebwork.azurewebsites.net)

MakeWebWork is a website for me to sell my websites in the future. There is still lots of work to be done before it's completed it needs to be able to take payments and quote prospective customers and allow them to contact me with their requests so I can gage interest for the project.

The website when it is completed should be a group of JS and CSS files that when the designer is created will be able to recognise patterns in html and turn them into interactive webpages enabling unmatched webdevelopment speed. The JS files also need to have built in debugging too so that developing the designer will be much easier. 

<img src="static/images/responsive-readme-3.png" alt="image of the website on various devices to show responsiveness" width="100%">

desktop and background credit: [pixabay](https://pixabay.com/photos/apple-computer-desk-workspace-1868496/)

# Table of contents
1.  [User stories](#user_stories)
  - [story 1](#story_1)
  - [story 2](#story_2)
  - [story 3](#story_3)
  - [story 4](#story_4)
  - [story 5](#story_5)
  - [story 6](#story_6)
  - [story 7](#story_7)
2.  [Features](#Features)
3.  [Wireframes](#wireframes)
  - [Interactive](#interactive)
4.  [Challenges](#challenges)
  - [centering big images](#centering_big_imgs)
  - [Navbar](#Navbar)
  - [Transparency](#transparency_without_inherit)
  - [Funky form handler](#I_make_life_hard_4_me)
  - [Journeys](#Favourite_part)
5.  [Technology used](#technology_used)
  - [Wireframes](#wireframes)
  - [Frameworks](#frameworks)
  - [Libraries](#libraries)
6.  [Features left to implement](#features-left-to-implement)
  - [designer](#I_am_way_too_ambitious)
7.  [Manual testing](#testing)
8.  [Manual public testing](#manual-public-testing)
9.  [Automatic testing with jest](#I-despise-JSdom)
10. [Validator testing](#validator-testing)
11. [Unfixed-bugs](#unfixed-bugs)
12. [Deployment](#deployment)
13. [Credits](#credits)
14. [My to do list](#todolist)
15. [Notes for assessor](#notes-for-assessor)

# User stories <a name="user_stories"></a>

## business owners

Business owners should be able to look at the website and see what my websites have to offer them and get a rough quote and contact me

## large companies

Large companies should be able to purchase a website directly from me where they would be able to support the site themselves using the designer I will build in the future

## potential companies

Potential companies can put in a request to tell me about their ideas for their businesses and I would be able to choose any that seem promising investing in them with a website and benefitting form their growth

## website owner

See users requests and contact details to be able to reply to the user

## general use 

The html and javascript and css should follow a reusability standard to allow me to create predictable behaviour in the designer when it is completed.

## Story 1 <a name="story_1"></a>
Me the website owner should be able to use the Django admin site to manage the website  and change prices of modules and the ratios used to calculate the various web development costs on the journey pages. I should also be able to view all requests along with contact details to get back to the user's.

## Story 2 <a name="story_2"></a>
A user should be able to log in and sign up

## Story 3 <a name="story_3"></a>
A user should be able to reset their own password and verify their emails

## Story 4 <a name="story_4"></a>
A user should be able to make a request describing what they would like from MakeWebWork. And I should be able to send them a link via email or text to respond to the user. 

## Story 5<a name="story_5"></a>
A user should be able to get a rough quote from the site before contacting us if that's what they wish to do. 

## Story 6 <a name="story_6"></a>
A user should be able to use many of the features that will be available in the designer as smart features. Things like journeys, animations, selection form and selection information pages and many more. 
 
## Story 7 <a name="story_7"></a>
A user should be able to gather information about the abilities available in the future website. 

## Features<a name="Features"></a>



# Wireframes<a name="wireframes"></a>

### Adobe XD<a name="interactive"></a>

[interactive wireframe](https://xd.adobe.com/view/5aa4db6e-c5ca-4e7f-98bf-da8ac5b93b1f-0ff7/?fullscreen)

This is the best way other than using the site to get an idea of how everything works. There are no other wireframes created for this app as I went straight to a digital wireframe. The wireframe was also only followed loosely the final product ended up being alot more complex with things that cant be recreated in adobe XD

# Challenges overcome <a name="challenges"></a>

# centering image <a name="centering_big_imgs"></a>

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

# navbar not working <a name="Navbar"></a>

This was a really frustrating issue early in development the navbar kept breaking.

At the stage of writing this I am currently still trying to understand what the issue is. I am taking a guess 
that it's something to do with the load times where the system is loading the js file before the DOM is ready slighlty dissapointing that bootstrap didn't think of that being an issue but will add an event listener to make sure DOM is loaded first.

Turns out I was misusing blocks in Django I was actually overwriting postloadJS whereas I thought calling block tag was actually extending I understand that a little better to avoid the issue again I added an empty block called extrapostjs where I will add extra js files for specific pages.

# colors unable to easily add transparency <a name="transparency_without_inherit"></a>

This was really me thinking about me in the future really the easy way to get round this is to add opacity and set that to a value but that means that the element below inherits the opacity... This was a slight problem not a big one really but due to me wanting to make a designer eventually. I quickly looked into how to not inherit opacity. Turns out it's relatively simple just use RGBA to set color easy!

Only issue is that materialize is sert using hex values. Yuck makes sense as its more efficient saving valuable space! How do I fix this then? Due to my prior knowledge with adobve software and photoshop I knew that hex is basically rgb.

Hex uses the first value and mulitplies it by 16 a b c d e f basically mean 10 11 12 13 14 15 respectively 15*16 is 240 the second letter is taken at facevalue. 

So max value is 15 * 16 + 15 which is 255. so all I had to do is create a script to look at materializes code and edit it. In order to be lazy I took the entire css file into word and used replace on paragraphs to make each rule sit on its own line I didn't want it to happen for the } though as they would all be on the same line and I wanted to do a line at a time to for loop through. So i did another replace to add a paragraph after }. 

Then I created a quick and dirty python script and set it to print out the values I wanted. then > the output to another file called newcolors took a few attempts and then I sorted it. The script takes less than a second to run creating a 5k line css file. Next challenge is to create a quick and dirty python file to slap those into a database so I can add the indiviual colors in style tags in the designer allowing me to very efficiently serve user created HTML later but I can imagine that will show up in a later challenge

# Form handler for my contact options page <a name="I_make_life_hard_4_me"></a>

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
for nefarious reasons or because they want to..

This allows me to only validate fields that are not hidden and only submit data of the particular block aswell.

So this will handle every seperate contact option the 
same way. Will need to have a unique form referance to
group all the answers. 

Also allows flexibilty in the future so I can add groups and
change questions whenever I like without any additional changes
to the form handler. 

and have a foreign key to a customer table allowing 
a multiple to one relationship 

# price calculator <a name="Favourite_part"></a>
I wanted to create a unique experience to user allowing them to choose a pricing model and have the page slide off and be replaced by the input screen. There is no need to submit these quotes or save them currently so will have inputs on the left and to the right the answer will show up. The challenge here is to 

# Technology used<a name="technology_used"></a>

## Wireframes<a name="wireframes"></a>
- adobe XD
- 
## Frameworks<a name="frameworks"></a>
- I used the Django framework
- I used github to store the repository and version management
- I used gitpod for editing the code and for posting to github 
- 
## Libraries<a name="libraries"></a>
- bootstrap
- materialize

### Features Left to Implement<a name="features-left-to-implement"></a>

## designer<a name="I_am_way_too_ambitious"></a>

The designer was meant to be the standout feature on this website guaranteeing my a distinction but turns out a content management system is a very complicated piece of work.
So scrapped it and just focused on reusable code setting the foundations for the CMS in the future.

## Manual testing <a name="testing"></a>

Go to contact page 

submit a request

log in as a superuser

click admin link 

check requests

only the questions filled out should be displayed 

they should also be in date order clicking on a request expands the options 

# Automatic testing <a name="I-despise-jsdom"></a>

## img_scroll.js

If you set debug to true it will run automatic tests to determine whether you've made a mistake in your animationprops or if you're missing any properties such as an ID or animationprops. The debugger will also continuously spit out each update and the variables it uses to do it's calculations which can lead to an overdose of information.

The reason I implemented the tests directly into the file is so that when users use the designer it will spit out easy to understand errors and makes my life much easier when trying to debug the code.

Jest while it's likely capable of what I am doing here would be extremely difficult to implement to the level I have implemented in these tests.

The only way to manually test is to see if you put in good info into the start,end,startpos,endpos,direction properties if so it'll do what you want if not it wont. It can be a little difficult to understand initially but it becomes intuitive after a while.

## selection.js

The purpose of this JavaScript file is to allow users to make a multiple selection on the page and have more information or a form displayed. Based on their selections of course. Allowing users to only input information that is relevant to what they want. 

If debug is true it outputs a message to say it is connected and it also allows you to press the space bar to display the elements that have been detected in blue and finally checks if there is a submit button present or form button. 

It doesn't also outputs the selection elements separately as well although not very helpful 

## utility.js

This is all about holding general JavaScript functions such as the hide toggler. It also serves another purpose which is looking for general mistakes in the html. For example duplicate id's

The automatic test output to the console if debug is true all of the elements that are duplicated using queryselectorall to output a list of hyperlinked elements so you can click them and it will display the elements in the elements tab.

## calculator.js

This JavaScript is all about taking an input and looking for a target if it finds a target it will use the calc attribute to convert the input into the target. 

The automatic tests run if debug is true. It will check if it is able to parse a value through to you each input and check the output without actually sending a value. This will output any inputs that failed the test to the console. It will also tell you where it went wrong for example the target doesn't exist or the calc is invalid. 

## journey.js

This JavaScript is all about detecting a pattern in the html file and if it discovers a pattern it makes a link between buttons and their targets. It creates a journey object that contains the parent Id and all the links within that id

The automatic tests check the structure of the journey object if debug is true and ensures that the every link points to another parent if it doesn't it outputs the parent html and the option that was pointing towards it. 

# Validator Testing <a name="validator-testing"></a>

## HTML
type attributes, attribute errors are ignored as they are required by javascript
lang errors are ignored due to lack of time to resolve
info was also ignored due to lack of time to resolve
price calculator page has alot of errors due to the custom attributes I used and I used A LOT of them...
testing was done using:
[W3C validator](https://validator.w3.org/)
# CSS
No errors found using:
[CSS validator](https://jigsaw.w3.org/css-validator/)
# JS
ignored es6 warnings due to lack of development time 


# Unfixed Bugs <a name="unfixed-bugs"></a>


# Deployment <a name="deployment"></a>

I was using github as the repository for the whole project so when I wanted to create a live page it was very easy to do.

## How to clone repository:
 - Go to my github repository
 - Click the code option and then copy the link
 - If you have git installed on your pc you can use git clone followed by the URL 

## How to deploy to Azure:

- The site was deployed to the Azure platform. The steps to deploy are as follows:

- fork repository

- i used gitpod to develop this application so instructions are easier to follow using that

- The arm template is found on this repo its in the file called armtemplate.json

- create an azure account I recommend using github to sign up 

- log out of azure wait 15 mins then log back in or you'll get a really annoying error later on saying it cant set up CI because it cant find your account. no guarantee it wont happen anyways if it does delete the resource group and start again from here.

- go to create a resource near top of homepage

- type this into search bar Template deployment (deploy using custom templates)

- choose the purple box icon

- click create

- click the link: Build your own template in the editor

- replace all text with the contents of the armtemplate.json 

- click save

- choose a name for the resource group I recommend makewebworktest

- click review and create

- click create

- takes a few mins the makewebworkstatictest/default always fails dont know why or what it even is...

- go to the file custom_azure.py

- add test to the end of account_name_os value

- uncomment the second account_key_os replace account_key_os variable with the value of your blob storage access key how to do this is in brackets > (go to resource group > click makewebworkstatictest > access keys (left sidebar) > show (key1) > copy to clipboard)

- run command python3 manage.py collectstatic in the terminal 

- remove the account key

- go to the app service resource

- go to the deployment center (takes a while to load)

- set source to github

- sign in 

- choose repo

- press save 

- go to home django app > settings.py scroll to very bottom 

- edit the variable called AZURE_ACCOUNT_NAME to add test to the end of it

- git add . commit -m and push 

- wait a few minutes and the application should automatically be deployed to azure 

- All done!

# Credits <a name="credits"></a>

Below are the sources of all the media and content 

All hero images were created by me in photoshop
The Logo was made by me in illustrator and photoshop


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

# More coming soon! 
 
## Follow me on github to stay upto date and message me for project ideas/pitches always ready to work with someone.