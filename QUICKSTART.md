# ♥ NXComs - Quick Start ♥

Get up and running with NXComs in 30 seconds!

---

## 🚀 Instant Start

### Option 1: Open Directly (Fastest)

```bash
cd /home/kali/nxc-cheatsheet
firefox index.html
```

### Option 2: Local Server

```bash
cd /home/kali/nxc-cheatsheet
./serve.sh
# Visit: http://localhost:8080
```

### Option 3: Docker

```bash
cd /home/kali/nxc-cheatsheet
docker-compose up -d
# Visit: http://localhost:8080
```

---

## 💡 Quick Usage

### 🔍 Search
Type anything in the search bar:
- Command names
- Descriptions
- Flags
- Syntax

### 🎯 Filter by Protocol
Click protocol pills:
- SMB, LDAP, WinRM, SSH, MSSQL, FTP, RDP, WMI

### 📁 Filter by Category
Click category pills:
- Enumeration, Authentication, Credentials, Execution, etc.

### 📋 Copy Commands
Click "Copy" button on any command card

### ⌨️ Keyboard Shortcuts
- `/` - Focus search
- `Esc` - Clear search

---

## 📚 Common Workflows

### Scenario 1: Find SMB Commands
1. Click "SMB" protocol pill
2. Browse or search

### Scenario 2: Find Credential Dumping
1. Click "Credentials" category
2. Search for specific technique

### Scenario 3: Find Kerberos Attacks
1. Type "kerberos" in search
2. See all Kerberos-related commands

---

## 🌐 Deploy Online (GitHub Pages)

```bash
# 1. Create repo on GitHub

# 2. Push code
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/nxcoms.git
git push -u origin main

# 3. Enable GitHub Pages
# Settings → Pages → Source: main

# 4. Your site is live!
# https://YOUR_USERNAME.github.io/nxcoms
```

---

## 🎨 Quick Customization

### Change Colors

Edit `css/style.css`:

```css
:root {
    --pink: #YOUR_COLOR;
    --purple: #YOUR_COLOR;
}
```

### Add Commands

Edit `js/commands.js`:

```javascript
{
    title: "Your Command",
    description: "What it does",
    command: "nxc smb <target> ...",
    protocol: "smb",
    category: "enumeration",
    flags: ["tag1"]
}
```

---

## ⚠️ Legal Notice

**For authorized testing only!**

- ✅ Get permission first
- ✅ Stay in scope
- ✅ Follow laws
- ❌ Never use illegally

---

## 🆘 Need Help?

- **Full docs:** README.md
- **Deployment:** DEPLOYMENT.md
- **Contributing:** CONTRIBUTING.md

---

**That's it! Start hacking!** ♥ 🎯
