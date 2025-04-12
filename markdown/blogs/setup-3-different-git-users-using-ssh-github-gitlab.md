---
title: "Setting Up Multiple Different Git Users Using SSH"
description: "Learn how to set up three or more different Git users using SSH for GitHub and GitLab. This guide covers generating SSH keys, configuring the ssh-agent, setting up SSH config, and managing Git configurations for multiple users."
date: "2023-12-04"
tags: ["Git", "SSH", "GitHub", "GitLab", "DevOps"]
image:
---

# setup-3-different-git-users-using-ssh

Setting up three different Git users using SSH for GitHub and GitLab can seem complex, but it's quite manageable with the right setup. This guide will walk you through the process, ensuring you can easily switch between your accounts. Let's dive in! 🚀

## Why Use SSH for Git?

SSH (Secure Shell) is a cryptographic network protocol that allows secure communication between your computer and remote servers. It's widely used for Git operations because it provides a secure channel over an unsecured network, ensuring that your credentials and data are safe.

## Prerequisites

- **Git**: Ensure you have Git installed on your machine. You can download it from the [official Git website](https://git-scm.com/).
- In Windows, remember to add `path\to\Git\usr\bin` to your PATH variable. This will allow you to use `ssh` commands directly in your terminal.
- For best results in windows use [Git Bash](https://gitforwindows.org/) or [Windows Terminal](https://aka.ms/terminal) with WSL (Windows Subsystem for Linux).

We will use Git Bash for this tutorial, but the steps are similar for other terminals.

## Part 1: Setup SSH Key and Configure Hosts

### Step 1: Generate SSH Keys

Generate separate SSH keys for your accounts:

```bash
ssh-keygen -t rsa -b 4096 -C "user1hub@gmail.com" -f ~/.ssh/id_rsa_user1hub -N ''
ssh-keygen -t rsa -b 4096 -C "user2hub@gmail.com" -f ~/.ssh/id_rsa_user2hub -N ''
ssh-keygen -t rsa -b 4096 -C "gitlab_user@gmail.com" -f ~/.ssh/id_rsa_gitlab -N ''
```

- **`-t rsa`**: Specifies the type of key to create, in this case, RSA.
- **`-b 4096`**: Specifies the number of bits in the key, which is 4096 bits. This makes the key more secure.
- **`-C "user1hub@gmail.com"`**: Adds a comment to the key, typically your email address.
- **`-f ~/.ssh/id_rsa_user1hub`**: Specifies the filename of the key file.
- **`-N ''`**: Specifies an empty passphrase. You can set a passphrase for added security if desired.

### Step 2: Add the SSH Key to the ssh-agent

Before adding your SSH key to the ssh-agent, ensure the agent is running:

```powershell
eval "$(ssh-agent -s)" # bash
ssh-agent -s   # Powershell
```

This command starts the ssh-agent in the background. Next, add each of your SSH keys to the ssh-agent:

```ssh
ssh-add ~/.ssh/id_rsa_user1hub
```

**Note**: If you changed the default path while generating the SSH key, replace `~/.ssh/id_rsa_user1hub` with your custom path.

### Step 3: Add SSH Keys to Remote Accounts

1. Copy the public keys and add them to the respective platforms:

    ```powershell
    cat ~/.ssh/id_rsa_user1hub.pub | pbcopy  # MacOS
    cat ~/.ssh/id_rsa_user1hub.pub | xclip  # Linux
    Get-Content $env:HOME/.ssh/id_rsa_user1hub.pub | Set-Clipboard  # Windows(Pwsh)
    ```

    Then paste them into the **SSH keys section** in GitHub or GitLab settings.

2. Repeat this for the other accounts.

### Step 4: Configure `~/.ssh/config` and test the hosts

Edit your SSH configuration file:

```powershell
nano ~/.ssh/config # Bash
ni $env:HOME/.ssh/config # Powershell
```

Add the following:

```plaintext
# Default GitHub account (user1hub)
Host github_user1
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_user1hub

# Second GitHub account (user2hub)
Host github_user2
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_rsa_user2hub

# GitLab account
Host gitlab_user
  HostName gitlab.com
  User git
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/id_rsa_gitlab
```

This lets you use `github_user1`, `github_user2`, and `gitlab_user` as hosts in your Git commands.

You can test if each of the hosts works by connecting to the hosts. Here is an example

```bash
$ ssh -T git@github_user1
# Hi USERNAME! You've successfully authenticated, but GitHub does not
# provide shell access.
```

#### Warning: Port 22 might be blocked by your ISP

It's not uncommon that in some places the network traffic is being monitored and heavily firewalled, allowing only ports 80 (HTTP) and 443 (HTTPS) to be used.

To mitigate this error, you have to use 443 port alternative in github and gitlab.

##### Github

In Github See [Enabling SSH connections over HTTPS](https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port#enabling-ssh-connections-over-https), if you are able to SSH into `git@ssh.github.com` over port 443, you can override your SSH settings to force any connection to GitHub.com to run through that server and port. So , edit the file at `~/.ssh/config`.

```
Host github.com
    Hostname ssh.github.com
    Port 443
    User git
```

You can test that this works by connecting once more to GitHub.com:

```bash
$ ssh -T git@github.com
# Hi USERNAME! You've successfully authenticated, but GitHub does not
# provide shell access.
```

[Updating known hosts](https://docs.github.com/en/authentication/troubleshooting-ssh/using-ssh-over-the-https-port#updating-known-hosts)
The first time you interact with GitHub after switching to port 443, you may get a warning message that the host wasn't found in `known_hosts`, or that it was found by another name.

```bash
# The authenticity of host '[ssh.github.com]:443 ([140.82.112.36]:443)' can't be established.
# ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
# This host key is known by the following other names/addresses:
#     ~/.ssh/known_hosts:32: github.com
# Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

It is safe to answer "yes" to this question, assuming that the SSH fingerprint matches one of GitHub's published fingerprints. For the list of fingerprints, see "[GitHub's SSH key fingerprints](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/githubs-ssh-key-fingerprints)."

##### Gitlab

See [How GitLab.com implements an alternate SSH port](https://about.gitlab.com/blog/2016/02/18/gitlab-dot-com-now-supports-an-alternate-git-plus-ssh-port/#how-gitlab.com-implements-an-alternate-ssh-port)

GitLab.com runs a second SSH server that listens on the commonly used port `443`, which is unlikely to be firewalled.

All you have to do is edit your `~/.ssh/config` and change the way you connect to GitLab.com. The two notable changes are `Hostname` and `Port`:

```crmsh
Host gitlab.com
  Hostname altssh.gitlab.com
  User git
  Port 443
  PreferredAuthentications publickey
  IdentityFile ~/.ssh/gitlab
```

The first time you push to `altssh.gitlab.com` you will be asked to verify the server's key fingerprint:

```vbnet
The authenticity of host '[altssh.gitlab.com]:443 ([104.208.154.249]:443)' can't be established.
ECDSA key fingerprint is SHA256:HbW3g8zUjNSksFbqTiUWPWg2Bq1x8xdGUrliXFzSnUw.
Are you sure you want to continue connecting (yes/no)?
Welcome to GitLab, USERNAME!
```

That's only normal since you are connecting to the new loadbalancer. If you watch closely, the key fingerprint is [the same as in GitLab.com](https://about.gitlab.com/pricing/).

Before continuing to the next steps, you should test all the host using `ssh -T git@host_name`. All should show a success message.

## Part 2: Git Config Setup

### Step 1: Global Git Configuration

Set the global configuration:

```bash
git config --global init.defaultBranch main
git config --global push.autoSetupRemote true
```

- **`init.defaultBranch main`**: Sets the default branch name to `main` for new repositories.
- **`push.autoSetupRemote true`**: Automatically sets up the remote tracking branch when pushing.

### Step 2: Setup `.gitignore` on Init

Create a `.gitignore` template:

```bash
echo "desktop.ini" > ~/.gitignore_template
```

Ensure it’s added when you initialize repositories:

```bash
git init
cp ~/.gitignore_template .gitignore
git add .gitignore
git commit -m "Add .gitignore for desktop.ini"
```

### Step 3: Configure Aliases

As we will be switching between different users, we can set up aliases to make it easier to manage the configuration for our individual repositories.

Edit your `~/.gitconfig`. Opening in VS Code.

```bash
code ~/.gitconfig
```

Add the following to the `[alias]` section according to your needs. This is just for demo purpose, in real life you should use your own email and name you have used to create the SSH keys.

```bash
[alias]
    # Change user email and name
    user1hub = "!git config user.name 'User1Hub' && git config user.email 'user1hub@gmail.com'"
    user2hub = "!git config user.name 'User2Hub' && git config user.email 'user2hub@gmail.com'"
    gitlab = "!git config user.name 'GitLabUser' && git config user.email 'gitlab_user@gmail.com'"

    # Change remote host - this will change the remote URL for the current repository
    changeremotehost = "!sh -c \"git remote -v | grep '$1.*fetch' | sed s/..fetch.// | sed s/$1/$2/ | xargs git remote set-url\""

    # Switch between accounts and remotes
    switch_user1 = "!sh -c 'git changeremotehost github.com github_user1 && git user1hub'"
    switch_user2 = "!sh -c 'git changeremotehost github.com github_user2 && git user2hub'"
    switch_gitlab = "!sh -c 'git changeremotehost gitlab.com gitlab_user && git gitlab'"
```

## Part 3: Usage

First clone the git repository using `git clone git@github.com:username/repo.git`. Then switch to the correct user. Now you can commit as required using you set account. Warning for private repositories you have clone or add remote using SSH ALIASES else it will not work.

#### Switch User

To switch between accounts, run:

```bash
git switch_user1   # Switch to user1hub
git switch_user2   # Switch to user2hub
git switch_gitlab  # Switch to GitLab account
```

#### Clone Using SSH Aliases

When cloning repositories, use:

```bash
git clone git@github_user1:username/repo.git  # For user1hub
git clone git@github_user2:username/repo.git  # For user2hub
git clone git@gitlab_user:username/repo.git   # For GitLab
```

#### Setting user of the repository

We can also add users to the repository using the aliases we created. This will set the user for the current repository.

```bash
git user1hub # Set user1hub as the current user
git user2hub # Set user2hub as the current user
git gitlab   # Set GitLab as the current user
```
