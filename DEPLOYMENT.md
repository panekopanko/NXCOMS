# ♥ NXComs Deployment Guide ♥

Complete guide to deploying the NXComs NetExec cheatsheet.

---

## 🚀 Quick Deploy Options

### Option 1: Local Testing (Immediate)

```bash
# Method 1: Direct file open
cd /home/kali/nxc-cheatsheet
firefox index.html

# Method 2: Python HTTP server
python3 -m http.server 8080
# Visit: http://localhost:8080

# Method 3: PHP server (if installed)
php -S localhost:8080
```

### Option 2: Docker (Production Ready)

```bash
# Build and run
docker-compose up -d

# Or manually
docker build -t nxcoms .
docker run -d -p 8080:80 --name nxcoms nxcoms

# Visit: http://localhost:8080

# View logs
docker logs -f nxcoms

# Stop
docker-compose down
```

### Option 3: GitHub Pages (Free Hosting)

```bash
# 1. Create repository on GitHub
# Visit: https://github.com/new

# 2. Initialize and push
git init
git add .
git commit -m "Initial commit - NXComs NetExec cheatsheet ♥"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nxcoms.git
git push -u origin main

# 3. Enable GitHub Pages
# Go to: Settings → Pages
# Source: Deploy from a branch
# Branch: main / (root)
# Click Save

# 4. Your site will be live at:
# https://YOUR_USERNAME.github.io/nxcoms
```

---

## 🌐 Production Deployment

### Netlify (Free, Fastest)

**Method 1: Drag & Drop**
1. Visit https://app.netlify.com/drop
2. Drag the `nxc-cheatsheet` folder
3. Your site is live instantly!

**Method 2: Git Integration**
1. Push to GitHub (see above)
2. Sign up at https://netlify.com
3. Click "New site from Git"
4. Select your repository
5. Click "Deploy site"

**Custom Domain:**
```
# In Netlify dashboard:
Domain settings → Add custom domain
→ Follow DNS instructions
```

### Vercel (Free, Fast)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd /home/kali/nxc-cheatsheet
vercel

# Follow prompts
# Your site will be live at: https://nxcoms.vercel.app
```

**Or via GitHub:**
1. Push to GitHub
2. Visit https://vercel.com
3. Import repository
4. Deploy automatically

### Cloudflare Pages (Free, CDN)

1. Push to GitHub
2. Visit https://pages.cloudflare.com
3. Connect your repository
4. Build settings:
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: /
5. Deploy

---

## 🖥️ Self-Hosted Deployment

### Nginx (Ubuntu/Debian)

```bash
# Install Nginx
sudo apt update
sudo apt install nginx

