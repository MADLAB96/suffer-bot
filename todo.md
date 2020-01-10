## Todo
 - more commands
    - [ ] lunch command (if there is ever interest for it)
    - [ ] RUBY
      - [ ] Actually find a service to upload pictures too. (imgur API sucks)
      - [ ] Add special case to dog command
    - [ ] dota counter picker
      - [ ] Explore different APIs that might supply this data (opendota, dotabuff, etc)
      - [ ] Limit this and DotaPicker to a bots channel.

 - [x] Twitch integration (bot re-write)
    - [x] To make commands generic (Twitch, discord, etc.)
    - [x] Remove Commando, replace with generic class system so commands can be for both Twitch and Discord (or any other).
    - [x] Modular commands (Discord(A,B,C), Twitch(A, C, D)) given commands A, B, C, D
    - [x] distinguish Commands and Responses      
      - My main critism of Commando. Simple text responses are commands.

 - [ ] finishing Rewrite
   - [X]  Implement Commands/Responses with Attachments
   - [ ]  One to many global aliases
   - [ ]  Trivia??? 
     - it kinda sucks, needs new API if its to be added back

 - [ ] Database integration. (mongo lite?? if exists otherwise do sqlite idc)
    - [ ] basic metrics 
    - [ ] "API" using commands to add/remove/update stored responces
      - Could start this before the DB is up by pointing to local storage
 
 - [ ] Start to implement permissions and admin capabilities
    - [ ] Admin user can use certain commands
    - [ ] Limit certain commands to 'bot channels'

 - [ ] Add logging (watson) back in.
 
 ### Cleanup TODO tags in code.
