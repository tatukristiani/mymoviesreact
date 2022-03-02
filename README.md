# My Movies Websoftware project

This project is a school/hobby project that was first designed to run locally but later on made public.  
Estimated time spent: v1 = 2 Weeks + v2 = 3 weeks  
  
The URL for the website is -> [My Movies](https://tatukristiani.github.io/mymoviesreact/)

# What is My Movies?
This software is a web application that uses a REST API that utilizes The Movie Databases API to present movies and informations about them.  
You can view some movies, their trailers and some information related to them.   

# What can I do with this application?
The main focus of this application is to select movies that you've seen and add them to your "watched list" which is called "My Movies" in the application.  
The application provides information about how many movies you've seen so far (at least according to how many you've added to your list) and how much time you've spent on them in total.  


# Technicalities
This project uses GitHub Pages to deploy the website.  
This project utilized React.js to build the front-end and also node.js was used in the process.   
IDE used for the project was WebStorms 2021.3.2 version.  
The REST API is hosted on heroku and the source code can be found here -> [REST API](https://github.com/tatukristiani/mymoviesapi)  


# Some of the functionalities of the softare
1. **Browse** , here you can browse movies by genre.     
The application shows the movies posters/images and by clicking on them it will take you to a page where you can view some details about the movie and the trailer of the movie.     
Here you can also add the movie to your list IF you are logged in, since adding movies is only for possible when logged in.      
2. **My Movies** , here you can view all the movies you've seen/added to your list.    
It will also tell how much is the total time of those movies and how many movies is in your list.      
3. **Search** , here you can search movies by their title.     
If there are movies available with the title you've provided they will show up on the screen and this page follows the same principle as in **Browse** -> click the movie etc.    
4. **Sign In** , here you can Sign In or Register a new account.   
The page displays these options clearly, just follow the normal steps as you would on any other website that has a Sign In/Register.    
5. **Logout** , after you've logged in a "Logout" button will appear and by clicking it you will be logged out.    

One thing to note is that currently the application logs you out if you close the windows, so there is no way of saving the session at this moment.
