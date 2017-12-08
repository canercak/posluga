
# Feature: Finances
#   As a service provider
#   I want to give price quotes and manage them
#   So that I can develop my business with new tasks
 
#   #works-success-x
#   Scenario: provider views finances
#     Given I am a provider
#     And I have completed a service for "500" hrivna 
#     And I have sent "300" hrivna to Posluga.ua 
#     When I enter "Finances" page
#     Then I should see my balance as "-200"

#   #works-success-x
#   Scenario: provider views transactions
#     Given I am a provider
#     And I have completed a service for "500" hrivna 
#     And I have sent "300" hrivna to Posluga.ua 
#     When I enter finances page
#     And I click "Transactions"
#     Then I should see "Quote Commission to Pay" type with "-500" as amount and "-500" as balance
#     And I should see "Bank Payment" type with "+300" as amount and "-200" as balance
#     And I should see "-200" as final balance

#   #works-success-x
#   Scenario: provider views bank account to send money
#     Given I am a provider
#     And I have completed a service for "500" hrivna 
#     And I have sent "300" hrivna to Posluga.ua 
#     When I enter finances page
#     And I click "Add Money by Bank Transfer" 
#     And I should see bank details of posluga
#  