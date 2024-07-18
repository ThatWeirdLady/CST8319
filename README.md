# Solitaire

### Requirements to run locally:
1. Some form of Git. For windows I recommend GitBash.
 - Link to download for Windows: https://git-scm.com/download/win
2. Node.js
 - Link to download for Windows: https://nodejs.org/en/download/prebuilt-installer
3. IDE I recommend VS Code.
4. Web Browser.

### After Cloning

1. Open Terminal in the project (Shift right-click 'Open GitBash Here').
2. Run the commands `npm ci` and `npm run start`. 
3. Now the project should be running in your browser on localhost:8080. When you save any code file the webpage will reload automatically.

### Primer on Git

Commands to add to a repo:
```bash
git checkout main # This will go to main first, only do that once per "feature" or pull request
git pull # Get all the changes from the internet on your computer
git checkout -b my-feature # Make a new branch for your feature, this is isolated from main and everybody elses code

# Then you modify your files

git status # List all the files that have changed, optional
git diff # Lists all the individual changes in all the files, optional

git add --all # Prepare all your changes for a commit
git commit -m "MY MESSAGE" # Make a new commit with all the prepared changes
git push -u origin my-feature # Push your changes to the internet for others to see 
```

Then you need to go in github.com in the repo and open a pull request.

### Pull Requests

When you make a pull request or push more commits to a branch that has a pull request opened, the following things will happen:

- Github will check to insure the project will build without errors.
- Github will check that there are no lint errors.
- Github will check that the code is formatted according to the prettier config.

If any of these fail, it won't be possible to merge your pull request. You will need to go back and fix the errors and push again. 


   



