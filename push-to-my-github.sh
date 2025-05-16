#!/bin/bash

# Script to push to your own GitHub account

echo "Push to Your GitHub Account"
echo "=========================="
echo ""

# Set GitHub username
USERNAME="mayfair73"
echo "Using GitHub username: $USERNAME"

# Stage the docs directory first
echo "Staging documentation files..."
git add docs/

# Commit the docs directory
echo "Committing documentation files..."
git commit -m "Add documentation files in a dedicated docs folder"

# Create the remote with your username
echo "Adding remote 'my-github' pointing to your repository..."
git remote add my-github "https://github.com/$USERNAME/tech-portfolio.git"

echo ""
echo "For the next step, you'll need to:"
echo "1. Go to GitHub (github.com)"
echo "2. Login to YOUR account ($USERNAME)"
echo "3. Click the '+' icon in the top right"
echo "4. Select 'New repository'"
echo "5. Name it 'tech-portfolio'"
echo "6. Set it to public (if you want to share it)"
echo "7. DO NOT initialize with README, .gitignore, or license"
echo "8. Click 'Create repository'"
echo ""

read -p "Once you've created the repository, press Enter to continue..."

# Prompt for personal access token
echo "Enter your GitHub personal access token (will not be displayed):"
echo "If you don't have one, you can create it at: https://github.com/settings/tokens"
echo "Make sure it has 'repo' permissions."
read -s TOKEN
echo ""

# Set up the remote URL with credentials
REMOTE_URL="https://$USERNAME:$TOKEN@github.com/$USERNAME/tech-portfolio.git"

# Push to GitHub
echo "Pushing to your GitHub repository..."
git push -u "$REMOTE_URL" main

# Check if push was successful
if [ $? -eq 0 ]; then
  echo ""
  echo "🎉 Push successful! Your changes are now on YOUR GitHub."
  echo "Visit https://github.com/$USERNAME/tech-portfolio to see your changes."
  echo ""
  echo "You can share this link with your friend so they can see your improvements."
  echo "They can find all documentation in the 'docs' folder."
  echo "They can clone it with: git clone https://github.com/$USERNAME/tech-portfolio.git"
else
  echo ""
  echo "⚠️ Push failed. Please check the error message above."
fi

# Configure the remote for future use (without token)
git remote set-url my-github "https://github.com/$USERNAME/tech-portfolio.git"

# Clear variables for security
USERNAME=""
TOKEN=""
REMOTE_URL=""

echo ""
echo "For future pushes, you can use: git push my-github main"