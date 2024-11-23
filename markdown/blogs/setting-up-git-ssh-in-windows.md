---
title: "Setting Up Git SSH in Windows"
description: "Learn how to set up Git SSH in Windows using Git Bash. This step-by-step guide covers generating SSH keys, adding them to the ssh-agent, and configuring GitHub for secure access."
date: "2023-03-05"
tags: ["Git", "SSH", "Windows", "GitHub", "DevOps"]
image: "./assets/setting-up-git-ssh-in-windows.png"
---

Setting up Git SSH in Windows can be a bit tricky, but with the right tools and steps, it becomes a breeze. This guide will walk you through the entire process, ensuring you have a secure and efficient setup for your Git operations. Let's dive in! 🚀

## Why Use SSH for Git?

Before we get started, let's briefly discuss why SSH is preferred over HTTPS for Git operations. SSH (Secure Shell) provides a secure channel over an unsecured network. It uses encryption to ensure that all communications between your computer and the Git server are secure. This is particularly important when dealing with sensitive data or when you want to avoid typing your credentials every time you interact with a remote repository.

## Prerequisites

**Git Bash**: Ensure you have Git  is installed on your Windows machine. You can download it from the [official Git website](https://git-scm.com/).

## **Step 1: Generate a New SSH Key**

First, open Git Bash from the Start menu. It will open a new terminal in the root of your user directory. Eg. `C:/Users/your_username/`.

Once Git Bash is open, you can generate a new SSH key using the following command:

```java
ssh-keygen -t rsa -b 4096 -C "your_github_email@example.com"
```

### Explanation

- **`ssh-keygen`**: The command used to generate SSH keys.
- **`-t rsa`**: Specifies the type of key to create, in this case, RSA.
- **`-b 4096`**: Specifies the number of bits in the key, which is 4096 bits. This makes the key more secure.
- **`-C "your_github_email@example.com"`**: Adds a comment to the key, typically your email address.

After running the command, you'll be prompted to set the SSH key path. Press `Enter` to accept the default path:

```java
> Enter a file in which to save the key (/c/Users/your_username/.ssh/id_rsa): [Press enter]
```

Next, you'll be asked to enter a passphrase. This is optional but recommended for added security:

```java
> Enter passphrase (empty for no passphrase): [Type a passphrase]
> Enter same passphrase again: [Type passphrase again]
```

### Advanced Options

For those who want more control over their SSH key generation, here's the full synopsis of the `ssh-keygen` command:

```java
ssh-keygen [-q] [-b bits] [-t dsa | ecdsa | ed25519 | rsa] [-N new_passphrase] [-C comment] [-f output_keyfile]
```

#### Detailed Options:

- **`-q`**: Quiet mode. Suppresses the banner and most of the informational output.
- **`-b bits`**: Specifies the number of bits in the key to create. For RSA keys, the default is 2048 bits. Using 4096 bits is recommended for added security.
- **`-t type`**: Specifies the type of key to create. The possible values are:
  - **`dsa`**: Digital Signature Algorithm.
  - **`ecdsa`**: Elliptic Curve Digital Signature Algorithm.
  - **`ed25519`**: Edwards-curve Digital Signature Algorithm.
  - **`rsa`**: Rivest-Shamir-Adleman algorithm.
- **`-N new_passphrase`**: Provides the new passphrase.
- **`-C comment`**: Provides a new comment.
- **`-f output_keyfile`**: Specifies the filename of the key file.

**Example**:

```java
ssh-keygen -b 4096 -t rsa -N "tHiSiaPasSWoRd" -C "johnDoe@gmail.com" -f ~/.ssh/id_rsa
```

### Advanced Use Cases

1. **Generating an ECDSA Key**:
   ```java
   ssh-keygen -t ecdsa -b 521 -C "your_github_email@example.com"
   ```
   Here, `-b 521` specifies the key size for ECDSA, which is 521 bits.

2. **Generating an ED25519 Key**:
   ```java
   ssh-keygen -t ed25519 -C "your_github_email@example.com"
   ```
   ED25519 keys are considered more secure and are recommended for modern systems.

3. **Generating a Key with a Custom Filename**:
   ```java
   ssh-keygen -t rsa -b 4096 -C "your_github_email@example.com" -f ~/.ssh/custom_key_name
   ```
   This command generates a key with a custom filename.

## **Step 2: Add the SSH Key to the ssh-agent**

Before adding your SSH key to the ssh-agent, ensure the agent is running:

```ssh
eval "$(ssh-agent -s)"
```

This command starts the ssh-agent in the background. Next, add your SSH key to the ssh-agent:

```ssh
ssh-add ~/.ssh/id_rsa
```

**Note**: If you changed the default path while generating the SSH key, replace `~/.ssh/id_rsa` with your custom path.

## **Step 3: Get the SSH Key to Add on GitHub**

To add your SSH key to GitHub, you first need to copy it to your clipboard. Use the following command:

```ssh
clip < ~/.ssh/id_rsa.pub
```

If the `clip` command is not available, you can use:

```ssh
cat ~/.ssh/id_rsa.pub
```

This will display the key in the terminal. Copy the output manually.

### Example Output

```bash
ssh-rsa H91WNCG6pvy9Yf9MREkOZQHcWIuAsH8uJvTTbqm1eAY2g34FjarRdqZIpvdxkrErDHqh4k42owNEmHjSaAw53Y8M54fjBdFHTjGDqHBamlKcIzQbin/czFq1a+AAAAB3NzaC1yc2EAAAAD173Oe1kp0Ojnsn7sRWt/XT5nFH3CSTv6VWyxq4YUJ4ZykWa5opyiAJmvtjxOMCmVTuX2r1T4Livn0foHGt7+66FJXrXUQgyJ4RXanufb3bAekxbFPg3S6Gyr2kk+I3TYWcFsLLwjU0VVJwodQkpyygAUzhomx9OQ0FMpfkQa5VrZnaSLjjtNOUSAaq30e7JWYxtoVih2HfVkcmqc53QjY4T3Xb0cmLZF3EmwCeB66dgJtpTNMvM54ceD30INsaMFNqG8XjbJtGUCHYEIR5l/LI20K5F25BRTnCzRV9dB5FUJ8taVMGRHJob9PDUdxpA2HEJYilm8ZbLbRmKJtU+pgopIANDhZjWZNvMiTak7BjVrVOciKD3Pa/KKy03nSEfEGExLbFEi1Q8QEGd6idtUAjL7fyVPWatRwCnOvGLMPTk73m7t0IAYTm4n7dO0S5OeWTUPTT+8vIfFCmE9OT2aJDIpZY1+f8Q== your_email@example.com
```

## **Step 4: Add SSH Key to the GitHub Account**

1. **Log into GitHub**: Go to your GitHub account and click on your profile photo in the top-right corner. Select **Settings**.
2. **SSH and GPG Keys**: In the user settings sidebar, click on **SSH and GPG keys**.
3. **New SSH Key**: Click on the **New SSH key** button.
4. **Add Key**: Enter a title for your SSH key and paste the key you copied earlier into the "Key" field. Click **Add SSH key**.

## Conclusion

Congratulations! You've successfully set up Git SSH in Windows. This setup will allow you to interact with your GitHub repositories securely and efficiently. Happy coding! 🎉

This guide is designed to be comprehensive yet easy to follow, ensuring that even beginners can set up Git SSH without any hassle. If you found this guide helpful, don't forget to share it with your fellow developers!