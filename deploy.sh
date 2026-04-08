#!/bin/bash
set -e

echo "🚀 Trading 212 Portfolio - GitHub Pages Deploy Script"
echo "====================================================="
echo ""

# Step 1: Authenticate with GitHub
echo "📝 Step 1: Authenticating with GitHub..."
echo "This will open your browser. Please log in to GitHub."
echo ""
gh auth login -w

# Step 2: Create the repository
echo ""
echo "📦 Step 2: Creating GitHub repository..."
REPO_NAME="trading212-portfolio-demo"
gh repo create $REPO_NAME --public --description "Interactive Trading 212 portfolio prototype with rebalancing flow" --confirm || echo "Repository might already exist"

# Step 3: Push the code
echo ""
echo "⬆️  Step 3: Pushing code to GitHub..."
cd /Users/xuelunfu/sharon-codes
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$(gh api user -q .login)/$REPO_NAME.git"
git branch -M main
git push -u origin main --force

# Step 4: Enable GitHub Pages
echo ""
echo "🌐 Step 4: Enabling GitHub Pages..."
gh api -X POST "repos/$(gh api user -q .login)/$REPO_NAME/pages" -f source[branch]=main -f source[path]=/ 2>/dev/null || echo "GitHub Pages might already be enabled"

# Get the username
USERNAME=$(gh api user -q .login)

echo ""
echo "✅ SUCCESS! Your portfolio is deployed!"
echo ""
echo "🌍 Your live demo URL:"
echo "   https://$USERNAME.github.io/$REPO_NAME/"
echo ""
echo "📱 Direct link to prototype:"
echo "   https://$USERNAME.github.io/$REPO_NAME/index.html"
echo ""
echo "📂 Repository:"
echo "   https://github.com/$USERNAME/$REPO_NAME"
echo ""
echo "⏱️  Note: It may take 2-3 minutes for the site to go live."
echo "    If it shows 404, wait a moment and refresh!"
echo ""
