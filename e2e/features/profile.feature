
# Feature: Service Provider
#   As a visitor
#   I want to become a service provider
#   So that I can give quotes to my potential customers  
 
#  #works-success
#   Scenario: user creates profile by searching for the service
#     Given I am a user
#     And I'm logged in 
#     And I'm on the new profile page
#     When I select my business type as company
#     And I enter my name and lastname
#     And I enter my company mobile phone 
#     And I select the oblast of my company
#     And I select the rayon of my company
#     And I select the gorad of my company
#     And I enter my business address
#     And I select picture
#     And I select "home cleaning" service by searching
#     And I enter introduction about the services I provide
#     And I submit the form 
#     Then my profile should be created
#     And I should be on addlink page 
#     And I should see the link to add to my webpage
#     And I should receive a welcome as a provider email 
#     And my profile statistics should be updated

#   #works-success
#   Scenario: user creates profile by selecting service from list
#     Given I am a user
#     And I'm logged in 
#     And I'm on the new profile page
#     When I select my business type as company
#     And I enter my name and lastname
#     And I enter my company mobile phone 
#     And I select the oblast of my company
#     And I select the rayon of my company
#     And I select the gorad of my company
#     And I enter my business address
#     And I select picture
#     And I add multiple profile pictures
#     And I select "apartment cleaning" service by selecting from list
#     And I enter introduction about the services I provide
#     And I submit the form 
#     Then my profile should be created
#     And I should be on addlink page 
#     And I should receive a welcome as a provider email 
#     And my profile statistics should be updated

#   #works-success
#   Scenario: user cannot create a service that doesn't exist
#    Given I am a user
#     And I'm logged in 
#     And I'm on the new profile page
#     When I select my business type as company
#     And I enter my name and lastname
#     And I enter my company mobile phone 
#     And I select the oblast of my company
#     And I select the rayon of my company
#     And I select the gorad of my company
#     And I enter my business address
#     And I select picture
#     And I add multiple profile pictures
#     And I enter "apartment" on the service textbox
#     And I enter introduction about the services I provide
#     And I submit the form 
#     Then I should see a message telling me profile cannot be created and service doesn't exist

#   #works-success
#   Scenario: user cannot create the same service in the same oblast
#    Given I am a user
#     And I'm logged in 
#     And I'm on the new profile page
#     And I already have a profile 
#     When I select my business type as company
#     And I enter my name and lastname
#     And I enter my company mobile phone 
#     And I select the oblast of my company as my previous profile
#     And I select the rayon of my company 
#     And I select the gorad of my company
#     And I enter my business address
#     And I select picture
#     And I add multiple profile pictures
#     And I select "apartment cleaning" service by selecting from list
#     And I enter introduction about the services I provide
#     And I submit the form 
#     Then I should see a message telling me profile cannot be created because there is one in the oblast
 

#   #works-success
#   Scenario: user cannot save without service
#     Given I am a user
#     And I'm logged in 
#     And I'm on the new profile page
#     When I select my business type as company
#     And I enter my name and lastname
#     And I enter my company mobile phone 
#     And I select the oblast of my company
#     And I select the rayon of my company
#     And I select the gorad of my company
#     And I select picture 
#     And I enter my business address
#     And I select picture 
#     And I submit the form 
#     Then I should get an error notification for service


#   #works-success
#   Scenario: user cannot save without picture
#     Given I am a user
#     And I'm logged in 
#     And I'm on the new profile page
#     When I select my business type as company
#     And I enter my name and lastname
#     And I enter my company mobile phone 
#     And I select the oblast of my company
#     And I select the rayon of my company
#     And I select the gorad of my company
#     And I enter my business address
#     And I select "apartment cleaning" service by selecting from list
#     And I submit the form 
#     Then I should get an error notification for picture
#  