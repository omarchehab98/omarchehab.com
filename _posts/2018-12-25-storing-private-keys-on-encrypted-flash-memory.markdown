---
title: Storing Private Keys on Encrypted Flash Memory
date: 2018-12-25 15:38:00 Z
description: Storing my SSH key on flash memory in an encrypted VeraCrypt container.
layout: page-article
---

During one of my interviews at [Pivotal](https://pivotal.io) for a summer internship, I was tasked with fixing a couple of bugs in [Pivotal Network](https://network.pivotal.io). After a productive 3 hour test-driven pair programming session with my interviewer, we had a handful of commits that were not pushed. I was very impressed when he plugged in a flash memory, decrypted it, and loaded his SSH key into memory for 8 hours.

It didn't take me long to find an article written by a Pivot documenting their setup. At the time of writing, Tammer Saleh was the Senior Director of Engineering on the Cloud Foundry team, his article covers it all: the hardware they use, the script they use, and type of encryption. Check it out [http://tammersaleh.com/posts/building-an-encrypted-usb-drive-for-your-ssh-keys-in-os-x](http://tammersaleh.com/posts/building-an-encrypted-usb-drive-for-your-ssh-keys-in-os-x).

My only concern with their solution is 
that it is platform dependent. At Pivotal, it's not an issue because Macs dominate the workplace. I was hoping for a cross-platform solution because I alternate between Ubuntu and Mac very often.

# My Setup

I ordered myself the [Samsung BAR Plus 32GB](https://www.samsung.com/us/computing/memory-storage/usb-flash-drives/usb-3-1-flash-drive-bar-plus-32gb-titan-gray-muf-32be4-am).

![Samsung BAR Plus 32GB: Waterproof, shock-proof, temperature-proof, magnet-proof, and X-ray-proof](/uploads/01_MUF-32BE4_Front_Titan-Gray041918.jpg)

I created a 4MB [VeraCrypt](https://github.com/veracrypt/VeraCrypt) container and moved my SSH and PGP key pairs.

Finally, I wrote a script to decrypt the container using the VeraCrypt CLI, add the SSH key to the agent for a limited time, and unmount the device. I store the script outside of the VeraCrypt container for convenience.

```
# TODO: Copy script from my flash memory onto here
```