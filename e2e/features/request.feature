
Feature: Request Page
  As a visitor
  I want to request price quotes from different service providers
  So that I can select the most suitable company to get service


# #################### VISITOR #####################


  #works-success
  Scenario: visitor creates a carpenter request for specific time
    Given I am a visitor
    And I am on the request page
    When I select "Электропроводка" as the service I want 
    And I enter "я хочу дверь срочно" as details
    And I enter "1000" as budget
    And I select "Киевская область" as oblast
    And I select "Киев город" as raion
    And I select "Подольский район" as gorad
    And I select "Определенное время" as when
    And I select "tomorrow" at "15:00" as date
    And I enter "0532999111" as my mobile phone
    And I select "Можно звонить мне" as my notification preference
    And I enter "canercak113232@gmail.com" as my email
    And I submit the page
    And I enter the sms code I received
    And I click approve button
    Then my request request should be created
    And I should be on request success page
    And I should see "Carpenter" as the service
    And I should see a button to edit the request
    And I should see a button to delete the request
    And I should see links for related requests
    And I should get logged in
    And I should receive login email 
    And I should receive new request email 
    And admins should be notified  
    And editors should be notified

#   #works-success
#   Scenario: visitor creates a Custom jewelry request to do in 4 months by selecting the service
#     Given I am a visitor
#     And I am on the request page
#     When I select "Custom jewelry" by using service selection form
#     And I enter "I want a Custom jewelry" as details
#     And I select "Kyevskaia oblast" as oblast
#     And I select "Kyev gorod" as raion
#     And I select "Podolskyi raion" as gorad
#     And I select "In 4 months" as when 
#     And I enter "05329999999" as my mobile phone
#     And I select "Quoter can call me" as my notification preference
#     And I enter "canercak@gmail.com" as my email
#     And I submit the page
#     And I enter the sms code I received
#     And I click approve button
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Carpenter" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should get logged in
#     And I should receive login email
#     And I should receive new request email
#     And providers who give "Carpenter" service should be notified
#     And editors should be notified

#   #works-success
#   Scenario: visitor creates a car insurance request to do in two months 
#     Given I am a visitor
#     And I am on the request page
#     When I select "Car insurance" as the service I want 
#     And I enter "I want car insurance" as details
#     And I select "Luganskaia oblast" as oblast
#     And I select "Lugansk gorod" as raion
#     And I select "Lugansk" as gorad
#     And I select "In 2 months" as when 
#     And I enter "05329999999" as my mobile phone
#     And I select "Keep my number secret" as my notification preference
#     And I enter "canercak@gmail.com" as my email
#     And I submit the page
#     And I enter the sms code I received
#     And I click approve button
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Car insurance" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should get logged in
#     And I should receive login email
#     And I should receive new request email
#     And providers who give "Car insurance" service should be notified
#     And editors should be notified

#   #works-success
#   Scenario: visitor creates an unknown service request 
#     Given I am a visitor
#     And I am on the request page
#     When I enter "Motorcycle rental" as the service I want 
#     And I enter "I want to rent a motorcycle" as details
#     And I select "Vynnytskaia oblast" as oblast
#     And I select "Vynnytsa gorod" as raion 
#     And I select "I just look for prices" as when 
#     And I enter "05329999999" as my mobile phone
#     And I select "Quoter can call me" as my notification preference
#     And I enter "canercak@gmail.com" as my email
#     And I submit the page
#     And I enter the sms code I received
#     And I click approve button
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Motorcycle rental" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should get logged in
#     And I should receive login email
#     And I should receive new request email
#     And providers should not be notified
#     And editors should be notified 

#   #works-success
#   Scenario: visitor tries to create a request with someone elses mobile phone
#     Given I am a visitor
#     And I am on the request page
#     And there is a user in the system with email "alihanbilir@gmail.com" and phone "05329999999"
#     When I enter "Motorcycle rental" as the service I want 
#     And I enter "I want to rent a motorcycle" as details
#     And I select "Vynnytskaia oblast" as oblast
#     And I select "Vynnytsa gorod" as raion 
#     And I select "I just look for prices" as when 
#     And I enter "05329999999" as my mobile phone
#     And I select "Quoter can call me" as my notification preference
#     And I enter "canercak@gmail.com" as my email
#     And I submit the page
#     Then en I should be on sms verification page



