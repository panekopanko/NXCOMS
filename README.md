# ♥ NXComs - NetExec Interactive Cheatsheet ♥

**Interactive cheatsheet for NetExec (nxc) offensive security tool**

A beautiful, searchable, and filterable command reference for NetExec - the network execution toolkit for Windows/AD environments (successor to CrackMapExec).

---

## ✨ Features

- **🔍 Powerful Search** - Search commands, descriptions, and flags instantly
- **🎯 Smart Filters** - Filter by protocol (SMB, LDAP, WinRM, etc.) and category
- **📋 One-Click Copy** - Copy commands to clipboard with a single click
- **🎨 Beautiful UI** - Pink/purple themed responsive design
- **⌨️ Keyboard Shortcuts** - `/` to search, `Esc` to clear
- **📱 Mobile Friendly** - Fully responsive on all devices
- **⚡ Fast & Lightweight** - Pure vanilla JavaScript, no dependencies
- **🌙 Dark Theme** - Easy on the eyes for late-night pentesting

---

## 🚀 Quick Start

### Option 1: Local Development

```bash
# Navigate to project directory
cd /home/kali/nxc-cheatsheet

# Open in browser
firefox index.html

# Or use Python HTTP server
python3 -m http.server 8080
# Visit http://localhost:8080
```

### Option 2: Deploy to GitHub Pages

```bash
# Create GitHub repository
git init
git add .
git commit -m "Initial commit - NXComs cheatsheet"

# Push to GitHub
git remote add origin https://github.com/yourusername/nxcoms.git
git branch -M main
git push -u origin main

# Enable GitHub Pages
# Go to Settings → Pages → Source: main branch
# Your site will be live at: https://yourusername.github.io/nxcoms
```

### Option 3: Deploy with Docker

```bash
# Build and run
docker build -t nxcoms .
docker run -d -p 8080:80 nxcoms

# Visit http://localhost:8080
```

---

## 📁 Project Structure

```
nxc-cheatsheet/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Pink/purple themed styles
├── js/
│   ├── commands.js     # Command database (100+ commands)
│   └── app.js          # Main application logic
├── README.md           # This file
└── Dockerfile          # Docker deployment (optional)
```

---

## 🎯 Usage

### Search Commands

Type in the search bar to find commands by:
- Command name
- Description
- Command syntax
- Flags/tags

### Filter by Protocol

Click protocol pills to filter:
- SMB
- LDAP
- WinRM
- SSH
- MSSQL
- FTP
- RDP
- WMI

### Filter by Category

Click category pills to filter:
- Enumeration
- Authentication
- Credentials
- Execution
- Exploitation
- Persistence
- Lateral Movement

### Copy Commands

Click the "Copy" button on any command card to copy the command to your clipboard. The command is automatically cleaned of HTML formatting.

### Keyboard Shortcuts

- `/` - Focus search input
- `Esc` - Clear search and blur input

---

## 📝 Adding New Commands

Edit `js/commands.js` and add new command objects:

```javascript
{
    title: "Command Title",
    description: "What this command does",
    command: "nxc smb <target> -u <username> -p <password> --some-flag",
    protocol: "smb",        // smb, ldap, winrm, ssh, mssql, ftp, rdp, wmi
    category: "enumeration", // enumeration, authentication, credentials, execution, exploitation, persistence, lateral
    flags: ["tag1", "tag2"]  // Additional searchable tags
}
```

---

## 🎨 Customization

### Change Colors

Edit `css/style.css` variables:

```css
:root {
    --pink: #e942f5;      /* Primary pink */
    --purple: #cb16ff;    /* Secondary purple */
    --dark: #1a1a2e;      /* Dark background */
    --darker: #0f0f1e;    /* Darker background */
    --darkest: #0a0a14;   /* Darkest background */
}
```

### Add More Protocols

1. Add protocol to filter pills in `index.html`
2. Add commands with that protocol in `js/commands.js`
3. Optional: Add protocol-specific styling in `css/style.css`

---

## 🌐 Deployment

### GitHub Pages (Free)

1. Push to GitHub
2. Go to repository Settings → Pages
3. Set source to `main` branch
4. Your site will be live at `https://username.github.io/repo-name`

### Netlify (Free)

1. Sign up at https://netlify.com
2. Drag and drop the `nxc-cheatsheet` folder
3. Your site is live instantly

### Vercel (Free)

1. Sign up at https://vercel.com
2. Import your GitHub repository
3. Deploy with one click

### Self-Hosted (Nginx)

```nginx
server {
    listen 80;
    server_name nxcoms.yourdomain.com;

    root /var/www/nxcoms;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🛠️ Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients and animations
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **Font Awesome** - Icons
- **Google Fonts** - Typography

---

## 📚 Resources

### Official NetExec Resources

- **GitHub:** https://github.com/Pennyw0rth/NetExec
- **Wiki:** https://www.netexec.wiki/
- **Discord:** https://discord.gg/netexec

### Inspiration

- **WADComs:** https://wadcoms.github.io/
- **GTFOBins:** https://gtfobins.github.io/

---

## ⚠️ Disclaimer

This tool is for **authorized security testing only**. NetExec is a powerful offensive security tool that should only be used on systems you own or have explicit permission to test.

**Always:**
- ✅ Get written authorization before testing
- ✅ Stay within the agreed scope
- ✅ Follow responsible disclosure practices
- ✅ Respect privacy and data protection laws

**Never:**
- ❌ Use on systems without permission
- ❌ Cause damage or disruption
- ❌ Access or exfiltrate sensitive data without authorization
- ❌ Use for illegal purposes

---

## 🤝 Contributing

Contributions are welcome! To add commands:

1. Fork the repository
2. Edit `js/commands.js` with new commands
3. Test locally
4. Submit a pull request

**Command Guidelines:**
- Use clear, descriptive titles
- Provide helpful descriptions
- Include all relevant flags
- Use proper protocol and category tags
- Test commands before submitting

---

## 📜 License

MIT License - Use freely, attribute if you want ♥

---

## 💜 Credits

**Made with love for the offensive security community**

- **NetExec:** By Pennyw0rth and contributors
- **Inspired by:** WADComs
- **Theme:** Pink/purple cyberpunk aesthetic

---

## 🎯 Roadmap

- [ ] Add more LDAP commands
- [ ] Add RDP exploitation commands
- [ ] Add module-specific examples
- [ ] Add "favorites" feature
- [ ] Export filtered results
- [ ] Dark/Light theme toggle
- [ ] Command history
- [ ] Share specific commands via URL

---

**Happy hacking!** ♥ 🎯

For questions, issues, or suggestions, open an issue on GitHub.