# Copy files
sudo mkdir -p /var/www/nxcoms
sudo cp -r /home/kali/nxc-cheatsheet/* /var/www/nxcoms/

# Create Nginx config
sudo nano /etc/nginx/sites-available/nxcoms
```

**Nginx Configuration:**

```nginx
server {
    listen 80;
    server_name nxcoms.yourdomain.com;

    root /var/www/nxcoms;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static files
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

**Enable and start:**

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/nxcoms /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Visit: http://your-server-ip
```

### Add SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d nxcoms.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run

# Your site is now: https://nxcoms.yourdomain.com
```

### Apache (Alternative)

```bash
# Install Apache
sudo apt install apache2

# Copy files
sudo cp -r /home/kali/nxc-cheatsheet/* /var/www/html/nxcoms/

# Create virtual host
sudo nano /etc/apache2/sites-available/nxcoms.conf
```

**Apache Configuration:**

```apache
<VirtualHost *:80>
    ServerName nxcoms.yourdomain.com
    DocumentRoot /var/www/html/nxcoms

    <Directory /var/www/html/nxcoms>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/nxcoms_error.log
    CustomLog ${APACHE_LOG_DIR}/nxcoms_access.log combined
</VirtualHost>
```

**Enable and restart:**

```bash
sudo a2ensite nxcoms
sudo systemctl reload apache2
```

---

## 🔒 HTTPS with Caddy (Automatic)

**Easiest way to get automatic HTTPS:**

```bash
# Install Caddy
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy

# Create Caddyfile
sudo nano /etc/caddy/Caddyfile
```

**Caddyfile:**

```
nxcoms.yourdomain.com {
    root * /var/www/nxcoms
    file_server
    encode gzip

    header {
        X-Frame-Options "SAMEORIGIN"
        X-Content-Type-Options "nosniff"
        X-XSS-Protection "1; mode=block"
    }
}
```

```bash
# Copy files
sudo mkdir -p /var/www/nxcoms
sudo cp -r /home/kali/nxc-cheatsheet/* /var/www/nxcoms/

# Restart Caddy
sudo systemctl restart caddy

# Caddy automatically gets SSL certificate!
# Visit: https://nxcoms.yourdomain.com
```

---

## 🐳 Docker Production Deployment

### With Docker Compose + Caddy (HTTPS)

Create `Caddyfile`:

```
nxcoms.yourdomain.com {
    reverse_proxy nxcoms:80
    encode gzip
}
```

Update `docker-compose.yml`:

```yaml
version: '3.8'

services:
  nxcoms:
    build: .
    container_name: nxcoms-cheatsheet
    restart: unless-stopped

  caddy:
    image: caddy:alpine
    container_name: nxcoms-caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - nxcoms

volumes:
  caddy_data:
  caddy_config:
```

Deploy:

```bash
docker-compose up -d

# Caddy will automatically get SSL certificate
# Visit: https://nxcoms.yourdomain.com
```

---

## 📊 Analytics (Optional)

### Add Google Analytics

Edit `index.html`, add before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Add Plausible (Privacy-Friendly)

```html
<script defer data-domain="nxcoms.yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## 🔧 Customization for Production

### Update Branding

Edit `index.html`:

```html
<!-- Update title -->
<title>Your Brand - NXComs</title>

<!-- Update header -->
<h1 class="title">Your Brand NXComs</h1>
```

### Update Footer Links

Edit `index.html` footer section to add your links.

### Add Custom Domain

**For GitHub Pages:**
1. Add `CNAME` file with your domain:
   ```
   nxcoms.yourdomain.com
   ```
2. Configure DNS:
   ```
   Type: CNAME
   Name: nxcoms
   Value: yourusername.github.io
   ```

---

## 🎯 Performance Optimization

### Enable Caching

In your Nginx/Apache/Caddy config, cache static files:

```nginx
# Nginx example
location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Enable Compression

```nginx
# Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

### Minify Assets (Optional)

```bash
# Minify CSS
npx csso css/style.css -o css/style.min.css

# Minify JS
npx terser js/app.js -o js/app.min.js
npx terser js/commands.js -o js/commands.min.js

# Update index.html to use minified files
```

---

## 🛡️ Security Hardening

### Add Security Headers

```nginx
# Nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;" always;
```

### Disable Directory Listing

```nginx
# Nginx
autoindex off;
```

---

## 📝 Maintenance

### Update Commands

```bash
# Edit command database
nano js/commands.js

# Add new commands
# Test locally
firefox index.html

# Deploy
git add js/commands.js
git commit -m "Added new NetExec commands"
git push

# GitHub Pages/Netlify/Vercel will auto-deploy
```

### Monitor Site

```bash
# Check if site is up
curl -I https://nxcoms.yourdomain.com

# Monitor with uptime service
# - UptimeRobot (free)
# - Pingdom
# - StatusCake
```

---

## ✅ Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] Search functionality works
- [ ] Filters work (protocol & category)
- [ ] Copy to clipboard works
- [ ] Mobile responsive
- [ ] HTTPS enabled (if production)
- [ ] Analytics added (optional)
- [ ] Custom domain configured (optional)
- [ ] Security headers set
- [ ] Compression enabled
- [ ] Monitoring set up

---

**Deployment complete!** ♥ Your NXComs cheatsheet is live! 🎯