#   #works-success
#   Scenario: visitor sends request to specific provider
#     Given I am a visitor
#     And there is a provider that provides "car insurance" service
#     And I am getting request from that provider
#     When I select "Car insurance" as the service I want 
#     And I enter "I want car insurance" as details
#     And I select "Luganskaia oblast" as oblast
#     And I select "Lugansk gorod" as raion
#     And I select "Lugansk" as gorad
#     And I select "In 2 months" as when 
#     And I enter "05329999999" as my mobile phone
#     And I select "Keep my number secret" as my notification preference
#     And I enter "canercak@gmail.com" as my email
#     And I submit the page
#     And I enter the sms code I received
#     And I click approve button
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Car insurance" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should get logged in
#     And I should receive login email
#     And I should receive new request email 
#     And only the provider I requested should be notified
#     And editors should be notified



# #################### LOGGED OUT USER ##################### 


#   #works-success
#   Scenario: logged out user without request creates a request with friends phone and own email
#     Given I am a user
#     And I am logged out 
#     And I am on the request page
#     And there is a user in the system with email "alihanbilir@gmail.com" and phone "05329999999"
#     When I select "Carpet cleaning" as the service I want 
#     And I enter "2" for question "1"
#     And I enter "0" for question "2"
#     And I select "Yes" for question "3"
#     And I enter "I want carpet cleaning" as details
#     And I select "Kyevskaia oblast" as oblast
#     And I select "Kyev gorod" as raion
#     And I select "Podolskyi raion" as gorad
#     And I select "Specific Time (in three weeks)" as when
#     And I select "tomorrow" at "09:00" as date
#     And I enter "05329999999" as my mobile phone
#     And I select "Quoter can call me" as my notification preference
#     And I enter "canercak@gmail.com" as my email
#     And I submit the page
#     And I enter my login details correctly
#     And I enter the sms code I received
#     And I click approve button
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Carpet cleaning" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should get logged in 
#     And I should receive new request email
#     And providers who give "Carpet cleaning" service should be notified
#     And editors should be notified

#   #works-success
#   Scenario: logged out user without request creates a request with a new mobile phone and own email
#     Given I am a user
#     And I am logged out 
#     And I am on the request page
#     When I select "Carpet cleaning" as the service I want 
#     And I enter "2" for question "1"
#     And I enter "0" for question "2"
#     And I select "Yes" for question "3"
#     And I enter "I want carpet cleaning" as details
#     And I select "Kyevskaia oblast" as oblast
#     And I select "Kyev gorod" as raion
#     And I select "Podolskyi raion" as gorad
#     And I select "Specific Time (in three weeks)" as when
#     And I select "tomorrow" at "09:00" as date
#     And I enter "05328888888" as my mobile phone
#     And I select "Quoter can call me" as my notification preference
#     And I enter "alihanbilir@gmail.com" as my email
#     And I submit the page
#     And I enter my login details correctly
#     And I enter the sms code I received
#     And I click approve button
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Carpet cleaning" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should get logged in 
#     And I should receive new request email
#     And providers who give "Carpet cleaning" service should be notified
#     And editors should be notified  

#   #works-success
#   Scenario: logged out user with request creates a request with same mobile phone 
#     Given I am a user
#     And I am logged out
#     And I am on the request page
#     And I have a request I created with mobile phone "05328888888"
#     When I select "Overlock carpets" as the service I want  
#     And I enter "I want Overlock carpets" as details
#     And I select "Khersonskaia oblast" as oblast
#     And I select "Belozerskyi raion" as raion
#     And I select "Aleksandrovka" as gorad
#     And I select "Specific Time (in three weeks)" as when
#     And I select "tomorrow" at "09:00" as date
#     And I enter "05328888888" as my mobile phone
#     And I select "Quoter can call me" as my notification preference
#     And I enter "alihanbilir@gmail.com" as my email
#     And I submit the page
#     And I enter my login details correctly
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Overlock carpets" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should get logged in 
#     And I should receive new request email
#     And providers who give "Overlock carpets" service should be notified
#     And editors should be notified 

#   #works-success
#   Scenario: logged out user cannot login for the first time but logins on the second time with a current phone
#     Given I am a user
#     And I am logged out
#     And I am on the request page 
#     And I have a request I created with mobile phone "05328888888"
#     When I select "Overlock carpets" as the service I want  
#     And I enter "I want Overlock carpets" as details
#     And I select "Khersonskaia oblast" as oblast
#     And I select "Belozerskyi raion" as raion
#     And I select "Aleksandrovka" as gorad
#     And I select "Specific Time (in three weeks)" as when
#     And I select "tomorrow" at "09:00" as date
#     And I enter "05328888888" as my mobile phone
#     And I select "Quoter can call me" as my notification preference
#     And I enter "alihanbilir@gmail.com" as my email
#     And I submit the page
#     And I enter my login details wrongly
#     And I enter my login details correctly
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Overlock carpets" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should get logged in 
#     And I should receive new request email
#     And providers who give "Overlock carpets" service should be notified
#     And editors should be notified 

