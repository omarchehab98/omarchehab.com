---
title: LastPass CLI backup to Google Drive
date: 2018-12-12 08:12:00 Z
description: Backup your LastPass Vault to Google Drive, Dropbox, or OneDrive using
  the command line.
layout: page-article
---

    mkdir -p ~/GDrive/Backups/LastPass/`date +%Y/%m/%d` && \
      lpass export | \
      gpg -er omarchehab98@gmail.com > \
      ~/GDrive/Backups/LastPass/`date +%Y/%m/%d`/lpass-`date -Iseconds`.gpg

# Explained

* `mkdir` Create the directory we are backing up to (e.g. `~/GDrive/Backups/LastPass/2018/12/12`)

* `lpass export` Exports your vault as CSV

* `gpg` Encrypt your vault using your GPG public key

  * `-e` specifies that you are encrypting

  * `-r` specifies the public key you are signing the message with

* Finally, we redirect the output to the folder we created

# Dependencies

* LastPass CLI ([lastpass-cli](https://github.com/lastpass/lastpass-cli))

* OpenPGP CLI Tool ([gpg](https://www.gnupg.org))

* Remote file system mounted locally

  * For Google Drive, I use ([google-drive-ocamlfuse](https://github.com/astrada/google-drive-ocamlfuse))

  * Any tool that mounts a remote file system locally works

# Ideas

* Alias the command for convenience `alias lpass-remote-export='mkdir...>...gpg'`

* Run the command periodically to automate process

  * You will get a popup to unlock your vault, are you okay with that? Convenience vs Security. I tend to forget to back up regularly, although a popup every once in a while is annoying, it's a reminder to backup my vault.