# Feature: Homepage 
#   As a visitor
#   I want to visit the homepage
#   So that I can access the various features the site offers me

# #Success
#   Scenario: visitor visits homepage
#     Given I am a visitor
#     When I visit homepage
#     Then I should see login link 
#     And I should see sign up link 
#     And I should see russian as default language
#     And I should navbar with 7 subjects

#   Scenario: logged in user visits homepage
#     Given I am a user
#     And I am logged in  
#     When I visit homepage
#     Then I should see my picture
#     And I should see my name
#     And I should see dashboard link on navbar
#     And I should see requests link on navbar 

#   Scenario: visitor clicks login link
#     Given I am a visitor
#     And I am on the homepage
#     When I click login link
#     Then I should be on login page 

#   Scenario: visitor clicks sign up link
#     Given I am a visitor
#     And I am on the homepage
#     When I click login link
#     Then I should be on login page 

#   Scenario: visitor clicks a subject
#     Given I am a visitor
#     And I am on the homepage
#     And language selection is english
#     When I click 'Cleaning' subject link
#     Then I should be on 'Cleaning' subject page
#     And I should see popular services of 'Cleaning'
#     And I should see all 'Cleaning' services

#   Scenario: visitor clicks give service button
#     Given I am a visitor
#     And I am on the homepage 
#     When I click on the button to become service provider
#     And I sign up
#     Then I should be on new profile page

#   Scenario: logged in user clicks give service button
#     Given I am a user
#     And I am logged in
#     And I am on the homepage 
#     When I click on button to become service provider
#     Then I should be on new profile page

#   Scenario: logged in user clicks give service link
#     Given I am a user
#     And I am logged in
#     And I am on the homepage 
#     When I click on my name
#     When I click on link to become service provider
#     Then I should be on new profile page

#   Scenario: visitor clicks get quote button
#     Given I am a visitor
#     And I am on the homepage 
#     When I click on the button to get quote
#     Then I should be on new request page

#   Scenario: visitor selects a service that exists by full keyword
#     Given I am a visitor
#     And I am on the homepage  
#     And language selection is english
#     When I enter 'Carpenter' as the service I am looking for
#     And I select 'Carpenter' service from autocomplete list
#     Then I should be on request page
#     And 'Carpenter' service should be selected
#     And I should see questions for 'Carpenter' service

#   Scenario: visitor selects a service that exists by partial keyword
#     Given I am a visitor
#     And I am on the homepage  
#     And language selection is english
#     When I enter 'Carp' as the service I am looking for
#     And I select 'Carpenter' service from autocomplete list
#     Then I should be on request page
#     And 'Carpenter' service should be selected
#     And I should see questions for 'Carpenter' service
 
#   Scenario: visitor requests a service that does not exist by enter key
#     Given I am a visitor
#     And I am on the homepage  
#     And language selection is english
#     When I enter 'ballroom dancing lessons' as the service I am looking for
#     And I do not select anything
#     And I press enter key
#     Then I should be on request page
#     And 'ballroom dancing lessons' should be on the service box
#     And no service should be selected

#   Scenario: visitor requests a service that does not exist by go button
#     Given I am a visitor
#     And I am on the homepage  
#     And language selection is english
#     When I enter 'ballroom dancing lessons' as the service I am looking for
#     And I do not select anything
#     And I click go button
#     Then I should be on request page
#     And 'ballroom dancing lessons' should be on the service box
#     And no service should be selected

# #Fail
#   Scenario: Fail to find service that doesn't exist
#     Given I am on the homepage
#     When I enter 'xxxxx' keyword as the service I am looking for
#     Then I should not see any results
 
#   Scenario: Fail to find service with keyword of another language
#     Given I am on the homepage
#     And I have selected russian language
#     When I enter 'Carp' keyword as the service I am looking for
#     Then I should not see any results





#   # ####################

#   # Scenario: Signed in user without past request goes to new request page
#   #   Given I am on the homepage
#   #   And I am logged in
#   #   And I do not have a past request
#   #   When I click on the button to get a request
#   #   Then I should be on new request page
#   #   And phone number should not be filled in
#   #   And I should see the email field

#   # Scenario: Signed in user with past request goes to new request page
#   #   Given I am on the homepage
#   #   And I am logged in
#   #   And I have multiple requests
#   #   When I click on the button to get a request
#   #   Then I should be on new request page
#   #   And phone number should be filled in as in the last request
#   #   And I should not see the email field
#   #   And province should be selected as in the last request
#   #   And district should be selected as in the last request