#   #works-success
#   Scenario: logged out user cannot login for the first time but logins on the second time with a new phone
#     Given I am a user
#     And I am logged out
#     And I am on the request page 
#     And I have a request I created with mobile phone "05328888888"
#     When I select "Overlock carpets" as the service I want  
#     And I enter "I want Overlock carpets" as details
#     And I select "Khersonskaia oblast" as oblast
#     And I select "Belozerskyi raion" as raion
#     And I select "Aleksandrovka" as gorad
#     And I select "Specific Time (in three weeks)" as when
#     And I select "tomorrow" at "09:00" as date
#     And I enter "05329999999" as my mobile phone
#     And I select "Quoter can call me" as my notification preference
#     And I enter "alihanbilir@gmail.com" as my email
#     And I submit the page
#     And I enter my login details wrongly
#     And I enter my login details correctly
#     And I enter the sms code I received
#     And I click approve button
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Overlock carpets" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should get logged in 
#     And I should receive new request email
#     And providers who give "Overlock carpets" service should be notified
#     And editors should be notified  

# #################### LOGGED IN USER #####################

 
#   #works-success
#   Scenario: logged in user without request enters request page
#     Given I am a user
#     And I am logged in
#     And I do not have a request
#     When I enter request page
#     Then I should not see email textbox
#     And I should see mobile phone textbox empty
     
#   #works-success
#   Scenario: logged in user with multiple requests enters request page
#     Given I am a user
#     And I am logged in
#     And I have two requests 
#     When I enter request page
#     Then I should see the mobile phone of the last request as my mobile phone
#     And I should see place of the last request as my place 
#     And I should see "tomorrow" at "12:00" as date

#   #works-success
#   Scenario: logged in user without a request creates a Overlock carpets request  
#     Given I am a user
#     And I am logged in
#     And I am on the request page 
#     And I do not have any requests
#     When I select "Overlock carpets" as the service I want  
#     And I enter "I want Overlock carpets" as details
#     And I select "Khersonskaia oblast" as oblast
#     And I select "Belozerskyi raion" as raion
#     And I select "Aleksandrovka" as gorad
#     And I select "Specific Time (in three weeks)" as when
#     And I select "tomorrow" at "09:00" as date
#     And I enter "05328888888" as my mobile phone
#     And I select "Quoter can call me" as my notification preference 
#     And I submit the page
#     And I enter the sms code I received
#     And I click approve button
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Overlock carpets" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should receive new request email
#     And providers who give "Overlock carpets" service should be notified
#     And editors should be notified

#   #works-success
#   Scenario: logged in user with request creates a Overlock carpets request request with same mobile phone 
#     Given I am a user
#     And I am logged in
#     And I am on the request page
#     And I have a request I created with mobile phone "05328888888"
#     When I select "Overlock carpets" as the service I want  
#     And I enter "I want Overlock carpets" as details
#     And I select "Khersonskaia oblast" as oblast
#     And I select "Belozerskyi raion" as raion
#     And I select "Aleksandrovka" as gorad
#     And I select "Specific Time (in three weeks)" as when
#     And I select "tomorrow" at "09:00" as date
#     And I enter "05328888888" as my mobile phone
#     And I select "Quoter can call me" as my notification preference 
#     And I submit the page 
#     Then my request request should be created
#     And I should be on request success page
#     And I should see "Overlock carpets" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests 
#     And I should receive new request email
#     And providers who give "Overlock carpets" service should be notified
#     And editors should be notified

