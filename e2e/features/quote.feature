#quote page e girildiginde belirli zmanda tarih bugünden fazla olmalı


# Feature: Quotes
#   As a service provider
#   I want to give price quotes and manage them
#   So that I can develop my business with new tasks
 
#   #works-success-x
#   Scenario: provider views quotes to give price quotes
#     Given I am a provider
#     And I provide "house cleaning" service in "Vinitsa" oblast and "Vinitsa" gorad
#     And there is a new "house cleaning" request in "Vinitsa" oblast and "Vinistsa" gorad
#     And there is a new "house cleaning" request in "Vinitsa" oblast and "barskiy" rayon and "antonovka" gorad
#     When I enter my quotes page
#     Then I should see this request
#     And I should see a button to give quote

#   #works-success-x
#   Scenario: provider cannot see expired request
#     Given I am a provider
#     And I provide "house cleaning" service in "Vinitsa" oblast and "Vinitsa" gorad
#     And there is an expired "house cleaning" request in "Vinitsa" oblast and "Vinistsa" gorad 
#     When I enter my quotes page
#     Then I should not see this request 

#   #works-success-x
#   Scenario: provider cannot see cancelled request
#     Given I am a provider
#     And I provide "house cleaning" service in "Vinitsa" oblast and "Vinitsa" gorad
#     And there is a cancelled "house cleaning" request in "Vinitsa" oblast and "Vinistsa" gorad 
#     When I enter my quotes page
#     Then I should not see this request 

#   #works-success-x
#   Scenario: provider cannot see maximum reached request
#     Given I am a provider
#     And I provide "house cleaning" service in "Vinitsa" oblast and "Vinitsa" gorad
#     And there is a cancelled "house cleaning" request in "Vinitsa" oblast and "Vinistsa" gorad 
#     When I enter my quotes page
#     Then I should not see this request 

#   #works-success-x
#   Scenario: provider gives a price quote
#     Given I am a provider
#     And I provide "house cleaning" service in "Vinitsa" oblast and "Vinitsa" gorad
#     And there is a new "house cleaning" request in "Vinitsa" oblast and "Vinistsa" gorad
#     And there is a new "house cleaning" request in "Vinitsa" oblast and "barskiy" rayon and "antonovka" gorad
#     And I am on my quotes page
#     When I click "Give Quote" button for the first request
#     And I enter "1000" as price
#     And I select "2 months" as time
#     And I enter "I can do business better than others" as message
#     And I submit give quote form
#     Then I should be on quotedetail page
#     And I should see success message telling me I sent quote
#     And I should see "50" as posluga commission 
#     And I should see "950" as my commission 
#     And I should see "I can do business better than others" as chat message
#     And I customer should get an email about the new quote
#     And I customer should get an sms about the new quote
#     And I should get an email about the new quote
#     And admins should get an email about the new quote 
#     And editors should get an email about the new quote

#  #works-success-x
#  Scenario: provider cannot give price quote to expired quote
#     Given I am a provider
#     And I provide "house cleaning" service in "Vinitsa" oblast and "Vinitsa" gorad
#     And there is a new "house cleaning" request in "Vinitsa" oblast and "Vinistsa" gorad
#     And there is an expired "house cleaning" request in "Vinitsa" oblast and "barskiy" rayon and "antonovka" gorad
#     When I click "Give Quote" link of the email I received
#     Then I should be on give quote page
#     And I should see message that the quote is expired
#     And I should not see price textbox
#     And I should not see message textbox  

#   #works-success-x
#   Scenario: provider views a quote that he sent a price quote
#     Given I am a provider
#     And I provide "house cleaning" service in "Vinitsa" oblast and "Vinitsa" gorad
#     And there is a "house cleaning" request in "Vinitsa" oblast and "Vinistsa" gorad that I sent a request 
#     And I am on my quotes page
#     When I click "View Your Quote" button for the request I sent quote 
#     Then I should be on quotedetail page 
#     And I should see "50" as posluga commission 
#     And I should see "950" as my commission 
#     And I should see "I can do business better than others" as chat message

#   #works-success-x
#   Scenario: provider updates a quote he sent
#     Given I am a provider
#     And I provide "house cleaning" service in "Vinitsa" oblast and "Vinitsa" gorad
#     And there is a "house cleaning" request in "Vinitsa" oblast and "Vinistsa" gorad that I sent a request 
#     And I am on quotedetail page of the request I sent quote
#     When I click "Edit Quote" button
#     And I enter "2000" as price
#     And I submit the form
#     Then I should be on quotedetail page
#     And I should see update message telling me I updated quote
#     And I should see "100" as posluga commission 
#     And I should see "1900" as my commission  
#     And I customer should get an email about the updated quote
#     And I should get an email about the updated quote
#     And admins should get an email about the updated quote 
#     And editors should get an email about the updated quote

