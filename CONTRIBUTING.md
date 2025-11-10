# ♥ Contributing to NXComs ♥

Thank you for contributing to NXComs! This guide will help you add new NetExec commands to the cheatsheet.

---

## 🎯 How to Contribute

### 1. Adding New Commands

The easiest way to contribute is by adding new NetExec commands!

**Steps:**

1. Fork the repository
2. Edit `js/commands.js`
3. Add your command following the template below
4. Test locally
5. Submit a pull request

### 2. Command Template

```javascript
{
    title: "Command Title",
    description: "Clear description of what this command does",
    command: "nxc <protocol> <target> -u <username> -p <password> --flags",
    protocol: "smb",        // smb, ldap, winrm, ssh, mssql, ftp, rdp, wmi
    category: "enumeration", // enumeration, authentication, credentials, execution, exploitation, persistence, lateral
    flags: ["tag1", "tag2", "tag3"]  // Additional searchable tags
}
```

### 3. Command Guidelines

**Title:**
- Clear and concise
- Start with action verb (Enumerate, Dump, Execute, etc.)
- Examples: "Enumerate Users", "Dump SAM Hashes"

**Description:**
- Explain what the command does
- Include important details or warnings
- Keep it under 100 characters if possible

**Command:**
- Use placeholders in angle brackets: `<target>`, `<username>`, `<password>`
- Keep original NetExec syntax
- Test the command before submitting
- For multi-line commands, use `\n`

**Protocol:**
Must be one of:
- `smb`
- `ldap`
- `winrm`
- `ssh`
- `mssql`
- `ftp`
- `rdp`
- `wmi`

**Category:**
Must be one of:
- `enumeration` - Discovering information
- `authentication` - Login/auth methods
- `credentials` - Dumping or extracting credentials
- `execution` - Running commands
- `exploitation` - Exploiting vulnerabilities
- `persistence` - Maintaining access
- `lateral` - Lateral movement

**Flags:**
- Lowercase, hyphen-separated
- Descriptive tags for searching
- Examples: `["kerberos", "password-spray", "ntlm"]`

---

## 📝 Example Contributions

### Good Example

```javascript
{
    title: "Enumerate Shares (Authenticated)",
    description: "List SMB shares with valid credentials",
    command: "nxc smb <target> -u <username> -p <password> --shares",
    protocol: "smb",
    category: "enumeration",
    flags: ["shares", "authenticated"]
}
```

### Another Good Example

```javascript
{
    title: "Kerberoasting Attack",
    description: "Request TGS tickets for accounts with SPNs and save to file",
    command: "nxc ldap <target> -u <username> -p <password> --kerberoasting <output_file>",
    protocol: "ldap",
    category: "exploitation",
    flags: ["kerberos", "kerberoasting", "spn", "tickets"]
}
```

---

## 🧪 Testing Your Changes

### Local Testing

```bash
# 1. Edit js/commands.js
nano js/commands.js

# 2. Start local server
./serve.sh

# 3. Open in browser
# Visit: http://localhost:8080

# 4. Test your command:
#    - Search for it
#    - Filter by protocol
#    - Filter by category
#    - Copy to clipboard
#    - Verify syntax is correct
```

### What to Check

- [ ] Command appears in the grid
- [ ] Searchable by title, description, and flags
- [ ] Filterable by protocol
- [ ] Filterable by category
- [ ] Copy button works
- [ ] Command syntax is correct
- [ ] No HTML/JavaScript injection
- [ ] Mobile responsive display

---

## 🚀 Submitting a Pull Request

### 1. Fork & Clone

```bash
# Fork on GitHub, then:
git clone https://github.com/YOUR_USERNAME/nxcoms.git
cd nxcoms
```

### 2. Create Branch

```bash
git checkout -b add-new-commands
```

### 3. Make Changes

```bash
# Edit js/commands.js
nano js/commands.js

# Add your commands
# Save the file
```

### 4. Test

```bash
./serve.sh
# Test in browser at http://localhost:8080
```

### 5. Commit

```bash
git add js/commands.js
git commit -m "Add [number] new NetExec commands for [protocol]

- Added command for [feature 1]
- Added command for [feature 2]
- Added command for [feature 3]"
```

### 6. Push

```bash
git push origin add-new-commands
```

### 7. Create Pull Request

1. Go to GitHub
2. Click "Pull Request"
3. Fill in description
4. Submit!

---

## 📋 Pull Request Template

```markdown
## Description
Brief description of what you added

## Commands Added
- [ ] Protocol: SMB/LDAP/WinRM/etc.
- [ ] Category: Enumeration/Authentication/etc.
- [ ] Number of commands: X

## Checklist
- [ ] Tested locally
- [ ] Commands follow template
- [ ] No syntax errors
- [ ] Proper protocol/category tags
- [ ] Descriptive flags added

## Testing
Screenshots or description of testing performed
```

---

## 🎨 Other Contributions

### Improving Documentation

- Fix typos in README.md
- Add deployment examples
- Improve DEPLOYMENT.md
- Add usage tips

### UI/UX Improvements

- Improve CSS styling
- Add new features
- Improve mobile responsiveness
- Add accessibility features

### Bug Fixes

- Fix search issues
- Fix filter bugs
- Fix copy functionality
- Fix mobile layout

---

## 💡 Feature Requests

Have an idea for NXComs? Open an issue!

**Good Feature Request:**
- Clear description
- Use case explanation
- Optional: mockup or example

**Examples:**
- Dark/Light theme toggle
- Export filtered results
- Favorites/bookmarks
- Command history
- Share via URL

---

## 🐛 Reporting Bugs

### Bug Report Template

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- Browser: [e.g. Firefox 120]
- OS: [e.g. Ubuntu 22.04]
- Device: [e.g. Desktop/Mobile]
```

---

## 📚 Resources

### NetExec Documentation
- Official Wiki: https://www.netexec.wiki/
- GitHub: https://github.com/Pennyw0rth/NetExec
- Discord: https://discord.gg/netexec

### Learning NetExec
- Read the official documentation
- Test commands in a lab environment
- Join the NetExec community

### Web Development
- MDN Web Docs: https://developer.mozilla.org/
- JavaScript: https://javascript.info/
- CSS: https://css-tricks.com/

---

## ⚖️ Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn
- Follow the project guidelines
- Test before submitting

---

## ❓ Questions?

- Open an issue on GitHub
- Tag with `question` label
- We'll help you out!

---

## 🙏 Thank You!

Every contribution makes NXComs better for the offensive security community!

**Contributors will be acknowledged in README.md**

---

**Happy contributing!** ♥ 🎯