#   #works-success
#   Scenario: logged in user with request creates a Overlock carpets request with new mobile phone 
#     Given I am a user
#     And I am logged in
#     And I am on the request page
#     And I have a request I created with mobile phone "05327777777"
#     When I select "Overlock carpets" as the service I want  
#     And I enter "I want Overlock carpets" as details
#     And I select "Khersonskaia oblast" as oblast
#     And I select "Belozerskyi raion" as raion
#     And I select "Aleksandrovka" as gorad
#     And I select "Specific Time (in three weeks)" as when
#     And I select "tomorrow" at "09:00" as date
#     And I enter "05328888888" as my mobile phone
#     And I select "Quoter can call me" as my notification preference 
#     And I submit the page 
#     And I enter the sms code I received
#     And I click approve button
#     Then my request request should be created
#     And I should be on request success page
#     And I should see request success message
#     And I should see "Overlock carpets" as the service
#     And I should see a button to edit the request
#     And I should see a button to delete the request
#     And I should see links for related requests
#     And I should receive new request email
#     And providers who give "Overlock carpets" service should be notified
#     And editors should be notified  

#     #works-success
#     Scenario: logged in user creates a request with a picture
#         Given I am a user
#         And I am logged in
#         And I am on the request page 
#         When I select "Overlock carpets" as the service I want  
#         And I enter "I want Overlock carpets" as details
#         And I select "Khersonskaia oblast" as oblast
#         And I select "Belozerskyi raion" as raion
#         And I select "Aleksandrovka" as gorad
#         And I select "Specific Time (in three weeks)" as when
#         And I select "tomorrow" at "09:00" as date
#         And I enter "05328888888" as my mobile phone
#         And I select "Quoter can call me" as my notification preference 
#         And I load a picture
#         And I enter the sms code I received
#         And I click approve button
#         Then my request request should be created
#         And I should be on request success page
#         And I should see request success message
#         And I should see "Overlock carpets" as the service
#         And I should see the picture I added 
#         And I should be able to zoom in to the picture



 
#  ###############request detail page ############
  
#  #works-success
#  Scenario: user views non quoted request
#     Given I am a user
#     And I am logged in 
#     And I have a "Carpenter" request
#     And no provider quoted request yet
#     And I am on "Carpenter" request detail page 
#     When I click "Edit Request" button 
#     Then I should be able to change service name
#     And I should be able to change time
#     And I should not be able to change mobile phone

#  #works-success
#   Scenario: user updates place of non quoted request
#     Given I am a user
#     And I am logged in
#     And I have a "Carpenter" request in "Khersonskaia oblast, Belozerskyi raion, Aleksandrovka" place
#     And no provider quoted request yet
#     And I am on "Carpenter" request detail page 
#     When I click "Edit Request" button
#     And I select "Khmelnytskaia oblast" as oblast
#     And I select "Belogorskyi raion" as raion
#     And I select "Belogore" as gorad  
#     And I submit the page 
#     Then the request should be updated
#     And I should be on request detail page
#     And I should see update success message
#     And I should see "Belogorskyi raion, Gulovtsy" as place  
#     And editors should be notified

#   #works-success
#   Scenario: user updates time of a quoted request
#     Given I am a user
#     And I am logged in
#     And I have a "Carpenter" request in "Khersonskaia oblast, Belozerskyi raion, Aleksandrovka" place
#     And no provider quoted request yet
#     And I am on "Carpenter" request detail page 
#     When I click "Edit Request" button
#     And I select "Khmelnytskaia oblast" as oblast
#     And I select "Belogorskyi raion" as raion
#     And I select "Belogore" as gorad  
#     And I submit the page 
#     Then the request should be updated
#     And I should be on request detail page
#     And I should see update success message
#     And I should see "Khmelnytskaia oblast, Belogorskyi raion, Gulovtsy" as place 
#     And providers who gave quote to my request should be notified
#     And editors should be notified
 
#   #works-success
#   Scenario: user edits details of request from request success page
#     Given I am a user
#     And I am logged in
#     And I have a "Carpenter" request for with details "I need carpenter now" 
#     And I am on "Carpenter" request success page
#     When I click "Edit Request" button
#     And I change request detail to "I need carpenter tomorrow" 
#     And I submit the page 
#     Then the request should be updated
#     And I should be on request success page
#     And I should see update success message
#     And I should see "I need carpenter tomorrow" as request detail 
#     And editors should be notified 

#   #works-success
#   Scenario: user edits questions of request from request success page
#     Given I am a user
#     And I am logged in
#     And I have a "Carpenter" request with "Furniture Making" and "Bed" as answers
#     And I am on "Carpenter" request success page
#     When I click "Edit Request" button
#     And I change first question to "Repairs"
#     And I change first question to "Table"
#     And I submit the page 
#     Then the request should be updated
#     And I should be on request success page
#     And I should see update success message
#     And I should see "Repairs" for the first question
#     And I should see "Table" for the second question 
#     And editors should be notified





 