#   #works-success-x
#   Scenario: provider sends a message to customer
#     Given I am a provider
#     And there is a request I sent quote
#     And I am on quotedetail page of the request I sent quote
#     When I write "please select me" on chat textbox
#     And I click "Send Message" button
#     Then I should see "please select me" on chat history
#     And I should see "Quote Owner" as the person who sent the message
#     And customer should get an email about the message

#   #works-success-x
#   Scenario: customer views quotes received
#     Given I am a customer
#     And I have a request that I have received a quote
#     When I enter myrequests page
#     Then I should see "1 Quotes Received" on my quote
#     And I should see "View Quotes" button 

#   #works-success-x
#   Scenario: customer selects a quote to be done in 2 months
#     Given I am a customer
#     And I have a request that I have received a quote
#     And the quote I received is to be done in 2 months
#     And I am on myrequests page
#     When I click "View Quotes" button 
#     And I click "Select This Quote"
#     And I enter my firstname
#     And I enter my lastname
#     And I enter my address
#     And I submit form
#     Then I should see a success message that reservation has been made
#     And I should see profile of the provider
#     And I should see phone number of the provider
#     And I should see a mesage that provider will provide my service
#     And I should see "Write a review" button
#     And I should get an email about the selected quote
#     And provider should get an email about the selected quote 
#     And provider should get an sms about the selected quote  
#     And admins should get an email about the selected quote 
#     And editors should get an email about the selected quote  

#   #works-success-x
#   Scenario: customer selects a quote to be done tomorrow
#     Given I am a customer
#     And I have a request that I have received a quote
#     And the quote I received is to be done tomorrow
#     And I am on myrequests page
#     When I click "View Quotes" button 
#     And I click "Select This Quote"
#     And I enter my firstname
#     And I enter my lastname
#     And I enter my address
#     And I submit form
#     Then I should see a success message that reservation has been made
#     And I should see profile of the provider
#     And I should see phone number of the provider
#     And I should see a mesage that provider will provide my service
#     And I should not see "Write a review" button
#     And I should get an email about the selected quote
#     And provider should get an email about the selected quote 
#     And provider should get an sms about the selected quote 
#     And admins should get an email about the selected quote 
#     And editors should get an email about the selected quote  

#  #works-success-x
#  Scenario: provider views a selected quote 
#     Given I am a provider
#     And there is a request I sent quote and won
#     When I enter myquotes page
#     Then I should see "I completed service" button
#     And I should see phone number of customer
#     And I should see name of the customer
#     And I should see profile of the customer
#     And I should see address of the customer
#     And I should see a message that I will provide the service 

#  #works-success-x
#  Scenario: provider completes the service 
#     Given I am a provider
#     And there is a request I sent quote and won 
#     And I am on quote success page of that quote
#     When I click "I completed service" button
#     And I confirm service completion
#     Then I should be on servicesuccess page
#     And I should see a message that I completed service
#     And I should see sharing buttons
#     And I should get an email about the completed service
#     And customer should get an email to write review
#     And customer should get an sms to write review
#     And admins should get an email about the completed service
#     And editors should get an email about the completed service

#  #works-success-x
#  Scenario: customer completes the service by writing a review
#     Given I am a customer
#     And there is a quote I selected for my request
#     And provider completed giving me the service
#     And I am on quote success page of that quote
#     When I click "Write Review" button
#     And I update enter "provider completed service on time, I am happy" as my review
#     And I select "5" stars  
#     And I enter "1000" as my budget
#     And I submit my review
#     Then I should be on servicesuccess page
#     And I should see a message that I completed service
#     And I should see sharing buttons
#     And I should get an email about the completed service
#     And provider should get an email to read the review
#     And admins should get an email about the completed service
#     And editors should get an email about the completed service

#  #works-success-x
#  Scenario: customer edits a review
#     Given I am a customer
#     And there is a quote I selected for my request 
#     And I have written a review 
#     When I enter myrequests page
#     And I click "View Quote" button of this request
#     And I click "Edit Review" button
#     And I update enter "I was happy" as my review
#     And I select "4" stars 
#     And I submit my review
#     Then I should be on servicesuccess page
#     And I should see a message that I updated review
#     And I should see sharing buttons 
#     And provider should get an email about the updated review 
#     And admins should get an email about the updated review 
#     And editors should get an email about the updated review 

#  #works-success-x
#  Scenario: provider reads a review
#    Given I am a provider
#     And there is a request I sent quote and won
#     And I have completed the service 
#     When I enter quote success page of that quote 
#     And I click "Read Review" button
#     Then I should be on read review page
#     And I should see the review of the service
#     And I should not see submit button
#     And I should not be able to change the star count
 




 


#  